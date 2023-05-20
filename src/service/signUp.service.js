import { getApiForFormData } from "../utils/axios";
import { buildResponse } from "../utils/responseBuilder";

export const signUpUser = async (data) => {
  const { tourGuide } = data;
  console.log("supun", tourGuide.certificate);

  const formData = new FormData();
  formData.append("strigifiedBody", JSON.stringify(data));
  formData.append("file", tourGuide.certificate);

  const response = await getApiForFormData()
    .post("/auth/sign-up", formData)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};

export const uploadProfileImage = async (data, userId) => {
  const { profileImg } = data;
  console.log("supun", profileImg);

  const formData = new FormData();
  formData.append("profileImg", profileImg);

  const response = await getApiForFormData()
    .patch(`/users/${userId}/profile-image`, formData)
    .then((res) => {
      return buildResponse(true, res.data);
    })
    .catch((err) => {
      return buildResponse(false, err.response.data, err.response.status);
    });

  return response;
};
