/**
 * 存放常用的正则表达式
 */

/**
 * 转换为百分位
 * @param {*} value 待验证的数值
 * @returns 验证结果
 */
export function ConvertPercentile(value) {
  const reg = /(\d)(?=(\d{2})+$)/g;
  return value.replace(reg, "$1,");
}

/**
 * 转换为千分位
 * @param {*} value 待验证的数值
 * @returns 验证结果
 */
export function ConvertThousands(value) {
  const reg = /(\d)(?=(\d{3})+$)/g;
  return value.replace(reg, "$1,");
}

/**
 * 转换为万分位
 * @param {*} value 待验证的数值
 * @returns 验证结果
 */
export function ConvertWan(value) {
  const reg = /(\d)(?=(\d{4})+$)/g;
  return value.replace(reg, "$1,");
}

/**
 * 是否是非负整数
 * @param {*} value 待验证的数值
 * @returns 验证结果
 */
export function isPositiveInteger(value) {
  const reg = /^\d+$/;
  return reg.test(value);
}

/**
 * 是否是正数，可以是整数，也可以是浮点数
 * @param {*} value 待验证的数值
 * @returns 验证结果
 */
export function isPositiveNumber(value) {
  const reg = /^\d*\.?\d+$/;
  return reg.test(value);
}

/**
 * 验证电子邮箱格式是否正确
 * @param {*} value 待验证的电子邮箱
 * @returns 验证结果
 */
export function validEmail(value) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(value);
}

/**
 * 验证手机号格式是否正确
 * @param {*} value 待验证的手机号
 * @returns 验证结果
 */
export function phone(value) {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(value);
}

/**
 * 判断是否为空
 * @param {*} value 待验证内容
 * @returns 验证结果
 */
export function isNull(val) {
  if (typeof val === "boolean") {
    return false;
  }
  if (typeof val === "number") {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === "{}") return true;
  } else {
    if (
      val === "null" ||
      val == null ||
      val === "undefined" ||
      val === undefined ||
      val === ""
    )
      return true;
    return false;
  }
  return false;
}

export default {
  ConvertPercentile,
  ConvertThousands,
  ConvertWan,
  isPositiveInteger,
  isPositiveNumber,
  validEmail,
  phone,
  isNull
}