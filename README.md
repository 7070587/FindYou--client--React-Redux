![](https://github.com/7070587/FindYou--client--React-Redux/blob/master/README/1.PNG)

![2](https://github.com/7070587/FindYou--client--React-Redux/blob/master/README/2.PNG)

![3](https://github.com/7070587/FindYou--client--React-Redux/blob/master/README/3.PNG)

![4](https://github.com/7070587/FindYou--client--React-Redux/blob/master/README/4.PNG)

![5](https://github.com/7070587/FindYou--client--React-Redux/blob/master/README/5.PNG)

![6](https://github.com/7070587/FindYou--client--React-Redux/blob/master/README/6.PNG)

![7](https://github.com/7070587/FindYou--client--React-Redux/blob/master/README/7.PNG)

![8](https://github.com/7070587/FindYou--client--React-Redux/blob/master/README/8.PNG)

![9](https://github.com/7070587/FindYou--client--React-Redux/blob/master/README/9.PNG)



# 作品搭建

1. 使用create-react-app腳手架創建模板(工程化)

2. 引入antd-mobile, 並實現按需打包和自定義主題

3. 引入react-router-dom(v4): 
   （1）HashRouter/Route/Switch
   （2）history: push()/replace()

4. 引入redux
   （1）redux/react-redux/redux-thunk
   （2）redux: createStore()/combineReducers()/applyMiddleware()
   （3）react-redux: <Provider store={store}> / connect()(Xxx)
   （4）4個重要模塊: reducers/store/actions/action-types

# 登入/注冊界面

1. 創建3個1級路由: main/login/register

2. 完成登陸/注冊的靜態組件
   （1）antd組件: NavBar/WingBlank/WhiteSpace/List/InputItem/Radio/Button
   （2）路由跳轉: this.props.history.replace('/login')
   （3）收集表單輸入數據: state/onChange/變量屬性名

# 建立server

1. 使用webstorm創建基於node+express的後台應用

2. 根據需求編寫後台路由

3. 使用postman測試後台接口

4. 使用nodemon實現後台應用的自動重啟動

5. 路由回調函數的3步: 讀取請求參數/處理/返回響應數據

# 使用mongoose操作數據庫

1. 連接數據庫

2. 定義schema和Model

3. 通過Model函數對像或Model的實例的方法對集合數據進行CRUD操作 
