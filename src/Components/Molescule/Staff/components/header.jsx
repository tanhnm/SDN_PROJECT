import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import logo from 'assets/images/logoPetHome.png';

export default function Header() {
  return (
    <AppBar position='static' sx={{ height: '7vh', backgroundColor: 'mainColer' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' component='div' sx={{ color: 'textColer', fontWeight: 'bold' }}>
          STAFF
        </Typography>
        <Typography variant='h4' component='div' sx={{ color: 'textColer', fontWeight: 'bold' }}>
          PET SHOP
        </Typography>
        <Box />
      </Toolbar>
    </AppBar>
  );
}
