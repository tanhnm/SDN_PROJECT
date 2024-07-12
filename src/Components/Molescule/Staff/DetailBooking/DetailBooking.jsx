import React, { useState, useEffect } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { getDetailBookingService } from 'lib/api/services-api';
import Loading from 'Components/ui/loading';
import TableCage from './components/TableCage';
import InfoPet from './components/InfoPet';
import InfoUser from './components/InfoUser';
import { ConfirmCage } from './components/ConfirmCage';
import { Container, Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

export default function DetailBooking() {
  const [loading, setLoading] = useState(true);
  const [bookingDetail, setBookingDetail] = useState();
  const [bookingService, setBookingService] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getAllBookingDetail = async () => {
      try {
        const data = await getDetailBookingService(id);
        setBookingDetail(data);
        setBookingService(data.bookingService);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };

    getAllBookingDetail();
  }, [id]);

  return (
    <Container maxWidth='md'>
      <Box mt={4} mb={2} display='flex' alignItems='center'>
        <Link to='/staff/list-booking'>
          <Button startIcon={<ArrowBack />} variant='text' color='primary'>
            Back
          </Button>
        </Link>
        <Typography variant='h4' component='h1' ml={2} fontWeight='bold'>
          Chi tiết đặt chỗ
        </Typography>
      </Box>

      {loading ? (
        <Loading />
      ) : bookingDetail ? (
        <Card>
          <CardContent>
            <Box display='flex' gap={3}>
              <CardMedia
                component='img'
                image={bookingService.product.image}
                alt={bookingService.product.name}
                className='rounded-md w-50 max-h-60'
              />
              <Box flexGrow={1}>
                <Typography variant='h5' component='h2' fontWeight='bold'>
                  {bookingService.product.name}
                </Typography>
                <Typography>
                  <b>Thời gian bắt đầu:</b> {bookingService.timeStartService}
                </Typography>
                {bookingService.status === 'Cancelled' ? (
                  <Typography color='error'>
                    <b>Trạng thái: </b>
                    {bookingService.status}
                  </Typography>
                ) : bookingService.cage === null ? (
                  <Box>
                    <Typography color='error'>
                      <b>*</b>Chưa chọn lồng
                    </Typography>
                    <ConfirmCage bookingId={id} />
                  </Box>
                ) : (
                  <>
                    <Typography color='success'>
                      <b>Trạng thái: </b>
                      {bookingService.status}
                    </Typography>
                    <TableCage res={bookingService.cage} />
                  </>
                )}
              </Box>
            </Box>
            <Box mt={4} display='flex' gap={3}>
              <InfoUser res={bookingDetail.user} />
              <InfoPet res={bookingDetail.pet} />
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography>Không có chi tiết đặt chỗ</Typography>
      )}
    </Container>
  );
}
