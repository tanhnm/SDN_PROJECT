import { useEffect, useState } from "react";
import styles from "./Order.module.scss";
import MyAxios from "setup/configAxios";
import axios from "axios";
import OrderList from "./OrderList/OrderList";

const Order = () => {
  // cartDetails
  const [cartDetails, setCartDetails] = useState([]);

  // Load cart details from local storage
  useEffect(() => {
    const shopCart = localStorage.getItem("shopCart");
    if (shopCart) {
      const data = JSON.parse(shopCart);
      const details = data.map((item) => ({
        productId: item.id,
        quantity: item.value,
      }));
      setCartDetails(details);
    }
  }, []);
  //get in4 of user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    MyAxios.get(`http://localhost:5000/api/v1/user/${userId}`)
      .then((res) => {
        setUserInfo(res.data);
        console.log("res", userInfo);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // get Province and districts

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  // get address
  const [address, setAddress] = useState({
    street: "",
    district: "",
    city: "",
  });

  //GET DATA PROVINCES AND
  useEffect(() => {
    // Lấy tỉnh thành
    const getProvinces = async () => {
      try {
        const response = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
        setProvinces(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const selectedProvinceId = e.target.value;
    const dis = provinces.find((a) => a.full_name == selectedProvinceId);
    setAddress((prevAddress) => ({
      ...prevAddress,
      city: selectedProvinceId,
      district: "", // Reset district when province changes
    }));
    // Lấy quận huyện
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
  // payment
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const dataToSend = {
      userId: localStorage.getItem("userId"),
      addressShipping: address,
      paymentMethod: paymentMethod,
      cartDetails,
    };
    console.log("data", dataToSend);

    try {
      const response = await MyAxios.post("http://localhost:5000/api/v1/orders", dataToSend);

      if (response.status === 200) {
        console.log("Dữ liệu đã được gửi thành công!");
      } else {
        console.error("Gửi dữ liệu thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu", error);
    }
  };

  console.log("ca", cartDetails);

  return userInfo ? (
    <div className={styles["container"]}>
      <div className={styles["title"]}>Thanh toán</div>
      <form className={styles["order-info-form"]} onSubmit={handleSubmitOrder}>
        <div className={styles["content"]}>
          <div className={styles["order-info-left"]}>
            <div className={styles["content-title"]}>
              <h3 className={styles["text"]}>Thông tin thanh toán</h3>
            </div>

            <div className={styles["name-info"]}>
              <p className={styles["text"]}>Họ và tên</p>
              <input
                className={styles["input-text"]}
                type="text"
                placeholder="Họ tên của bạn"
                value={userInfo.name}
                disabled
              />
            </div>
            <div className={styles["phone-email-info"]}>
              <div className={styles["phone-info"]}>
                <p className={styles["text"]}>Số điện thoại</p>
                <input
                  className={styles["input-text"]}
                  type="tel"
                  placeholder="Số điện thoại của bạn"
                  value={userInfo.phone}
                  disabled
                />
              </div>
              <div className={styles["email-info"]}>
                <p className={styles["text"]}>Địa chỉ email</p>
                <input
                  className={styles["input-text"]}
                  type="email"
                  placeholder=" Email của bạn"
                  value={userInfo.email}
                  disabled
                />
              </div>
            </div>
            <div className={styles["address-info"]}>
              <div className={styles["provice-info"]}>
                <p className={styles["text"]}>Tỉnh/Thành phố</p>
                <select id="province" className={styles["select"]} onChange={handleProvinceChange} value={address.city}>
                  <option disabled value="">
                    Select Provinces ...
                  </option>
                  {provinces.map((province) => {
                    return (
                      <option key={province.id} value={province.full_name}>
                        {province.full_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles["dictrict-info"]}>
                <p className={styles["text"]}>Quận/Huyện</p>
                <select
                  id="district"
                  className={styles["select"]}
                  name="district"
                  onChange={handleAddressChange}
                  value={address.district}
                  disabled={!address.city}
                >
                  <option disabled value="">
                    Select Dictricts ...
                  </option>
                  {districts.map((district) => {
                    return (
                      <option key={district.id} value={district.full_name}>
                        {district.full_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className={styles["duong-info"]}>
              <p className={styles["text"]}>Địa chỉ</p>
              <input
                className={styles["input-text"]}
                type="text"
                name="street"
                placeholder="Ví dụ : 20A Nguyễn Huệ"
                value={address.street}
                onChange={handleAddressChange}
              />
            </div>
            <div className={styles["payment"]}>
              <div className={styles["payment-title"]}>Phương thức thanh toán</div>
              <ul>
                <li>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={handlePaymentMethodChange}
                    className={styles["payment-input"]}
                  />
                  <span> Trả tiền mặt khi nhận hàng</span>
                </li>
                <li>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="OP"
                    checked={paymentMethod === "OP"}
                    onChange={handlePaymentMethodChange}
                    className={styles["payment-input"]}
                  />
                  <span> Thanh toán qua mã QR</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles["order-info-right"]}>
            <OrderList />
            <button type="submit" className={styles["order-button"]}>
              Đặt hàng{" "}
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
