/*
 * 新闻模块
 */
//定义Express路由器，并导出给外界
const express = require('express');
const pool = require('./pool');
var router = express.Router();
module.exports = router;

//定义产品模块可以对外提供的服务——路由
/**
 *按发布时间逆序返回新闻列表
 *请求格式：GET  /products/select?pageNum=1
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

router.get('/select', (req, res) => {
    var pno = req.query.pageNum;
    var type=req.query.type;
    console.log(pno,type);
    if(type){    //客户端提交的类型
        type = parseInt(type);
    }else{      //客户端未提交类型，默认为1
        type = 1;
    }
    if(pno){    //客户端提交的要查询的页号
        pno = parseInt(pno);
    }else{      //客户端未提交要类型的页号，默认为1
        pno = 1;
    }
    var pager = {
        totalRecord: 0,             //总记录数
        pageSize: 5,                //页面大小
        pageCount: 0,               //总页数
        pageNum: pno,               //要查询的页号
        data: null ,                 //当前页中记录

    };
    var sql = `SELECT COUNT(*) AS c FROM mf_product where type = ?`;
    pool.query(sql,[type],(err, result)=>{
        if(err)throw err;
        pager.totalRecord = result[0].c; //总记录数
        pager.pageCount = Math.ceil(pager.totalRecord/pager.pageSize);//总页数
        //查询当前页上的数据
        var sql = 'SELECT pid,title2,type,model,pic FROM mf_product order by pid LIMIT ?,?';
        pool.query(sql, [(pager.pageNum-1)*pager.pageSize, pager.pageSize],(err, result) => {
            if (err)throw err;
            pager.data = result;//当前页中的记录
            res.json(pager);
        });
    });
});

/**
 *根据产品ID返回产品详情
 *请求格式： GET  /product/detail?pid=x
 *请求参数：
 *    pid-产品ID，必需
 *输出结果：
 *{
 *  "pid": 1,
 *  ...
 *}
 */
router.get('/detail', (req, res)=>{
    var pid = req.query.pid;
    var sql = 'SELECT * FROM mf_product WHERE pid=?';
    pool.query(sql, [pid], (err, result)=>{
        if(err)throw err;
        res.json(result[0]);
    })
})