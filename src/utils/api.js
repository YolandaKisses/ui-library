/**
 * @desc 通用sqlCode接口
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

export default {
  getSqlDataBySqlCode,
};
