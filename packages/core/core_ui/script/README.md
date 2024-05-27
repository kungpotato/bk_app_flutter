#Bitkub Design Token Parser

This project is used for parse the design token from XD

##Get started

### Pre-requisite

- Node 14
- Yarn

### How to use

```shell
Install dependencies
$ yarn

Generate design token
$ yarn gen
```
### Step by step

1. Run `yarn` to install dependencies
2. Extract these file from design token .zip into `token` folder
   1. app-default.json
   2. app_dark.json
   3. global.json
3. Run `yarn gen` to generate native code
4. Generated code is in `build` folder
5. Copy files to your project folder
