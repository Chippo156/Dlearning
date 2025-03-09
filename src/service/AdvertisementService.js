import axios from "../utils/CustomAxios";

export const getAdsActive = async () => {
  try {
    const response = await axios.get("api/v1/advertisement/get-ads-active");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAdsCurrentLogin = async (currentPage, pageSize) => {
  try {
    const response = await axios.get("api/v1/advertisement/get-ads", {
      params: {
        page: currentPage,
        size: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
