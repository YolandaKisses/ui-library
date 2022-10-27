/**
 * 存放常用的正则表达式
 */

/**
 * @desc 转换为百分位
 * @param { String } value 待验证的数值
 * @returns 验证结果
 */
export function ConvertPercentile(value) {
  const reg = /(\d)(?=(\d{2})+$)/g;
  return value.replace(reg, "$1,");
}

/**
 * @desc 转换为千分位
 * @param { String } value 待验证的数值
 * @returns 验证结果
 */
export function ConvertThousands(value) {
  const reg = /(\d)(?=(\d{3})+$)/g;
  return value.replace(reg, "$1,");
}

/**
 * @desc 转换为万分位
 * @param { String } value 待验证的数值
 * @returns 验证结果
 */
export function ConvertWan(value) {
  const reg = /(\d)(?=(\d{4})+$)/g;
  return value.replace(reg, "$1,");
}

/**
 * @desc 是否是正数，可以是整数，也可以是浮点数
 * @param { String | Number } value 待验证的数值
 * @returns 验证结果
 */
export function isPositiveNumber(value) {
  const reg = /^\d*\.?\d+$/;
  return reg.test(value);
}

/**
 * @desc 验证电子邮箱格式是否正确
 * @param { String } value 待验证的电子邮箱
 * @returns 验证结果
 */
export function validEmail(value) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(value);
}

/**
 * @desc 验证手机号格式是否正确
 * @param { String | Number } value 待验证的手机号
 * @returns 验证结果
 */
export function phone(value) {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(value);
}

/**
 * @desc 判断是否为空
 * @param {*} val 待验证内容
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

/**
 * @desc 身份证号正则
 * @param { String | Number } value 待验证的身份证
 * @returns 验证结果
 */
export function validIdentity(value) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return reg.test(value);
}

/**
 * @desc 验证日期格式yyyy-mm-dd
 * @param { String | Number } value 待验证的日期格式
 * @returns 验证结果
 */
export function validDate(value) {
  const reg = /^\d{4}-\d{1,2}-\d{1,2}/
  return reg.test(value);
}

/**
 * @desc 验证密码格式
 * @param { String | Number } value 待验证的密码格式
 * @returns 验证结果
 */
export function validPwd(value) {
  const reg = /^[a-zA-Z]\w{5,17}$/
  return reg.test(value);
}

/**
 * @desc 验证强密码格式
 * @param { String | Number } value 待验证的强密码格式
 * @returns 验证结果
 */
export function validStrongPwd(value) {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
  return reg.test(value);
}


export default {
  ConvertPercentile,
  ConvertThousands,
  ConvertWan,
  isPositiveNumber,
  validEmail,
  phone,
  isNull,
  validIdentity,
  validDate,
  validPwd,
  validStrongPwd
}