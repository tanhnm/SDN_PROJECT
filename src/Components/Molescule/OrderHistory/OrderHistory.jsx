import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import styles from "./OrderHistory.module.scss";
import MyAxios from "setup/configAxios";
import petCover from "../../../assets/images/pet-cover.webp";
import { motion } from "framer-motion";

const OrderHistory = () => {
  const [rows, setRows] = useState([]);
  const dataGridStyle = {
    fontSize: "10px", // Thay đổi kích thước font ở đây
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    //goi api
    MyAxios.get(`http://localhost:5000/api/v1/orders/history?userId=${userId}`).then((res) => {
      setRows(res.data);
    });
  }, []);
  console.log(rows);
  const columns = [
    {
      field: "_id",
      headerName: "OrderID",
      width: 120,
      renderCell: (params) => {
        return <div className={styles["id"]}>{params.row._id}</div>;
      },
    },
    {
      field: "order_info",
      headerName: "Order Info",
      width: 500,
      renderCell: (params) => {
        return (
          <div className={styles["order-info"]}>
            {params.row.orderDetails.map((detail) => (
              <span key={detail.product._id}>
                {detail.product.name} x{detail.quantity} ,
              </span>
            ))}
          </div>
        );
      },
    },
    {
      field: "orderdate",
      headerName: "Date",
      width: 120,
      renderCell: (params) => {
        return <div className={styles["date"]}>{params.row.dateOrder}</div>;
      },
    },
    {
      field: "shipping",
      headerName: "Shipping Address",
      width: 500,
      renderCell: (params) => {
        return (
          <div className={styles["address"]}>
            <span>{params.row.shipping.addressShipping.street}</span> ,
            <span>{params.row.shipping.addressShipping.district}</span> ,
            <span>{params.row.shipping.addressShipping.city}</span>
          </div>
        );
      },
    },
    {
      field: "totalPrice",
      headerName: "Total",
      width: 120,
      renderCell: (params) => {
        return <div className={styles["total-price"]}>{params.row.totalPrice}</div>;
      },
    },
    {
      field: "status",
      headerName: "Order Status",
      width: 100,
      renderCell: (params) => {
        return <div className={styles["status"]}>{params.row.status}</div>;
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-center items-center flex-row space-x-4">
        <div>
          <motion.h1
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl text-[#222a63] font-bold"
          >
            PET HOME
          </motion.h1>
          <motion.h1
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl text-[#4c4c4c] font-bold"
          >
            Đơn hàng
          </motion.h1>
        </div>
        <div>
          <img src={petCover} alt="Pet Cover" className="w-[50vw] hidden md:block" />
        </div>
      </div>
      <div className={styles["data"]}>
        <div className={styles["data-grid-container"]}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id} // Specify the custom id field
            style={{ fontSize: "0.9rem" }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 15]}
            checkboxSelection
            rowHeight={70}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
