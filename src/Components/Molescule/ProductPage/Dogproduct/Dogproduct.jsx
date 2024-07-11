import React, { useState, useEffect } from 'react';
import './Dogproduct.scss';
import { Link } from 'react-router-dom';
import ProductCard from 'Components/Molescule/ProductCards/ProductCard';
import MyAxios from '../../../../setup/configAxios';
import { motion } from 'framer-motion';
import petCover from 'assets/images/pet-cover.webp';
import Pagination from '@mui/material/Pagination';
import {
  Box,
  Container,
  Grid,
  Typography,
  Slider,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

function Dogproduct() {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(18000);
  const [maxPrice, setMaxPrice] = useState(495000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [sortOrder, setSortOrder] = useState('system');

  useEffect(() => {
    fetchData();
  }, [sortOrder]);

  const fetchData = () => {
    setLoading(true);
    let url = 'api/v1/products?type=product&name=other&species=dog';

    if (sortOrder === 'asc') {
      url += '&sort=asc';
    } else if (sortOrder === 'des') {
      url += '&sort=desc';
    }

    MyAxios.get(url)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filteredProducts = products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
            className='text-2xl text-[#222a63] font-bold'
          >
            Pet Shop
          </motion.h1>
          <motion.h1
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className='text-4xl text-[#4c4c4c] font-bold'
          >
            phụ kiện cho chó
          </motion.h1>
        </Box>
      </Box>

      <Box display='flex' justifyContent='flex-end' mb={4}>
        <FormControl variant='outlined' sx={{ minWidth: 180 }}>
          <InputLabel>Sắp xếp</InputLabel>
          <Select value={sortOrder} onChange={handleSortChange} label='Sắp xếp'>
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
              value={[minPrice, maxPrice]}
              min={18000}
              max={495000}
              onChange={(e, newValue) => {
                setMinPrice(newValue[0]);
                setMaxPrice(newValue[1]);
              }}
              valueLabelDisplay='auto'
              marks={[
                { value: 18000, label: '18,000đ' },
                { value: 495000, label: '495,000đ' },
              ]}
              aria-labelledby='range-slider'
            />
            <Button variant='contained' color='primary' fullWidth onClick={fetchData}>
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

export default Dogproduct;
