import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './productList.css';
import Navbar from '../components/Navbar/Navbar';

function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get('/products');
        console.log('products: ', res.data);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProducts();
  }, []);
  const handleDelete = async (id) => {
    setProducts(products.filter((item) => item.id != id));
    try {
      const res = await axios.delete(`/products/${id}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'product',
      headerName: 'Product',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image_url} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: 'quantity', headerName: 'Quantity', width: 200 },

    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/' + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <Navbar />
      <h2 style={{ color: 'blue', textAlign: 'center', margin: '10px' }}>
        Product List
      </h2>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
        checkboxSelection
      />
    </div>
  );
}

export default ProductList;
