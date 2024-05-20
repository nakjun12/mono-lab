import { ResponseImageUploadData } from "@/app/core/shared/utils/models/response";

export interface PostFeedsRequest {
  content: string;
  password: string;
  capturedAt: string;
  locationId: number;
  images: CreateImageDto[];
}

interface CreateImageDto extends ResponseImageUploadData {
  flowerId: number;
  floweringStatus: number;
}

export type UploadImageDto = FormData;
