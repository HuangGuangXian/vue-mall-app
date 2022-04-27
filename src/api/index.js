import Axios from 'axios';
import baseURL, { URLS } from './URLS';

const appkey = '2R_1650890100958';

const request = Axios.create({
  baseURL,
  params: {
    appkey,
  },
});
request.interceptors.response.use((value) => value.data);

const getSideList = (type) => request.get(
  URLS.getSide,
  { params: { type } },
);

const getGoodsList = (type, page, size, sort) => request.get(
  URLS.getGoodsList,
  {
    params: {
      type,
      size,
      sort,
      page,
    },
  },
);

const getLikeSearch = (value) => request.get(
  URLS.likeSearch,
  { params: { likeValue: value } },
);

const getSearch = (type, page, size) => request.get(
  URLS.search,
  { params: { type, page, size } },
);

const getGoodsByIds = (value) => request.get(
  URLS.getGoodsByIds,
  { params: { value } },
);

export default {
  getSideList,
  getGoodsList,
  getLikeSearch,
  getSearch,
  getGoodsByIds,
};
