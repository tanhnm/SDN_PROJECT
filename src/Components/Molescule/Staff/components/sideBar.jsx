import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from 'assets/icons/nav-menu-icons/HomeIcon';
import CalendarTodayIcon from 'assets/icons/nav-menu-icons/CalendarTodayIcon';
import PawIcon from 'assets/icons/nav-menu-icons/paw';
import CartIcon from 'assets/icons/nav-menu-icons/CartIcon';
import LeftAngle from 'assets/icons/nav-menu-icons/leftAngle';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(1);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '16rem',
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'mainText3',
      }}
    >
      <List component='nav'>
        <ListItem
          button
          component={Link}
          to='/staff/list-booking'
          selected={selectedButton === 1}
          onClick={() => handleButtonClick(1)}
          sx={{
            borderRadius: '0 1rem 1rem 0',
            '&.Mui-selected': {
              backgroundColor: 'bgColer',
              color: 'textColer',
              fontWeight: 'bold',
            },
            '&:hover': {
              backgroundColor: 'bgColer',
              color: 'textColer',
              fontWeight: 'bold',
            },
          }}
        >
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary='Danh sách đặt chổ' />
        </ListItem>
        <ListItem
          button
          component={Link}
          to='/staff/list-service'
          selected={selectedButton === 2}
          onClick={() => handleButtonClick(2)}
          sx={{
            borderRadius: '0 1rem 1rem 0',
            '&.Mui-selected': {
              backgroundColor: 'bgColer',
              color: 'textColer',
              fontWeight: 'bold',
            },
            '&:hover': {
              backgroundColor: 'bgColer',
              color: 'textColer',
              fontWeight: 'bold',
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Danh sách dịch vụ' />
        </ListItem>
        <ListItem
          button
          component={Link}
          to='/staff/list-product'
          selected={selectedButton === 3}
          onClick={() => handleButtonClick(3)}
          sx={{
            borderRadius: '0 1rem 1rem 0',
            '&.Mui-selected': {
              backgroundColor: 'bgColer',
              color: 'textColer',
              fontWeight: 'bold',
            },
            '&:hover': {
              backgroundColor: 'bgColer',
              color: 'textColer',
              fontWeight: 'bold',
            },
          }}
        >
          <ListItemIcon>
            <PawIcon />
          </ListItemIcon>
          <ListItemText primary='Danh sách sản phẩm' />
        </ListItem>
        <ListItem
          button
          component={Link}
          to='/staff/list-order'
          selected={selectedButton === 4}
          onClick={() => handleButtonClick(4)}
          sx={{
            borderRadius: '0 1rem 1rem 0',
            '&.Mui-selected': {
              backgroundColor: 'bgColer',
              color: 'textColer',
              fontWeight: 'bold',
            },
            '&:hover': {
              backgroundColor: 'bgColer',
              color: 'textColer',
              fontWeight: 'bold',
            },
          }}
        >
          <ListItemIcon>
            <CartIcon />
          </ListItemIcon>
          <ListItemText primary='Danh sách đơn hàng' />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: '0 1rem 1rem 0',
            '&:hover': {
              backgroundColor: 'bgColer',
              color: 'textColer',
            },
          }}
        >
          <ListItemIcon>
            <LeftAngle />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
