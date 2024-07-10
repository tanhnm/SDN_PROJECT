import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Tabs, Tab, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import MyAxios from '../../../setup/configAxios';
import './Productdetail.scss';
import { CartContext } from 'context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  const { addToCart } = useContext(CartContext);

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    if (value <= product.quantity && value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(id);
    }
    toast.success(`${product.name} đã thêm vào giỏ hàng`);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    MyAxios.get(`http://localhost:5000/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className='loading'>
        <CircularProgress />
      </div>
    );
  if (error) return <div className='error'>Error: {error.message}</div>;

  return product ? (
    <div className='product-detail'>
      <ToastContainer />
      <div className='product-container'>
        <img className='product-image' src={product.image} alt={product.name} />
        <div className='product-info'>
          <Tabs value={tabValue} onChange={handleTabChange} className='product-tabs'>
            <Tab label='Thông tin sản phẩm' />
            <Tab label='Mô tả sản phẩm' />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Typography variant='h4' className='!text-black product-name'>
              {product.name}
            </Typography>
            <Typography variant='h6' className='product-price'>
              {product.price} đ
            </Typography>
            <Typography variant='body1' className='product-availability'>
              Availability: <span className='availability-count'>{product.quantity} sản phẩm</span>
            </Typography>
            <div className='quantity-container'>
              <TextField
                type='number'
                value={quantity}
                onChange={handleQuantityChange}
                className='quantity-input'
                InputProps={{ inputProps: { min: 1, max: product.quantity } }}
              />
              <Button
                onClick={handleAddToCart}
                className='add-to-cart-btn !bg-green-800'
                variant='contained'
              >
                Add to Cart
              </Button>
            </div>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Typography variant='h6' className='description-title'>
              MÔ TẢ SẢN PHẨM
            </Typography>
            <Typography variant='body1'>{product.des}</Typography>
          </TabPanel>
        </div>
      </div>
    </div>
  ) : (
    <div>Product not found</div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default ProductDetail;
