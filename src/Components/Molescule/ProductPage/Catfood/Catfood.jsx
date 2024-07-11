import React, { useState, useEffect } from 'react';
import './Catfood.scss';
import { Link } from 'react-router-dom';
import MyAxios from '../../../../setup/configAxios';
import { motion } from 'framer-motion';
import petCover from 'assets/images/pet-cover.webp';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Pagination,
  Typography,
  Container,
  Grid,
  Button,
} from '@mui/material';
import ProductCard from 'Components/Molescule/ProductCards/ProductCard';

function Catfood() {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(18000);
  const [maxPrice, setMaxPrice] = useState(495000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [sortOrder, setSortOrder] = useState('system');

  useEffect(() => {
    if (sortOrder === 'asc') {
      AscendingSorts();
    } else if (sortOrder === 'des') {
      DescendingSorts();
    } else {
      getAll();
    }
  }, [sortOrder]);

  const getAll = () => {
    MyAxios.get('api/v1/products?type=product&name=food&species=cat')
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const AscendingSorts = () => {
    MyAxios.get('api/v1/products/sort?type=product&name=food&species=cat&sort=asc')
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const DescendingSorts = () => {
    MyAxios.get('api/v1/products/sort?type=product&name=food&species=cat&sort=desc')
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const filteredProducts = products?.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <Container className='m-4'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection={{ xs: 'column', md: 'row' }}
        mt={4}
        mb={4}
      >
        <Box textAlign='center'>
          <img src={'10.png'} alt='Pet Cover' className='w-[50vw] hidden md:block' />
          <motion.h1
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className='text-xl text-[#222a63] font-bold'
          >
            Pet Shop
          </motion.h1>
          <motion.h1
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className='text-4xl text-[#4c4c4c] font-bold'
          >
            Thức Ăn Dành Cho Mèo
          </motion.h1>
        </Box>
      </Box>
      <Box display='flex' justifyContent='flex-end' mb={4}>
        <FormControl variant='outlined' sx={{ minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} label='Sort By'>
            <MenuItem value='system'>Mặc định</MenuItem>
            <MenuItem value='asc'>Tăng dần</MenuItem>
            <MenuItem value='des'>Giảm dần</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box p={6} border={1} borderColor='grey.300' borderRadius={2}>
            <Typography variant='h6' mb={2}>
              Lọc theo giá
            </Typography>
            <Slider
              value={minPrice}
              min={18000}
              max={495000}
              onChange={(e, value) => setMinPrice(value)}
              valueLabelDisplay='auto'
              marks={[
                { value: 18000, label: '18,000đ' },
                { value: 495000, label: '495,000đ' },
              ]}
            />
            <Slider
              value={maxPrice}
              min={18000}
              max={495000}
              onChange={(e, value) => setMaxPrice(value)}
              valueLabelDisplay='auto'
              marks={[
                { value: 18000, label: '18,000đ' },
                { value: 495000, label: '495,000đ' },
              ]}
            />
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={() => {
                /* Handle filter */
              }}
            >
              Lọc
            </Button>
            <Typography mt={2}>
              Giá {minPrice.toLocaleString()} đ — {maxPrice.toLocaleString()} đ
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {paginatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <ProductCard
                    status={product.status}
                    img={product.image}
                    content={product.name}
                    forType={product.forType}
                    price={`${product.price.toLocaleString()} đ`}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box display='flex' justifyContent='center' mt={4}>
            <Pagination
              size='large'
              count={totalPages}
              page={currentPage}
              variant='outlined'
              onChange={handlePageChange}
              color='primary'
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Catfood;
