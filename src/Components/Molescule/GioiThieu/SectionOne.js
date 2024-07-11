import React from 'react';
import Text from '../../Atom/Text/Text';
import { Box, Container, Typography, List, ListItem, Divider } from '@mui/material';
import './SectionOne.css';

const SectionOne = () => (
  <Container>
    <Box mt={5} mb={5}>
      <Box>
        <Typography className='my-5 text-xl font-medium leading-8 text-gray-700'>
          <Text
            className={'font-sans text-2xl font-extrabold mb-4'}
            content={
              'PET HOME ra đời với mong muốn mang lại cho khách hàng sự chuyên nghiệp, uy tín mang nét đẹp hoa mỹ mà chúng tôi đem lại sự trải nghiệm tốt nhất cho thú cưng của chúng ta. Với hơn 5 năm kinh nghiệm trong ngành dịch vụ thú cưng bao gồm: Thú y, Spa thú cưng, Khách sạn thú cưng, Cung cấp các dòng thú cưng chuyên nghiệp...'
            }
          />
        </Typography>
        <Divider className='!my-10' />
        <Typography className='font-sans text-5xl font-extrabold mb-4'>
          <Text
            className={'font-sans text-2xl font-extrabold mb-4'}
            content={'Tầm nhìn – Sứ mệnh – Giá trị cốt lõi của Pet HOME'}
          />
        </Typography>

        <Box className='mt-4'>
          <Typography className='text-2xl font-bold mb-2'>TẦM NHÌN</Typography>
          <Typography className='text-xl text-black mb-4'>
            Pet Home định hướng phát triển trở thành Công ty cung cấp các Sản phẩm, dịch vụ cho thú
            cưng hàng đầu Việt Nam.
          </Typography>

          <Typography className='text-2xl font-bold mb-2'>SỨ MỆNH</Typography>
          <Typography className='text-xl font-light mb-4'>
            Cam kết mang đến trọn vẹn trải nghiệm cho Khách hàng và vẻ đẹp toàn diện cho thú cưng.
          </Typography>

          <Typography className='text-2xl font-bold mb-2'>GIÁ TRỊ CỐT LÕI</Typography>
          <List className='text-xl text-black mb-4 list-disc list-inside'>
            <ListItem>
              Trân trọng khách hàng: Mỗi khách hàng khi đến PET HOME là một điều đáng quý. Khách
              hàng xứng đáng được trải nghiệm những dịch vụ tốt nhất, thú cưng được chăm sóc chỉn
              chu nhất.
            </ListItem>
            <ListItem>
              Tôn trọng đồng nghiệp: Luôn luôn lắng nghe và đề cao tinh thần đồng đội, tất cả cùng
              vì một mục tiêu phát triển chung.
            </ListItem>
            <ListItem>
              Coi trọng công việc: Thái độ làm việc chuyên nghiệp, chịu trách nhiệm với kết quả công
              việc.
            </ListItem>
          </List>
          <Typography className='text-xl font-light my-5'>
            PET HOME – Với hơn 5 năm kinh nghiệm trong ngành dịch vụ thú cưng bao gồm: Spa thú cưng,
            Dịch vụ thú cưng tại nhà, Thú y, Sản phẩm, phụ kiện thú cưng, Khách sạn thú cưng, Dịch
            vụ dắt chó đi dạo,…
          </Typography>
        </Box>

        <Divider className='!my-10' />

        <Typography className='font-sans text-5xl font-extrabold mb-4'>
          <Text className='font-sans text-2xl font-extrabold mb-4' content={'Đội ngũ PET HOME'} />
        </Typography>

        <Box className='mt-4'>
          <Typography className='text-xl font-light mt-4'>
            Với đội ngũ Nhân viên Spa – Grooming chuyên nghiệp, đội ngũ chăm sóc khách hàng có nhiều
            năm kinh nghiệm. Nhân viên PET HOME với tinh thần trách nhiệm, cởi mở với Slogan “Để thú
            cưng của bạn được chỉn chu nhất”.
          </Typography>
          <Typography className='text-xl font-light mt-4'>
            Cam kết mang lại cho quý khách dịch vụ với chất lượng tốt nhất và mức chi phí hợp lý.
          </Typography>
        </Box>

        <Typography className='font-sans text-5xl font-extrabold mb-4'>
          <Text content={'Tại sao lại chọn PET HOME ?'} />
        </Typography>

        <List className='text-xl text-black mb-5 list-disc list-inside'>
          <ListItem>Dịch vụ CHẤT LƯỢNG đi đôi với UY TÍN.</ListItem>
          <ListItem>
            Tôn trọng đồng nghiệp: Luôn luôn lắng nghe và đề cao tinh thần đồng đội, tất cả cùng vì
            một mục tiêu phát triển chung.
          </ListItem>
          <ListItem>
            Coi trọng công việc: Thái độ làm việc chuyên nghiệp, chịu trách nhiệm với kết quả công
            việc.
          </ListItem>
          <ListItem>Trang thiết bị ĐẦY ĐỦ, ĐẢM BẢO vệ sinh sạch sẽ.</ListItem>
          <ListItem>Giá TỐT NHẤT thị trường.</ListItem>
          <ListItem>
            Chương trình KHUYẾN MÃI thường xuyên, ưu đãi đặc biệt với khách hàng đã sử dụng dịch vụ.
          </ListItem>
        </List>

        <Box>
          <Typography className='text-2xl font-semibold mb-7'>PET HOME CAM KẾT</Typography>
          <Typography className='text-xl font-light mb-5'>
            - ĐEM LẠI DỊCH VỤ TỐT NHẤT VỚI GIÁ TỐT NHẤT
          </Typography>
          <Typography className='text-xl font-light mb-5'>
            - ĐỘI NGŨ CHĂM SÓC KHÁCH HÀNG CHUYÊN NGHIỆP
          </Typography>
          <Typography className='text-xl font-light mb-5'>- NHÂN VIÊN ĐẾN TẠI NHÀ</Typography>
        </Box>
      </Box>
    </Box>
  </Container>
);

export default SectionOne;
