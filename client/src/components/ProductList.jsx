// Renders a list of products in a table with checkboxes to select items
const ProductList = ({ products, selectedItems, onCheckboxChange }) => {
    return (
      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Price</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(product.id)}
                    onChange={() => onCheckboxChange(product.id)}
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.weight}g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  export default ProductList