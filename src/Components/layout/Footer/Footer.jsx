import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Box, Container, Typography, IconButton } from '@mui/material';
import Text from '../../Atom/Text/Text';

function Footer() {
  return (
    <Box className='footer-container'>
      <Box className='!bg-green-800 py-4'>
        <Container>
          <Typography variant='h6' align='center' className='text-white'>
            <Text
              content={
                'Hotline hỗ trợ 24/7 của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn | 0898520760'
              }
              className={'footer-hotline-text'}
            />
          </Typography>
        </Container>
      </Box>
      <Box className='flex flex-col md:flex-row justify-between p-4'>
        <Box className='footer-left mb-8 md:mb-0'>
          <Typography variant='h5' className='footer-detail-title mb-4'>
            <Text content={'PET HOME'} />
          </Typography>
          <Typography variant='body1' className='footer-detail-infor mb-4'>
            <Text
              content={
                'Pet Home đời với mong muốn mang lại cho khách hàng sự chuyên nghiệp, uy tín mang nét đẹp hoa mỹ mà chúng tôi đem lại sự trải nghiệm tốt nhất cho thú cưng của chúng ta. Với nhiều năm kinh nghiệm trong ngành dịch vụ thú cưng bao gồm: Spa thú cưng, Khách sạn thú cưng, dịch vụ khám ,...'
              }
            />
          </Typography>
          <Box className='footer-icons flex space-x-4'>
            <IconButton href='#' className='hover:text-blue-400'>
              <InstagramIcon />
            </IconButton>
            <IconButton href='#' className='hover:text-blue-400'>
              <EmailIcon />
            </IconButton>
            <IconButton href='#' className='hover:text-blue-400'>
              <FacebookIcon />
            </IconButton>
            <IconButton href='#' className='hover:text-blue-400'>
              <LocalPhoneIcon />
            </IconButton>
          </Box>
        </Box>

        <Box className='footer-left'>
          <Typography variant='h5' className='footer-detail-title mb-4'>
            <Text content={'DỊCH VỤ'} />
          </Typography>
          <Typography variant='body1' className='footer-detail-infor'>
            <Text
              content={
                'Spa thú cưng chuẩn 5 sao, Khách sạn thú cưng chuẩn 5 sao, Cung cấp sản phẩm và thức ăn dành cho thú cưng, Dịch vụ khám và chữa bệnh tận tình'
              }
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
