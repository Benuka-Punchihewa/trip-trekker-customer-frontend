import { getApi } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const getPaginatedPulseStreamData = async (
  attractionId,
  page,
  limit,
  orderBy
) => {
  const response = await getApi()
    .get(`/pulse-stream-data/attractions/${attractionId}`, {
      params: {
        page,
        limit,
        orderBy,
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
