/*
 * 新闻模块
 */
//定义Express路由器，并导出给外界
const express = require('express');
const pool = require('./pool');
var router = express.Router();
module.exports = router;



//定义新闻模块可以对外提供的服务——路由
/**
 *按发布时间逆序返回新闻列表
 *请求格式：GET  /news/select?pageNum=1
 *请求参数：
 *  pageNum-需显示的页号；默认为1
 *输出结果：
 *{
 *  totalRecord: 24,
 *  pageSize: 5,
 *  pageCount: 5,
 *  pageNum: 1,
 *  data: [{},{} ... {}]
 *}
 */


//登录

router.post("/login",(req,res)=>{
    var uname = req.query.uname;
    var upwd = req.query.upwd;

    var uid;
    var sql = "select uid,uname FROM mf_user WHERE uname = ? AND upwd = ? ";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.length>0){
            console.log(result);
            res.json({code:1,uname:result.uname,uid:result.uid,msg:"登录成功"});

        }else{
            res.json({code:400,msg:"用户名或密码错误请检查"});
        }
    });
});

router.get('/register', (req, res) => {
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    var phone = req.query.phone;
    var uid;


    var sql = 'INSERT INTO mf_user VALUES(NULL,?,?,?)';

    pool.query(sql,[uname,upwd,phone],(err, result)=>{
        if(err)throw err;
        console.log(result);

        if(result.affectedRows>0){
            res.json({code:1,msg:"注册成功"});
            uid = result.insertId;

        }else{
            res.json({code:500,msg:"注册失败 ！！！请检查"});
            console.log(123);
        }

    });
});
//验证用户名是否存在
router.post("/unameExist",(req,res)=>{
    var uname = req.body.uname;
    var sql = "SELECT uid FROM mf_user WHERE uname = ?";
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err;

        if(result.length>0){
            res.json({code:1,msg:"exist"});

        }else{
            res.json({code:500,msg:"non-exist"});

        }


    });
});

router.post("/phoneExist",(req,res)=>{
    var phone = req.body.phone;
    var sql = "SELECT uid FROM mf_user WHERE phone = ?";
    pool.query(sql,[phone],(err,result)=>{
        if(err) throw err;

        if(result.length>0){
            res.json({code:1,msg:"exist"});
        }else{
            res.json({code:500,msg:"non-exist"});
        }
    });
});










const svgCaptcha=require('svg-captcha');

router.get('/captcha',(req,res)=>{
    var captcha=svgCaptcha.create();
    console.log(111);
    req.session.captcha=captcha.text;
    console.log(req.session.captcha);
    // res.setHeader('Content-Type', 'image/svg+xml');
    // res.write(String(data));
    // res.end();
   // var txt=req.session.captcha;

    res.type('svg');
    //res.status(200).send(captcha.data);
   res.status(200).send(captcha.data);
});






/**
 *根据新闻ID返回新闻详情
 *请求格式： GET  /news/detail?nid=x
 *请求参数：
 *    nid-新闻ID，必需
 *输出结果：
 *{
 *  "nid": 1,
 *  ...
 *}
 */
router.get('/detail', (req, res)=>{
    var nid = req.query.nid;
    var sql = 'SELECT * FROM mf_news WHERE nid=?';
    pool.query(sql, [nid], (err, result)=>{
        if(err)throw err;
        res.json(result[0]);
    })
})