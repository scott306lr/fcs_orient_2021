# api
這裡會建立連結後端DB的RESTAPI
mangoDB + mongoose

### 安裝
```
npm install
```

### 啟動
```
npm start
```

### Import multiple documents contained in a JSON array
- Run this outside the mongo shell
- Modify **tableName** and **path**
```
mongoimport --collection=<tableName> --file=<path> --jsonArray
```
