import {
  PostFeedsRequest,
  UploadImageDto
} from "@/app/core/shared/utils/models/request";
import instance from "../axios";

export const postFeeds = async (body: PostFeedsRequest) => {
  try {
    return await instance.post(`/api/v1/feeds`, body);
  } catch (err) {
    throw err;
  }
};

export const uploadImage = async (body: UploadImageDto) => {
  try {
    return await instance.post(`/api/v1/images`, body, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  } catch (err) {
    throw err;
  }
};

export const getFeed = async (id: number) => {
  try {
    return await instance.get(`/api/v1/feeds/${id}`);
  } catch (err) {
    throw err;
  }
};
