import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from 'context/CartContext';
import MyAxios from 'setup/configAxios';
import logo from 'assets/images/pet2.png';
import { ShoppingBag, UserRound, Heart } from 'lucide-react';
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Badge,
  AppBar,
  Toolbar,
  Typography,
  Stack,
} from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import useTokenExpiration from 'hooks/useAuthExpired';

function HeaderAfterLogin() {
  const [anchorEl, setAnchorEl] = useState(null);

  const [searchText, setSearchText] = useState('');
  const { cartItem } = useContext(CartContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const token = localStorage.getItem('access_token');
  const { isExpired } = useTokenExpiration(token);

  useEffect(() => {
    if (isExpired) {
      window.location.href = '/login';
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (searchText) {
        navigate(`/product/search?query=${searchText}`);
      }
    }
  };

  const totalCartItems = cartItem.reduce((acc, item) => acc + item.value, 0);

  const access_token = localStorage.getItem('access_token');

  const getUserInfo = () => {
    const userId = localStorage.getItem('userId');
    MyAxios.get(`http://localhost:5000/api/v1/user/${userId}`).then((res) => {
      setUserInfo(res.data);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  useEffect(() => {
    if (access_token) {
      getUserInfo();
    }
  }, [access_token]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position='static' className='!bg-white'>
      <Toolbar className='flex justify-around h-40 font-mainText3'>
        <div className='flex items-center h-40'>
          <Link to={'/'}>
            <img src={logo} alt='logo nè' className='h-40' />
          </Link>
        </div>
        <div className='flex items-center w-[50%]'>
          <input
            type='text'
            value={searchText}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            placeholder='Tìm kiếm tại đây'
            className='bg-white text-black p-2  rounded-l-full border w-full  '
          />

          <div className='bg-black rounded-r-full border-none  p-2 '>
            <SearchIcon />
          </div>
        </div>
        <div className=' flex  justify-center items-center'>
          {access_token ? (
            <div className='ml-4'>
              <UserRound fontSize='large' className='text-black ml-4' onClick={handleClick} />
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate('/profile')}>Hồ sơ</MenuItem>
                <MenuItem onClick={() => navigate('/pet-info')}>Danh sách thú cưng</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className='ml-4 text-white'>
              <UserRound fontSize='large' className='text-black ml-4' />
            </button>
          )}
          <Heart fontSize='large' className='text-black ml-4' />
          <Link to='/shopping-cart' className='ml-4'>
            <Badge badgeContent={totalCartItems} color='info'>
              <ShoppingBag fontSize='large' className='text-black' />
            </Badge>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderAfterLogin;
