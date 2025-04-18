// Component to display list of packages in an order
const PackageList = ({ packages }) => {
    return (
      <div className="package-list">
        <p>This order has following packages:</p>
        {packages.map((pkg, index) => (
          <div key={index} className="package">
            <h3>Package {index + 1}</h3>
            <p>
              <strong>Items:</strong> {pkg.items.map(item => item.name).join(', ')}
            </p>
            <p><strong>Total weight:</strong> {pkg.totalWeight}g</p>
            <p><strong>Total price:</strong> ${pkg.totalPrice}</p>
            <p><strong>Courier price:</strong> ${pkg.courierPrice}</p>
          </div>
        ))}
      </div>
    )
  }
  
  export default PackageList