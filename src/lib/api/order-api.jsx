import axiosClient from "setup/configAxios";
const getAllOrder = async () => {
  try {
    const response = await axiosClient.get(`api/v1/orders?status=Processing`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const confirmOrder = async (params) => {
  try {
    const response = await axiosClient.post(
      `api/v1/orders/confirm`,

      {
        orderId: params,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const cancelOrder = async (params, reason) => {
  try {
    const response = await axiosClient.post(`api/v1/orders/cancel`, {
      orderId: params,
      reason: reason,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export { getAllOrder, confirmOrder, cancelOrder };
