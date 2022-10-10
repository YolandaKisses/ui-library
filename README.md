## dd-ui-library 组件库

#### 项目地址

```javascript
npm库地址：https://www.npmjs.com/package/dd-ui-library
npm账号：miralceee, 密码：yolanda0807, 邮箱：jelare_svken@qq.com
组件库：https://github.com/YolandaKisses/ui-library
```

#### 目录结构

```javascript
├─ src
│  └─ components // 存放测试页面
│  └─ lib // 存放组件源码
│  └─ utils // 存放工具类
│  └─ router // 路由配置指向测试页面进行组件调试
│  └─ main.js
├─ .gitignore
└─ package.json
```

#### 组件封装

```javascript
src/lib 下存放组件源码，目录结构需统一为
├─ xxx组件
│  └─ src 
│	└─ index.vue // 组件源码
│  └─ index.js // 调用install方法注册
```

#### 工具类封装

```javascript
src/utils/index.js 为工具类方法出口文件
所有方法需导入index.js中，使用export default{}导出
```

#### 组件测试

```javascript
/components 中导入已封装完成的业务组件
/router中配置相应路由，指向/componetns中.vue文件(已封装完成的组件)用于页面展示进行测试
```

#### 配置打包命令进行打包

```javascript
配置scripts打包命令
"package": "vue-cli-service build --target lib ./src/lib/index.js --name dd-ui-library --dest dd-ui-library"

打包命令解释：
--target lib 关键字 指定打包的目录
--name 打包后的文件名字
--dest 打包后的文件夹的名称

然后执行打包命令：
npm run package
```

```javascript
npm install copy-webpack-plugin@4.6.0

vue.config.js中配置打包插件，将utils完整目录打入包内

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
module.exports = {
  publicPath: "./",
  assetsDir: 'static',
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  lintOnSave: false, // 是否开启eslint保存检测
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/utils'),
          to: path.resolve(__dirname, 'dd-ui-library/utils'),
          ignore: ".*"
        }
      ])
    ]
  }
}
```

#### 发布到npm

```javascript
cd ./dd-ui-library

npm init -y 初始化package.json

设置npm源：npm config set registry=https://registry.npmjs.org

添加npm账号：npm login  
目前已发布至：npm账号miralceee, 密码yolanda0807, 邮箱jelare_svken@qq.com 链接如最上方

发布：npm publish (不能重复发布同一个版本号，需修改package.json中version
```
