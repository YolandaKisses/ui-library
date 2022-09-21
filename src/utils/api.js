/**
 * 通用sqlCode接口
 * @param { Object } request 请求实例
 * @param { Object } data 查询条件
 */
export function getSqlDataBySqlCode(request, data) {
  return request({
    url: "rest/report/getSqlDataBySqlCode.do",
    method: "GET",
    params: {
      ...data,
    },
  });
}

/**
 * 获取数据字典数据
 * @param { Object } request 请求实例
 * @param { String } dictType 字典类型参数
 */
export function dictionaryList(request, dictType) {
  return request({
    url: "/dictionary/type/" + dictType,
    method: "GET",
  });
}

export default {
  getSqlDataBySqlCode,
  dictionaryList,
};
