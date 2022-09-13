# ui-library

```
/lib 中存放组件源码
/components 中引用lib组件
/router 中配置路由指向components中的代码用于调试组件
例：
/components/Pagination-Select.vue 中引用 ../lib/Pagination-Select 已封装完的组件
/router中配置 { path: "/Pagination-Select", component: () => import('../components/Pagination-Select.vue') },
可在页面菜单中访问相应路由进行调试组件代码
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
