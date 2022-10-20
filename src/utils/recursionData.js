
/**
 * 根据id递归树形结构数据增删改查操作
 */

/**
 * @desc 根据目标id删除指定节点
 * @param {*} list 数据源
 * @param {*} targetId 目标id
 */
export function deleteNodeById(list, targetId) {
  if (!list) return
  list.forEach((item, index) => {
    if (item.id === targetId) {
      list.splice(index, 1)
      return
    } else {
      if (Array.isArray(item.children) && item.children.length) {
        deleteNodeById(item.children, targetId)
      }
    }
  })
}

/**
 * @desc 根据目标id查找指定节点
 * @param {*} list 数据源
 * @param {*} targetId 目标id
 */
export function selectNodeById(list, targetId) {
  if (!list) return
  let nodeTree = null
  for (let i = 0; i < list.length; i++) {
    if (nodeTree !== null) break
    let node = list[i];
    if (node.id === targetId) {
      nodeTree = node
      break
    } else {
      if (Array.isArray(node.children) && node.children.length) {
        nodeTree = selectNodeById(node.children, targetId)
      }
    }
  }
  return nodeTree
}

/**
 * @desc 添加节点到目标id下
 * @param {*} list 数据源
 * @param {*} targetId 目标id
 * @param {*} obj 目标对象
 */
export function appendNodeById(list, targetId, obj) {
  if (!list) return
  list.forEach(item => {
    if (item.id === targetId) {
      item.children ? item.children.push(obj) : item['children'] = obj
    } else {
      if (Array.isArray(item.children) && item.children.length) {
        appendNodeById(item.children, targetId, obj)
      }
    }
  })
}

/**
 * @desc 修改目标id数据
 * @param {*} list 数据源
 * @param {*} targetId 目标id
 * @param {*} obj 目标对象
 */
export function updateNodeById(list, targetId, obj) {
  if (!list) return
  list.forEach((item, index) => {
    if (item.id === targetId) {
      list.splice(index, 1, obj)
      return
    } else {
      if (Array.isArray(item.children) && item.children.length) {
        updateNodeById(item.children, targetId, obj)
      }
    }
  })
}


export default {
  deleteNodeById,
  selectNodeById,
  appendNodeById,
  updateNodeById
};
