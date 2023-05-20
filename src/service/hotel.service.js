import { getApi } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const getPaginatedHotels = async (
  page,
  limit,
  orderBy,
  keyword
) => {
  const response = await getApi()
    .get("/hotels", {
      params: {
        page,
        limit,
        orderBy,
        keyword,
      },
    })
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const getById = async (id) => {
  const response = await getApi()
    .get(`/hotels/${id}`)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const getNearestHotels = async (lat, lng, limit) => {
  const response = await getApi()
    .get("/hotels/nearest/locations", {
      params: {
        limit,
        lat,
        lng,
      },
    })
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

