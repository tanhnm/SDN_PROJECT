import axiosClient from "setup/configAxios";

export const getAllCombo = async () => {
  try {
    const response = await axiosClient.get(
      `api/v1/products?type=service&name=spa&species=both`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const AscendingSort = async () => {
  try {
    const response = await axiosClient.get(
      `api/v1/products/sort?type=service&name=spa&species=both&sort=asc`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const DescendingSort = async () => {
  try {
    const response = await axiosClient.get(
      `api/v1/products/sort?type=service&name=spa&species=both&sort=desc`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const DetailService = async (id) => {
  try {
    const response = await axiosClient.get(
      `http://localhost:5000/api/v1/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPet = async (id) => {
  try {
    const response = await axiosClient.get(`api/v1/pet?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const CreateServiceBooking = async (bookingData) => {
  try {
    const response = await axiosClient.post("api/v1/service", bookingData);
    console.log("viet", response);
    return { response };
  } catch (error) {
    console.log(error);
    if (error.code === "ERR_NETWORK") {
      return { error: "BE Server is not running" };
    }
    const status = error.response?.status;
    let errorMessage = "Something went wrong";
    if (status === 403) {
      errorMessage = "You do not have permission";
    } else if (status === 500) {
      errorMessage = "Server has problems";
    } else if (status === 400) {
      errorMessage = "Bad request";
    }

    return { error: errorMessage, data: null };
  }
};
