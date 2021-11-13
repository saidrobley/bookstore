import React, { useState, useEffect } from 'react';

import axios from 'axios';

function Products(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Products</h1>

      <div className="product-list">
        {products &&
          products.map((product) => {
            return (
              <div className="product-item" key={product.id}>
                <p>{product.name}</p>

                <img alt={product.name} src={product.image_url} />

                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
