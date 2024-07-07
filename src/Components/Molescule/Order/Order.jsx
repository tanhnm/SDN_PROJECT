import { useEffect, useState } from 'react';
import styles from './Order.module.scss';
import MyAxios from 'setup/configAxios';
import axios from 'axios';
import OrderList from './OrderList/OrderList';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [address, setAddress] = useState({ street: '', district: '', city: '' });
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const shopCart = localStorage.getItem('shopCart');
    if (shopCart) {
      const data = JSON.parse(shopCart);
      const details = data.map((item) => ({
        productId: item.id,
        quantity: item.value,
      }));
      setCartDetails(details);
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    MyAxios.get(`http://localhost:5000/api/v1/user/${userId}`)
      .then((res) => {
        setUserInfo(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
        setProvinces(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const selectedProvinceId = e.target.value;
    const dis = provinces.find((a) => a.full_name === selectedProvinceId);
    setAddress((prevAddress) => ({
      ...prevAddress,
      city: selectedProvinceId,
      district: '',
    }));
    if (dis) {
      try {
        const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${dis.id}.htm`);
        setDistricts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const dataToSend = {
      userId: localStorage.getItem('userId'),
      addressShipping: address,
      paymentMethod: paymentMethod,
      cartDetails,
    };

    try {
      const response = await MyAxios.post('http://localhost:5000/api/v1/orders', dataToSend);
      console.log(response);
      if (response.status === 'success') {
        toast.success('Đặt hàng thành công!');
        localStorage.setItem('shopCart', []);
        navigate('/');
        setCartDetails([]);
      } else {
        toast.error('Đặt hàng thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu', error);
      toast.error('Đặt hàng thất bại! Lỗi khi gửi dữ liệu');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return userInfo ? (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <form className={styles.form} onSubmit={handleSubmitOrder}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Billing Information</h2>
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input className={styles.input} type='text' value={userInfo.name} disabled />
            </div>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label className={styles.label}>Phone Number</label>
                <input className={styles.input} type='tel' value={userInfo.phone} disabled />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email Address</label>
                <input className={styles.input} type='email' value={userInfo.email} disabled />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Province/City</label>
              <select
                id='province'
                className={styles.select}
                onChange={handleProvinceChange}
                value={address.city}
              >
                <option disabled value=''>
                  Select Province...
                </option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.full_name}>
                    {province.full_name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>District</label>
              <select
                id='district'
                className={styles.select}
                name='district'
                onChange={handleAddressChange}
                value={address.district}
                disabled={!address.city}
              >
                <option disabled value=''>
                  Select District...
                </option>
                {districts.map((district) => (
                  <option key={district.id} value={district.full_name}>
                    {district.full_name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Address</label>
              <input
                className={styles.input}
                type='text'
                name='street'
                placeholder='e.g., 20A Nguyen Hue'
                value={address.street}
                onChange={handleAddressChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Payment Method</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type='radio'
                    name='paymentMethod'
                    value='COD'
                    checked={paymentMethod === 'COD'}
                    onChange={handlePaymentMethodChange}
                  />
                  Cash on Delivery
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type='radio'
                    name='paymentMethod'
                    value='OP'
                    checked={paymentMethod === 'OP'}
                    onChange={handlePaymentMethodChange}
                  />
                  QR Code Payment
                </label>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Order Summary</h2>
            <OrderList />
            <button type='submit' className={styles.orderButton}>
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <></>
  );
};

export default Order;
