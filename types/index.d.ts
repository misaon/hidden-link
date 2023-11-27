export type ContentItem = {
  iv: string;
  data: string;
};

export type ContentGetRequest = {
  identifier: string;
};

export type ContentCreateRequest = {
  identifier: string;
  iv: string;
  content: string;
};

export type ContentDeleteRequest = ContentGetRequest;

export type ContentGetResponse = {
  content: ContentItem;
};

export type ContentCreateResponse = {
  identifier: string;
};
