export type ContentGetRequest = {
  identifier: string;
};

export type ContentCreateRequest = {
  identifier: string;
  iv: string;
  key: string;
  content: string;
};

export type ContentDeleteRequest = ContentGetRequest;

export type ContentGetResponse = {
  content: string;
};

export type ContentCreateResponse = {
  identifier: string;
  publicKey: string;
};
