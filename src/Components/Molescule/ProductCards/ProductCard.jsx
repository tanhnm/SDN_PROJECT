import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import './ProductCards.scss';

function ProductCard({ status, img, content, forType, className, onClick, price }) {
  return (
    <Card className={`product-card-container ${className}`} onClick={onClick}>
      <CardMedia component='img' alt='Product' height='140' image={img} className='product-img' />
      <CardContent className='product-card-info'>
        <Typography variant='subtitle1' className='product-card-status' gutterBottom>
          {status}
        </Typography>
        <Typography variant='subtitle2' className='product-card-type' gutterBottom>
          {forType}
        </Typography>
        <Typography variant='body1' className='product-card-content'>
          {content}
        </Typography>
        <Typography variant='body2' className='product-card-price'>
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
