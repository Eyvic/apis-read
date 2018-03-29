var express = require('express');
var path=require("path");
var url=require("url");
var fs=require("fs");
var Province=require("./province");
var PinYin=require("./convertPinyin");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });// 创建 application/x-www-form-urlencoded 编码解析
var app = express();
var response;
var multer=require("multer");



app.use(express.static(path.join(__dirname,'public')));
console.log(__dirname)
app.use(express.static(path.join("https://dev.apis.sh/PW7yo9FpO",'avatar')));
app.use(express.static(path.join("https://dev.apis.sh/PW7yo9FpO",'cover')));


//获取所有页面
app.get('/login.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});
app.get('/getBackPassword.html', function (req, res) {
    res.sendFile( __dirname + "/" + "getBackPassword.html" );
});
app.get('/articleList.html', function (req, res) {
    res.sendFile( __dirname + "/" + "articleList.html" );
});
app.get('/articlePage.html', function (req, res) {
    res.sendFile( __dirname + "/" + "articlePage.html" );
});
app.get('/changePassword.html', function (req, res) {
    res.sendFile( __dirname + "/" + "changePassword.html" );
});
app.get('/personal.html', function (req, res) {
    res.sendFile( __dirname + "/" + "personal.html" );
});
app.get('/personal-secondSide.html', function (req, res) {
    res.sendFile( __dirname + "/" + "personal-secondSide.html" );
});
app.get('/resetPassword.html', function (req, res) {
    res.sendFile( __dirname + "/" + "resetPassword.html" );
});
app.get('/setting.html', function (req, res) {
    res.sendFile( __dirname + "/" + "setting.html" );
});
app.get('/writeArticle.html', function (req, res) {
    res.sendFile( __dirname + "/" + "writeArticle.html" );
});
app.get('/writeArticleWithPic.html', function (req, res) {
    res.sendFile( __dirname + "/" + "writeArticleWithPic.html" );
});
app.get('/writeArtWithPicBlue.html', function (req, res) {
    res.sendFile( __dirname + "/" + "writeArtWithPicBlue.html" );
});


//获取验证码
app.get('/captcha', function (req, res) {
    var urlObj=url.parse(req.url,true),
        query=urlObj["query"];
    var con=null,
        number=null,
        result=null,
        userType=query["type"],
        userPhone=query["phone"];

    con=fs.readFileSync("./public/captcha.json","utf-8");
    con.length===0?con='[]':null;
    con=JSON.parse(con);

    number=fs.readFileSync("./public/number.json","utf-8");
    number.length===0?number='[]':null;
    number=JSON.parse(number);
    if((userType==="register" || userType==="reset") && /^\s*1\d{10}\s*$/.test(userPhone)){
        if(con.length>0){
            result={
                code:"SUCCESS",
                message:"",
                captcha:con
            }
        }
    }else {
        if(userType==="" || userPhone===""){
            result={
                code:"param_incomplete",
                message:"请求参数不完整"
            };
        }else{
            if(!/^\s*1\d{10}\s*$/.test(userPhone)){
                result={
                    code:"phone_format_error",
                    message:"手机号格式错误"
                };
            }else{
                if(userType!=="register" && userType!=="reset"){
                    result={
                        code:"param_type_error",
                        message:"参数只能传规定值"
                    };
                }
            }
        }
    }
    if(number[0]["phone"]==userPhone){
        result={
            code:"account_has_registered",
            message:"用户已注册"
        };
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
    res.end(JSON.stringify(result));
});


//注册
app.post('/account/register', urlencodedParser,function (req, res) {
    var con=null,
        number=null;
    var enterPhone=req.body.account,
        enterCaptcha=req.body.captcha,
        enterPassword=req.body.password;

    con=fs.readFileSync("./public/captcha.json","utf-8");
    con.length===0?con='[]':null;
    con=JSON.parse(con);

    number=fs.readFileSync("./public/number.json","utf-8");
    number.length===0?number='[]':null;
    number=JSON.parse(number);

    if(/^\s*1\d{10}\s*$/.test(enterPhone) && 6<=enterPassword.length && enterPassword.length<=32 && enterCaptcha==con[0]["captcha"] && enterPhone!==number[0]["phone"]){
        response={
            code:"SUCCESS",
            message:"",
            data:{
                "user":{
                    "account": enterPhone,
                    "name": enterPhone,
                    "token": "8bccdca110bd48df4307c70564660bc090d742ef",
                    "background": "background/bg_center1.jpg",
                    "_id": "5a6fd2160780b12b22a50d98",
                    "city": []
                }
            }
        };
    }else {
        if(enterPhone=="" || enterPassword=="" ||enterCaptcha==""){
            response={
                code:"param_incomplete",
                message:"请求参数不完整"
            };
        }else {
            if(!/^\s*1\d{10}\s*$/.test(enterPhone)){
                response={
                    code:"phone_format_error",
                    message:"手机号格式错误"
                };
            }else {
                if(enterCaptcha!=con[0]["captcha"]){
                    response={
                        code:"sms_captcha_fail",
                        message:"短信验证码错误"
                    }
                }else {
                    if(!enterCaptcha){//////////////////////////////////////////过期
                        response={
                            code:"sms_captcha_overdue",
                            message:"短信验证码已过期"
                        }
                    }

                }
            }
        }
    }
    if(enterPhone==number[0]["phone"]){
        response={
            code:"account_has_registered",
            message:"用户已注册"
        }
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
    res.end(JSON.stringify(response));
});


//登录
app.post('/account/login', urlencodedParser, function (req, res) {
    var enterPhone=req.body.account,
        enterPassword=req.body.password;
    if((/^\s*1\d{10}\s*$/.test(enterPhone)) && (6<=enterPassword.length && enterPassword.length<=32)){
        response={
            code:"SUCCESS",
            message:"",
            data:{
                "user":{
                    "avatar": "avatar/23afed58f0fb30695763291fca92954b",
                    "_id": "5a60439b84f151301b1f042e",
                    "account": "18792548321",
                    "name": "187****8321",
                    "token": "da8f89211cffb4c8aba72ef5ff28649b0e572f0a",
                    "background": "background/bg_center5.jpg",
                    "constellations": "巨蟹座"
                }
            }
        }
    }else {
        if(enterPhone=="" || enterPassword==""){
            response={
                code:"param_incomplete",
                message:"请求参数不完整"
            };
        }else {
            /////////////////////////////////////////////////////////////////用户名和密码错误
            // if(){
            //     result={
            //         code:"account_password_error",
            //         message:"用户名或密码错误"
            //     };
            // }
        }
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
    res.end(JSON.stringify(response));
});

//头像
var upload = require('multer')({ dest: 'public/uploads/' });
var size=null;
app.post('/upload', upload.single('file'),function(req, res, next) {
    var url = '/uploads/' + req.file.filename;
    size=req.file.size;
    if (!req.file) {
        res.json({ ok: false });
        return;
    }else {
        res.json({
            code:200,
            data: url
        })
    }
});

//星座
app.get('/constellations/query',function (req,res) {
    response={
        code:"SUCCESS",
        data:{
            "constellations": [
                "白羊座",
                "金牛座",
                "双子座",
                "巨蟹座",
                "狮子座",
                "处女座",
                "天秤座",
                "天蝎座",
                "射手座",
                "摩羯座",
                "水瓶座",
                "双鱼座"
            ]
        }
    };

    res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
    res.end(JSON.stringify(response));
});

//省级查询
app.get('/city/province',function (req,res) {
    var urlObj=url.parse(req.url,true),
        query=urlObj["query"];
    var result=null,
        province=null,
        pro=query["Pro"];
    pro.length===0?pro="[]":null;
    if(pro =="[]"){
        result={
            code:"SUCCESS",
            message:"",
            data:
                //原定返回值为
                // [{
                //     "ProID":5,
                //     "name": "内蒙古自治区",
                //     "ProRemark": "自治区"
                // },
                //     {
                //         "ProID": 10,
                //         "name": "江苏省",
                //         "ProRemark": "省份"
                //     }]
                [{"id":0,"province":"辽宁"},{"id":1,"province":"吉林"},{"id":2,"province":"黑龙江"},{"id":3,"province":"河北"},{"id":4,"province":"山西"},{"id":5,"province":"陕西"},{"id":6,"province":"甘肃"},{"id":7,"province":"青海"},{"id":8,"province":"山东"},{"id":9,"province":"安徽"},{"id":10,"province":"江苏"},{"id":11,"province":"浙江"},{"id":12,"province":"河南"},{"id":13,"province":"湖北"},{"id":14,"province":"湖南"},{"id":15,"province":"江西"},{"id":16,"province":"台湾"},{"id":17,"province":"福建"},{"id":18,"province":"云南"},{"id":19,"province":"海南"},{"id":20,"province":"四川"},{"id":21,"province":"贵州"},{"id":22,"province":"广东"},{"id":23,"province":"内蒙古"},{"id":24,"province":"新疆"},{"id":25,"province":"广西"},{"id":26,"province":"西藏"},{"id":27,"province":"宁夏"},{"id":28,"province":"北京"},{"id":29,"province":"上海"},{"id":30,"province":"天津"},{"id":31,"province":"重庆"},{"id":32,"province":"香港"},{"id":33,"province":"澳门"},{"id":34,"province":"台湾"}]
        };

        res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }else {
        if(typeof pro !=="string"){
            result={
                code:"param_error",
                message:"请求参数错误"
            };
            res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
            return;
        }
        province=new Province();
        province.setName(pro);
        province.proConvert();
        result={
            code:"SUCCESS",
            message:"",
            data:{
                province:province.provinceChi
            }
        };
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
    res.end(JSON.stringify(result));
});

//市级查询
app.get("/city/city",function (req,res) {
    var urlObj=url.parse(req.url,true),
        query=urlObj["query"];
    var con=null,
        result=null,
        pro=query["Pro"],
        cit=query["City"];
    pro.length===0?pro="[]":null;
    typeof cit==="undefined"?cit="[]":null;

    //用户选择省份后获取所有城市（只选择省时）
    if(typeof pro==="string" && pro.length>2 && cit==="[]"){
        con=fs.readFileSync("./public/json/"+pro+".json","utf-8");
        con.length===0?con='[]':null;
        con=JSON.parse(con);

        result={
            status:200,
            data:{
                city:con
            }
        }
    }

    //用户选择城市
    if(typeof cit==="string" && cit.length>2){
        //如果用户点击省（按照传进来的省查找json文件，将文件内的城市名提取再转化为英语，如果和传的城市相等即为点击的城市）
        if(typeof pro==="string" && pro.length>2 && typeof cit ==="string"){
            var fileName=pro+".json",
                list=[],
                listEng=new PinYin();
            con=fs.readFileSync("./public/json/"+fileName,"utf-8");
            con=JSON.parse(con);
            for(var i=0;i<con.length;i++){
                list[i]=con[i]["city"];
            }
            for(i=0;i<list.length;i++){
                listEng.toConvert(list[i])===cit?cit=list[i]:null;
            }
        }else {
            //如果用户只点击城市，说明他选择的省为吉林
            ary=["长春","吉林","四平","辽源","通化","白山","松原","白城","延边"];
            switch (cit){
                case "changchun":
                    cit=ary[0];
                    break;
                case "jilin":
                    cit=ary[1];
                    break;
                case "siping":
                    cit=ary[2];
                    break;
                case "liaoyuan":
                    cit=ary[3];
                    break;
                case "tonghua":
                    cit=ary[4];
                    break;
                case "baishan":
                    cit=ary[5];
                    break;
                case "songyuan":
                    cit=ary[6];
                    break;
                case "baicheng":
                    cit=ary[7];
                    break;
                case "yanbian":
                    cit=ary[8];
                    break;
            }
        }
        result={
            code:"SUCCESS",
            message:"",
            data:{
                city:cit
            }
        }
    }
    if(typeof pro!=="string" && typeof cit !=="string"){
        result={
            code:"param_error",
            message:"请求参数错误"
        }
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
    res.end(JSON.stringify(result));
});

//编辑账户信息
app.post("/account/profile",urlencodedParser,function (req,res) {
    var result=null,
        name=req.body.name,
        token=req.body.token,
        city=req.body['city[]'],
        gender=req.body.gender,
        avatar=req.body.avatar,
        constellation=req.body.constellation;
    if(!city instanceof Array || city.length!==2 ||((city[0]>35 || city[0]<=0)||(city[1]>372 ||city[1]<=0))){//(city[3]>2825 || city[3]<=0）
        result={
            code:"param_type_error",
            message:"参数只能传规定值"
        }
    }else if(name==="" || city.length==="0" || gender.length==="0" || avatar==="" || constellation.length==="0"){
        result={
            code:"param_incomplete",
            message:"请求参数不完整"
        }
    }else if(token!=="46b08f7ba1304615af513205bc00ace53561997d" || size>307200){//随便写的
        result={
            code:"param_type_error",
            message:"参数只能传规定值(token&photo)"
        }
    }
    // else if(){
    //     result={
    //         code:"account_token_invalid",
    //         message:"身份状态已失效，请重新登录"
    //     }
    // }
    else {
        result={
            code:"SUCCESS",
            message:"",
            data:{
                user:{
                    // _id:,
                    // account:
                    name:name,
                    token:token,
                    // token:,
                    // background:,
                    city:city,
                    gender:gender,
                    avatar:avatar,
                    constellation:constellation
                }
            }
        };
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
    res.end(JSON.stringify(result));
});


//重置密码
app.post("/account/reset",urlencodedParser,function (req,res) {
    var result=null,
        captcha=fs.readFileSync("./public/captcha.json","utf-8");
    captcha=/\d{6}/g.exec(captcha);
    //没写登录失效和验证码失效
    //没写两次输入密码不同的提示
    if(req.body.token==="" && req.body.phone===""){//自己加的
        result={
            code:"param_incomplete",
            message:"请求参数不完整"
        }
    }else if(req.body.captcha!==captcha[0]){
        result={
            code:"sms_captcha_fail",
            message:"短信验证码错误"
        }
    }else if(req.body.token!=="3beca0b99c560ecf7f942276412d40e5bbc021ac"){//判断用户不存在，与存储的所有token进行比较，须修改
        result={
            code:"account_not_found",
            message:"用户不存在"
        }
    }else if(!/^\s*1\d{10}\s*$/.test(req.body.phone)){//判断条件应不是这个，因为如果不满足这点没法获取验证码，点提交时先提示验证码错误
        result={
            code:"phone_format_error",
            message:"手机号格式错误"
        }
    }else {
        result={
            code:"SUCCESS",
            message:"",
            token:"3beca0b99c560ecf7f942276412d40e5bbc021ac"
        };
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
    res.end(JSON.stringify(result));
});

//文章列表
app.get("/posts/list",function (req,res) {
    var urlObj=url.parse(req.url,true),
        query=urlObj["query"],
        page=query["page"],
        limit=query["limit"],
        user=query["user"],
        result=null;
    page.length===0?page="[]":null;
    limit.length===0?limit="[]":null;
    typeof user==="undefined"?user="[]":null;
    if(page==="[]" || limit==="[]"){
        result={
            code:"param_incomplete",
            message:"请求参数不完整"
        }
    }else if(!page instanceof Number || !limit instanceof Number ){
        result={
            code:"param_error",
            message:"请求参数错误"
        }
    }else if(!user){//这个需要改
        result={
            code:"account_not_found",
            message:"用户不存在"
        }
    }else if(user){//传user的ID时加载该作者的所有文章
        result={
            code:"SUCCESS",
            message:"",
            data:{
                articles:[
                    {
                        _id: "5a17e548d46b7b0af47684a0",
                        title: "比起啃老，中国人更爱啃亲戚",
                        cover: "cover/25316a9aafda0d9d680d6bf40154586a",
                        abstract: "在中国，亲戚交往中有这样一种观点：“我们都是亲戚，计较这些干什么？” 于是，生活中多了这样一批亲戚： 来你家蹭吃蹭喝，稍微表示不满，就教训你不尊重亲戚，不是一家人。 钱不够花...",
                        create_time: 1511514175000,
                        author: {
                            _id: "5a17e545d46b7b0af4768453",
                            name: "槽值",
                            avatar: "avatar/c166b26c480b42c315234131712b68c8"
                        },
                        look_sum: 41,
                        praise_sum: 2
                    },
                    {
                        _id: "5a17e548d46b7b0af47684a0",
                        title: "比起啃老，中国人更爱啃亲戚",
                        cover: "cover/25316a9aafda0d9d680d6bf40154586a",
                        abstract: "在中国，亲戚交往中有这样一种观点：“我们都是亲戚，计较这些干什么？” 于是，生活中多了这样一批亲戚： 来你家蹭吃蹭喝，稍微表示不满，就教训你不尊重亲戚，不是一家人。 钱不够花...",
                        create_time: 1511514175000,
                        author: {
                            _id: "5a17e545d46b7b0af4768453",
                            name: "槽值",
                            avatar: "avatar/c166b26c480b42c315234131712b68c8"
                        },
                        look_sum: 41,
                        praise_sum: 2
                    }
                ]
            },
            count:1002
        }
    }else {
        result={
            code:"SUCCESS",
            message:"",
            data:{
                articles:[
                    {
                        _id: "5a17e548d46b7b0af47684a0",
                        title: "比起啃老，中国人更爱啃亲戚",
                        cover: "cover/25316a9aafda0d9d680d6bf40154586a",
                        abstract: "在中国，亲戚交往中有这样一种观点：“我们都是亲戚，计较这些干什么？” 于是，生活中多了这样一批亲戚： 来你家蹭吃蹭喝，稍微表示不满，就教训你不尊重亲戚，不是一家人。 钱不够花...",
                        create_time: 1511514175000,
                        author: {
                            _id: "5a17e545d46b7b0af4768453",
                            name: "槽值",
                            avatar: "avatar/c166b26c480b42c315234131712b68c8"
                        },
                        look_sum: 41,
                        praise_sum: 2
                    },
                    {
                        _id: "5a17e548d46b7b0af47684a0",
                        title: "比起啃老，中国人更爱啃亲戚",
                        cover: "cover/25316a9aafda0d9d680d6bf40154586a",
                        abstract: "在中国，亲戚交往中有这样一种观点：“我们都是亲戚，计较这些干什么？” 于是，生活中多了这样一批亲戚： 来你家蹭吃蹭喝，稍微表示不满，就教训你不尊重亲戚，不是一家人。 钱不够花...",
                        create_time: 1511514175000,
                        author: {
                            _id: "5a17e545d46b7b0af4768453",
                            name: "槽值",
                            avatar: "avatar/c166b26c480b42c315234131712b68c8"
                        },
                        look_sum: 41,
                        praise_sum: 2
                    }
                ]
            },
            count:1002
        }
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
    res.end(JSON.stringify(result));
});

//文章详情
app.get("/posts/details",function (req,res) {
    var result=null,
        urlObj=url.parse(req.url,true),
        query=urlObj["query"],
        id=query["id"];
    if(typeof id==="undefined"){
        result={
            code:"param_incomplete",
            message:"请求参数不完整"
        }
    }else if(!id){//改，意为ID不存在
        result={
            code:"article_not_found",
            message:"文章不存在"
        }
    }else {
        result={
            "data": {
                "article": {
                    "_id": "5a17e548d46b7b0af47684a0",
                    "title": "比起啃老，中国人更爱啃亲戚",
                    "pic": "pic/2971666ec8e72e0f68e34a957530b6cf",
                    "body": "\n<p>在中国，亲戚交往中有这样一种观点：“我们都是亲戚，计较这些干什么？”</p><p>于是，生活中多了这样一批亲戚\：</p>(省略若干字)",
                    "create_time": 1511514175000,
                    "author": {
                        "_id": "5a17e545d46b7b0af4768453",
                        "name": "槽值",
                        "avatar": "avatar/c166b26c480b42c315234131712b68c8"
                    },
                    "look_sum": 41,
                    "praise_sum": 2
                }
            }
        }
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
    res.end(JSON.stringify(result));
});

//文章封面
var coverSize;
app.post('/upload/cover', upload.single('file'),function(req, res, next) {
    var url = '/uploads/' + req.file.filename;
    coverSize=req.file.size;
    if (!req.file) {
        res.json({ ok: false });
        return;
    }else {
        res.json({
            code:200,
            data: url
        })
    }
});

//发表文章
app.post("/posts/add",urlencodedParser,function (req,res) {
    var token=req.body.token,
        title=req.body.title,
        pic=req.body.pic,
        body=req.body.body,
        result=null;
    if(coverSize>1048576){
        result={
            message:"图片大小不可超过1m，请重新上传"
        }
    }else if(token==="" || title==="" || pic==="" || body==="" ){
        result={
            code:"param_incomplete",
            message:"请求参数不完整"
        }
    // }else if(title ===现有title){//可以新建一个正则title，在已有的标题库中捕获
    //     result={
    //         code:"article_has_exist",
    //         message:"文章标题已存在"
    //     }
    // }else if(登录状态失效){
    //     result={
    //         code:"account_token_invalid",
    //         message:"身份已失效，请重新登录"
    //     }
    }else {
        result={
            code:"SUCCESS",
            message:"发表成功"
        }
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
    res.end(JSON.stringify(result));
});

//发表评论
app.post("/comment/add",urlencodedParser,function (req,res) {
    var result=null,
        token=req.body.token,
        body=req.body.body,
        article=req.body.article;
    if(token===""||body===""||article===""){
        result={
            code:"param_incomplete",
            message:"请求参数不完整"
        }
    }else if(!article){//id不存在
        result={
            code:"article_not_found",
            message:"文章不存在"
        }
    }else if(身份失效){
        result={
            code:"account_token_invalid",
            message:"身份已失效，请重新登录"
        }
    }else {
        result={
            code:"SUCCESS",
            message:"发表成功"
        }
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
    res.end(JSON.stringify(result));
});

//评论列表
app.get('/comment/list',function (req,res) {
    var result=null,
        urlObj=url.parse(req.url,true),
        page=urlObj["page"],
        limit=query["limit"],
        article=query(["article"]);
    page.length===0?page="[]":null;
    limit.length===0?limit="[]":null;
    article.length===0?article="[]":null;

    if(page==="[]" || limit==="[]" || article==="[]"){
        result={
            code:"param_incomplete",
            message:"请求参数不完整"
        }
    }else if(!page || !limit || !article){
        result={
            code:"param_error",
            message:"请求参数错误"
        }
    }else {
        result={
            code:"SUCCESS",
            message:"",
            data:{
                comments:[
                    {
                        "_id": "5a5588ccef6aee1381003c90",
                        "body": "'年后啊'",
                        "author": {
                           "_id": "5a18028b3f548155c68022b7",
                           "name": "123****8913"
                        },
                        "praise_sum": 18,
                        "create_time": 1515555020908
                    },
                    {
                        "_id": "5a5588ccef6aee1381003c90",
                        "body": "'年后啊'",
                        "author": {
                            "_id": "5a18028b3f548155c68022b7",
                            "name": "123****8913"
                        },
                        "praise_sum": 18,
                        "create_time": 1515555020908
                    }
                ]
            },
            count:6
        }
    }

    res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
    res.end(JSON.stringify(result));
});


var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("连接成功，访问地址为 http://%s:%s", host, port)

});