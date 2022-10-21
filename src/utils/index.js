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
      resolve({
        key: item.key,
        data: res.data,
      });
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

/**
 * @desc 时间戳转换为不同的日期格式
 * @param { String | Number } 时间戳
 * @param { String | Number } type1 => yyyy年mm月dd日
 * @param { String | Number } type2 => yyyy-mm-dd
 * @param { String | Number } type3 => mm-dd
 * @param { String | Number } type4 => mm
 * @param { String | Number } type5 => dd
 * @param { String | Number } type6 => yyyy.mm.dd hh:mm:ss
 * @param { String | Number } type7 => yyyy-mm-dd hh:mm:ss
 * @param { String | Number } type8 => yyyy-mm-dd hh:mm
 * @param { String | Number } type9 => mm-dd hh:mm
 */
export function timeStamp2String(time, type) {
  // 创建 Date 对象
  let datetime = new Date();
  // 设置时间
  datetime.setTime(time);
  // 转换年
  let year = datetime.getFullYear();
  // 转换月 小于10自动补零
  let month =
    datetime.getMonth() + 1 < 10 ?
    "0" + (datetime.getMonth() + 1) :
    datetime.getMonth() + 1;
  // 转换日 小于10自动补零
  let date =
    datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  // 转换时 小于10自动补零
  let hour =
    datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  // 转换分 小于10自动补零
  let minute =
    datetime.getMinutes() < 10 ?
    "0" + datetime.getMinutes() :
    datetime.getMinutes();
  // 转换秒 小于10自动补零
  let second =
    datetime.getSeconds() < 10 ?
    "0" + datetime.getSeconds() :
    datetime.getSeconds();
  // 使用map对象根据传入type取相应格式返回
  return ({
    1: year + "年" + month + "月" + date + "日",
    2: year + "-" + month + "-" + date,
    3: month + "-" + date,
    4: month,
    5: date,
    6: year +
      "." +
      month +
      "." +
      date +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second,
    7: year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second,
    8: year + "-" + month + "-" + date + " " + hour + ":" + minute,
    9: month + "-" + date + " " + hour + ":" + minute,
  } [type] || "");
}

export default {
  myPromiseAll,
  arrObjSort,
  timeStamp2String,
  ...Api,
  ...ConvertData,
  ...RecursionData,
  ...RegExp,
};
