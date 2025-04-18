const express = require('express');
const cors = require('cors');
const products = require('./data/products');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- API Routes ---

// Get all available products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Optimize selected products into packages
app.post('/api/optimize', (req, res) => {
  try {
    const selectedItems = req.body.items;

    // Filter out selected product objects
    const selectedProducts = products.filter(product => 
      selectedItems.includes(product.id)
    );
    
    // Sort products by price (descending)
    selectedProducts.sort((a, b) => b.price - a.price);
    
    const packages = [];
    let currentPackage = createNewPackage();
    
    // Group products into packages (max $250 per package)
    for (const product of selectedProducts) {
      if (currentPackage.totalPrice + product.price > 250) {
        packages.push(currentPackage);
        currentPackage = createNewPackage();
      }
      
      currentPackage.items.push(product);
      currentPackage.totalPrice += product.price;
      currentPackage.totalWeight += product.weight;
    }
    
    // Push last package if it has items
    if (currentPackage.items.length > 0) {
      packages.push(currentPackage);
    }
    
    // Calculate courier cost per package
    packages.forEach(pkg => {
      pkg.courierPrice = calculateCourierCharge(pkg.totalWeight);
    });
    
    // Balance weights between packages to reduce courier cost
    const balancedPackages = balancePackageWeights(packages);
    res.json(balancedPackages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper functions
function createNewPackage() {
  return {
    items: [],
    totalPrice: 0,
    totalWeight: 0,
    courierPrice: 0
  };
}

// Simple tiered courier pricing
function calculateCourierCharge(weight) {
  if (weight <= 200) return 5;
  if (weight <= 500) return 10;
  if (weight <= 1000) return 15;
  return 20;
}

// Try swapping items between packages to reduce weight imbalance
function balancePackageWeights(packages) {
  if (packages.length < 2) return packages;
  
  packages.sort((a, b) => a.totalWeight - b.totalWeight);
  let improved = true;
  
  while (improved) {
    improved = false;
    
    for (let i = 0; i < packages.length - 1; i++) {
      for (let j = i + 1; j < packages.length; j++) {
        const pkg1 = packages[i];
        const pkg2 = packages[j];
        
        for (const item1 of pkg1.items) {
          for (const item2 of pkg2.items) {

            // Swap only if totalPrice stays under limit after swap
            if (pkg1.totalPrice - item1.price + item2.price <= 250 &&
                pkg2.totalPrice - item2.price + item1.price <= 250) {
              
              const newPkg1Weight = pkg1.totalWeight - item1.weight + item2.weight;
              const newPkg2Weight = pkg2.totalWeight - item2.weight + item1.weight;
              
              const currentDiff = Math.abs(pkg1.totalWeight - pkg2.totalWeight);
              const newDiff = Math.abs(newPkg1Weight - newPkg2Weight);
              
              if (newDiff < currentDiff) {

                // Do the swap
                pkg1.items = pkg1.items.filter(i => i.id !== item1.id);
                pkg2.items = pkg2.items.filter(i => i.id !== item2.id);
                
                pkg1.items.push(item2);
                pkg2.items.push(item1);
                
                pkg1.totalPrice = pkg1.totalPrice - item1.price + item2.price;
                pkg2.totalPrice = pkg2.totalPrice - item2.price + item1.price;
                
                pkg1.totalWeight = newPkg1Weight;
                pkg2.totalWeight = newPkg2Weight;
                
                pkg1.courierPrice = calculateCourierCharge(pkg1.totalWeight);
                pkg2.courierPrice = calculateCourierCharge(pkg2.totalWeight);
                
                improved = true;
              }
            }
          }
        }
      }
    }
  }
  
  return packages;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});