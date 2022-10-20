import Api from "./Api.js";
import ConvertData from "./ConvertData.js";
import RecursionData from "./RecursionData.js";
import RegExp from "./RegExp.js";
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
 * @desc Promise.all 封装
 * @param { Array } array
 */
export function myPromiseAll(array) {
  let AllList = [];
  array.forEach((item) => {
    AllList.push(PromiseObj(item));
  });
  return Promise.all(AllList);
}

/**
 * @desc 数组对象排序
 * @param { Array } 需要排序数据
 * @param { String } 参与排序字段
 * @param { String } 正序asc，倒序desc
 * @return sort会改变原数据，无需return
 */
export function arrObjSort(arrObj, column, order) {
  // 转换大写
  order = order.toUpperCase();
  // 正序
  if (order == "ASC") {
    arrObj = arrObj.sort((a, b) => {
      return Number(a[column]) - Number(b[column]);
    });
  }
  // 倒序
  if (order == "DESC") {
    arrObj = arrObj.sort((a, b) => {
      return Number(b[column]) - Number(a[column]);
    });
  }
}

export default {
  myPromiseAll,
  arrObjSort,
  ...Api,
  ...ConvertData,
  ...RecursionData,
  ...RegExp,
};
