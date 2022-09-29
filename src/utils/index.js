import { getSqlDataBySqlCode } from "./api.js";
import {
  converTreeData,
  convertToDictLabel,
  convertToGroup,
} from "./convertData.js";

function PromiseObj(item) {
  return new Promise((resolve, reject) => {
    let obj = {};
    if (item.method == "get") {
      obj = {
        url: item.url + "?" + qs.stringify(item.params),
        method: "get",
      };
    }
    if (item.method == "post") {
      if (item.paramsType == "json") {
        obj = {
          url: item.url,
          method: "post",
          data: item.params,
        };
      }
      if (item.paramsType == "formdata") {
        obj = {
          url: item.url,
          method: "post",
          data: qs.stringify(item.params),
        };
      }
    }
    request(obj).then((res) => {
      resolve({ key: item.key, data: res.data });
    });
  });
}

/**
 * Promise.all 封装
 * @param {Array} array
 */
export function myPromiseAll(array) {
  let AllList = [];
  array.forEach((item) => {
    AllList.push(PromiseObj(item));
  });
  return Promise.all(AllList);
}

export default {
  converTreeData,
  convertToDictLabel,
  convertToGroup,
  getSqlDataBySqlCode,
  myPromiseAll,
};
