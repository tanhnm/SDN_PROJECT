import { DialogCancel } from "../components/DialogCancel";
import React, { useEffect, useState } from "react";
import DataTable from "../components/data-table";
import { getAllOrder, confirmOrder, cancelOrder } from "lib/api/order-api";
import { DropAction } from "../components/DropAction";

const ListOrder = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    const fetchListOrder = async () => {
      try {
        const data = await getAllOrder();
        const transformedRows = data.map((order, index) => ({
          id: index + 1,
          idOrder: order._id,
          product: order.orderDetails
            .map((detail) => detail.product.name)
            .join(`\n`),
          total: order.totalPrice,
          status: order.status,
          action: "",
          image: order.orderDetails.map((detail) => detail.product.image),
        }));
        setRows(transformedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListOrder();
  }, [reRender]);

  const handleConfirmOrder = async (params) => {
    try {
      await confirmOrder(params.row.idOrder);
      console.log("Order confirmed:", params.row.idOrder);
      setReRender(!reRender);
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const handleCancelOrder = async (data) => {
    try {
      await cancelOrder(data.orderId, data.reason);
      setReRender(!reRender);
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { field: "id", headerName: "Stt", width: 80 },
    { field: "idOrder", headerName: "ID đơn hàng", width: 220 },
    {
      field: "product",
      headerName: "Sản phẩm",
      width: 400,
      renderCell: (params) => <h1>{params.row.product}</h1>,
    },
    {
      field: "total",
      headerName: "Tổng giá",
      width: 130,
      renderCell: (params) => <b>{params.row.total} vnđ</b>,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 130,
      renderCell: (params) => <b>{params.row.status}</b>,
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => (
        <div className="flex text-center items-center justify-start gap-2 min-h-12">
          <DropAction
            onConfirm={() => handleConfirmOrder(params)}
            onCancel={(data) => handleCancelOrder(data)}
            status={params.row.status}
            orderId={params.row.idOrder}
          />
          <DialogCancel />
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1 className="font-bold font-mainText3 text-xl pb-4">
        Danh sách đơn hàng
      </h1>
      <DataTable rows={rows} columns={columns} />
    </div>
  );
};

export default ListOrder;
