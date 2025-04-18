import { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import PackageList from './components/PackageList'
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)

// fetch product data on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  // toggles product selection
  const handleCheckboxChange = (productId) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    )
  }

  // sends selected items to server for packaging optimization
  const handlePlaceOrder = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: selectedItems }),
      })
      const data = await response.json()
      setPackages(data)
    } catch (error) {
      console.error('Error optimizing packages:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <h1>Package Optimizer</h1>
      <div className="content-container">
        <div className="product-section">
          <h2>Products</h2>
          <ProductList 
            products={products} 
            selectedItems={selectedItems}
            onCheckboxChange={handleCheckboxChange}
          />
          <button 
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
        
        {packages.length > 0 && (
          <div className="package-section">
            <h2>Packages</h2>
            <PackageList packages={packages} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App