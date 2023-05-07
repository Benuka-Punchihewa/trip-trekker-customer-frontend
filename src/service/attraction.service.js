import { getApi } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const getPaginatedAttractions = async (
  page,
  limit,
  orderBy,
  keyword
) => {
  const response = await getApi()
    .get("/attractions", {
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

export const getAttractionById = async (id) => {
  const response = await getApi()
    .get(`/attractions/${id}`)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};
