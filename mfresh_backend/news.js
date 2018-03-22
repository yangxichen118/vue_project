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

router.get('/select', (req, res) => {
    var pno = req.query.pageNum;
    if(pno){    //客户端提交的要查询的页号
        pno = parseInt(pno);
    }else{      //客户端未提交要查询的页号，默认为1
        pno = 1;
    }
    var pager = {
        totalRecord: 0,             //总记录数
        pageSize: 5,                //页面大小
        pageCount: 0,               //总页数
        pageNum: pno,               //要查询的页号
        data: null                  //当前页中记录
    };
    var sql = 'SELECT COUNT(*) AS c FROM mf_news';
    pool.query(sql,(err, result)=>{
        if(err)throw err;
        pager.totalRecord = result[0].c; //总记录数
        pager.pageCount = Math.ceil(pager.totalRecord/pager.pageSize);//总页数
        //查询当前页上的数据
        var sql = 'SELECT nid,title,pubTime FROM mf_news ORDER BY pubTime DESC LIMIT ?,?';
        pool.query(sql, [(pager.pageNum-1)*pager.pageSize, pager.pageSize],(err, result) => {
            if (err)throw err;
            pager.data = result;//当前页中的记录
            res.json(pager);
        });
    });
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