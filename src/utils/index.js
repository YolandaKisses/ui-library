
import { getToken, setToken, removeToken } from "./auth";
import { getSqlDataBySqlCode, dictionaryList } from "./api";

/**
 * 线性列表转树性列表
 * @param {Array} list 数据列表
 * @param {Object} option 参数如下
 * @param {String} key 当前节点的key
 * @param {String} parentKey 父节点的key
 * @param {Boolean} isSort 是否排序
 * @param {String} sort 排序属性
 */
export function listToTree(list, option) {
  const _defaultOptioin = {
    key: "id",
    parentKey: "pid",
    isSort: true,
    sortKey: "sort",
  };
  const { key, parentKey, isSort, sortKey } = Object.assign(
    _defaultOptioin,
    option
  );
  // 存放结果集
  const result = [];
  const itemMap = {};
  for (const item of list) {
    const id = item[key];
    const pid = item[parentKey];

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      };
    }
    try {
      const _sort = Number(item[sortKey]);
      item[sortKey] = _sort || item[sortKey];
    } catch {}

    itemMap[id] = {
      ...item,
      children: isSort
        ? XEUtils.orderBy(itemMap[id]["children"], sortKey)
        : itemMap[id]["children"],
    };

    const treeItem = itemMap[id];

    if (!pid || pid == 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
      if (isSort) {
        itemMap[pid].children = XEUtils.orderBy(itemMap[pid].children, sortKey);
      }
    }
  }
  return isSort ? XEUtils.orderBy(result, sortKey) : result;
}

/**
 * 根据指定值从字典数据中转换label
 * @param {*} datas 字典数据
 * @param {*} value 编码
 * @returns
 */
export function convertToDictLabel(datas, value) {
  var actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key].value == "" + value) {
      actions.push(datas[key].label);
      return true;
    }
  });
  return actions.join("");
}

/**
 * 转换成下拉数据
 * @param {Object} data 参数
 * @param {String} valueKey 属性键
 * @param {String} labelKey 属性键
 * @param {String} selectedKey 属性键
 * @param {String} groupValueKey 属性键
 * @param {String} groupLabelKey 属性键
 */
export function convertToOptions(
  data,
  valueKey = "value",
  labelKey = "label",
  selectedKey = "selected",
  groupValueKey = "groupValue",
  groupLabelKey = "groupLabel"
) {
  const _result = [];
  if (data && data instanceof Array) {
    data.forEach((item) => {
      const value = item[valueKey] || "";
      const label = item[labelKey] || "";
      const selected = item[selectedKey] || "";
      const groupValue = item[groupValueKey] || "";
      const groupLabel = item[groupLabelKey] || "";
      let flag = true;
      if (!value && !label && !selected && !groupValue && !groupLabel) {
        flag = false;
      }
      if (flag) {
        _result.push({
          value,
          label,
          selected,
          groupValue,
          groupLabel,
        });
      }
    });
  }
  return _result;
}

export default {
  listToTree,
  convertToDictLabel,
  convertToOptions,
  getToken,
  setToken,
  removeToken,
  getSqlDataBySqlCode,
  dictionaryList
}