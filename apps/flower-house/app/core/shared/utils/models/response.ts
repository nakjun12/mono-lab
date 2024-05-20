export interface ResponsePostFeedsData {
  config: any;
  data: ResponsePostFeedsDto;
  headers: any;
  request: any;
  status: number;
  statusText: string;
}

export interface ResponsePostFeedsDto {
  data: string;
  id: number;
}

export interface ResponseImageUploadData {
  originUrl: string;
  originETag: string;
  thumbUrl: string;
  thumbETag: string;
}

export interface ResponseImageDto {
  config: any;
  data: ResponseImageUploadData;
  headers: any;
  request: any;
  status: number;
  statusText: string;
}

export interface ResponseGetFeedData {
  feedId: number;
  content: string;
  capturedAt: string;
  heartsCount: number;
  images: ResponseImageUploadData[];
  location: string;
}

export interface ResponseGetFeedsDto {
  config: any;
  data: ResponseGetFeedData;
  headers: any;
  request: any;
  status: number;
  statusText: string;
}
