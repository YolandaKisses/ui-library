/**
 * 数据转换操作
 */

/**
 * 线性结构转树形结构
 * @param {*} nodes 节点
 * @param {*} treeRootId 顶级根节点
 * @param {*} pidName 父节点名
 * @param {*} idName 子节点名
 * @param {*} mid 树形key
 * @returns
 */
export const converTreeData = (nodes, treeRootId, pidName, idName, mid) => {
  if (!pidName) pidName = "pid";
  if (!idName) idName = "id";
  if (!mid) {
    mid = "id";
  } else {
    // 增加唯一标识key
    nodes = nodes.map((item) => {
      item.mid = item[idName] + item[pidName] + Math.random() * 1000;
      return item;
    });
  }
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i][pidName] == treeRootId) {
      break;
    } else if (i == nodes.length - 1) {
      Message.closeAll();
      Message({
        message: "数据格式错误",
        type: "error",
        duration: 2 * 1000,
      });
    }
  }
  const nodesFilters = nodes;

  const groups = {};
  // 默认展开的节点
  const expandRowKeys = [];
  // 按父节点将节点分组
  for (const i in nodesFilters) {
    if (!groups[nodesFilters[i][pidName]]) {
      groups[nodesFilters[i][pidName]] = [];
    }
    groups[nodesFilters[i][pidName]].push(nodesFilters[i]);
    if (treeRootId && treeRootId === nodesFilters[i][idName]) {
      // 发现传入的根节点id作为节点id时，将根节点设置为该节点的父节点
      treeRootId = nodesFilters[i][pidName];
    }
  }

  const rootNodes = groups[treeRootId];
  groups[treeRootId] = null; // [SAFEGUARD]防止自为父节点或互为父节点（有环图结构）导致的死循环

  function traverseTreeNodeGroup(treeNodeGroup) {
    for (const i in treeNodeGroup) {
      const node = treeNodeGroup[i];
      if (groups[node[idName]]) {
        node.children = groups[node[idName]];
        groups[node[idName]] = null; // [SAFEGUARD]防止自为父节点或互为父节点（有环图结构）导致的死循环
        traverseTreeNodeGroup(node.children);
      }
      // 选择默认展开的节点
      if (node[pidName] == treeRootId) {
        expandRowKeys.push(node[mid]);
      }
    }
  }
  traverseTreeNodeGroup(rootNodes);

  return { data: rootNodes, expandRowKeys: expandRowKeys };
};

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
 * 根据pkey进行分组归类 => 只支持二级归类
 * @param {*} list 数据列表
 * @param {*} options 参数如下
 * @param {*} pkey 父级的key
 * @param {*} pname 父级的name
 * @param {*} ckey 子级的key
 * @param {*} cname 子级的name
 */
export function convertToGroup(list, options) {
  const _defaultOptioin = {
    pkey: "roleId",
    pname: "roleName",
    ckey: "userId",
    cname: "userName",
  };
  const { pkey, pname, ckey, cname } = Object.assign(_defaultOptioin, options);
  const map = {};
  list.forEach((item) => {
    const roleId = item[pkey];
    if (!map[roleId]) {
      map[roleId] = {
        pkey: roleId,
        pname: item[pname],
        children: [
          {
            ckey: item[ckey],
            cname: item[cname],
          },
        ],
      };
    } else {
      map[roleId].children.push({
        ckey: item[ckey],
        cname: item[cname],
      });
    }
  });
  return Object.values(map);
}

export default {
  converTreeData,
  convertToDictLabel,
  convertToGroup,
};
