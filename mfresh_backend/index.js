const http = require('http');
const express = require('express');
var port = 8888;

var app = express();
http.createServer(app).listen(port, ()=>{
    console.log('Listening At ' + port + '...');
});

/*****使用中间件修改req和res对象*****/
//将请求消息主体中的数据封装到req.body属性
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

//使用CORS方案允许客户端的XHR跨域请求
const cors = require('cors');
app.use(cors());
//console.log(cors());

const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 60000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));


//使用验证码
const svgCaptcha=require('svg-captcha');


/*****挂载所有的路由器（其中都包含若干路由）*****/
const routerNews = require('./news');
const routerUser = require('./user');
const routerProduct = require('./products');
//const routerCart = require('./cart');
app.use('/news', routerNews );



app.use('/user', routerUser );
app.use('/product', routerProduct );
//app.use('/cart', routerCart );