## Jira Project

### Config project coding environment

所有的字体和图片都放入到 src 文件夹中

1.设置路径引用
in tsconfig.json
`"baseUrl": "./src", // config the absolute path as src`

2.配置格式化
` yarn add --dev --exact prettier`
`echo {}> .prettierrc.json`
`touch .prettierignore`
`npx mrm@2 lint-staged` 安装 git hooks

in package.json file

```
"devDependencies": {
    "husky": ">=6",
    "lint-staged": ">=10",
    "prettier": "2.3.0"
  },
  "lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
  }
```

`yarn add eslint-config-prettier -D`

in package.json

```
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  },
```

3.处理 commit 提交的格式

`yarn add @commitlint/config-conventional @commitlint/cli -D`
`echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`
`npx husky add .husky/commit-msg "yarn commitlint --edit $1"`

### Config backend data

Using 'json-server'

可以配置 RESTful API Server 自定义程度高，增删改查真实模拟，但是无法随着后端 API 的修改而自动修改。
`npm i -g json-server`
`json-server --watch db.json`

add 'db.json'

在项目中配置 json-server
`yarn add -D json-server`
`mkdir __json_server_mock__`

in 'package.json'

```
"json-server": "json-server __json_server_mock__/db.json --watch"
```

### Coding Project

#### Set BackEnd Url

add files of '.env' and '.env.development'
coding `const apiUrl = process.env.REACT_APP_API_URL` in index.js

will config .env on run `npm start` or config .env.development on run `npm run build` automatically.

处理非 restful api

鸭子类型：面向接口编程，而不是面向对象编程
<<<<<<< HEAD

安装服务端
npx imooc-jira-tool
npx msw init public
=======

利用 jwt token 存储在 application/local storage

// put it after loadDevTools
import 'antd/dist/antd.less';

use craco 自定义 antd
yarn add @craco/craco
yarn add craco-less

修改 package.json 的 craco
