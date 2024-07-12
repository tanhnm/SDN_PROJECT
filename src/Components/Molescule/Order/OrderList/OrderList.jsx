import { useContext, useState, useEffect } from 'react';
import MyAxios from 'setup/configAxios';
import styles from './OrderList.module.scss';

const OrderList = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsReady, setProductsReady] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    MyAxios.get('http://localhost:5000/api/v1/products?type=product').then((response) => {
      setProducts(response.data.data);
      setProductsReady(true); // Đánh dấu rằng dữ liệu sản phẩm đã sẵn sàng
    });

    // Lấy dữ liệu từ Local Storage
    const cartData = JSON.parse(localStorage.getItem('shopCart'));

    const updatedCartItems = [];
    let totalQuantity = 0;
    let totalPrice = 0;
    //  truy xuất thông tin nếu dữ liệu  true
    if (productsReady) {
      for (const item of cartData) {
        const productId = item.id;
        const quantity = item.value;
        const product = products.find((p) => p._id === productId);
        if (product) {
          const totalproductPrice = product.price * quantity;

          setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + totalproductPrice);

          updatedCartItems.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity,
            totalproductPrice,
            image: product.image,
          });
        }
      }
    }

    setOrderItems(updatedCartItems);
  }, [productsReady]);

  let ship = 12000;
  let total = totalPrice + ship;

  return (
    <div className={styles.orderContainer}>
      <div className={styles.order}>
        <h2 className={styles.title}>Your Order ({totalQuantity} items)</h2>
        <div className={styles.orderContent}>
          <div className={styles.productHeader}>Product</div>
          <div className={styles.tempTotalHeader}>Subtotal</div>
        </div>
        <div className={styles.orderItems}>
          {orderItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.leftContent}>
                <div className={styles.quantityBadge}>{item.quantity}</div>
                <div className={styles.description}>
                  <div className={styles.image}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.name}>{item.name}</div>
                </div>
              </div>
              <div className={styles.rightContent}>
                <div className={styles.price}>{(item.price * item.quantity).toLocaleString()}đ</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.divider}></div>
        <div className={styles.footer}>
          <div className={styles.footerRow}>
            <span className={styles.footerTitle}>Subtotal</span>
            <span className={styles.footerValue}>{totalPrice.toLocaleString()}đ</span>
          </div>
          <div className={styles.footerRow}>
            <span className={styles.footerTitle}>Shipping</span>
            <span className={styles.footerValue}>{ship.toLocaleString()}đ</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.footerRow}>
            <span className={styles.footerTitle}>Total</span>
            <span className={styles.footerValue}>{total.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
