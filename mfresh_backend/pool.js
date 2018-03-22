/*
 * 数据库连接池模块 —— 单例的
 * 所有其他需要数据库访问的模块引入此模块即可
 */

const mysql = require('mysql');
var pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    port:3306,
    database:"mfresh",
    connectionLimit:15
});

//导出链接迟对象，供其他模块使用

module.exports=pool;