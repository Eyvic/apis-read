//验证码
function getRandom(n,m) {
    return Math.round(Math.random()*(m-n)+n);
}
var fs=require("fs"),
    value=getRandom(000000,999999),
    captcha=null,
    ary=[],
    obj={};
    switch (value.toString().length){
        case 0:
            captcha="000000"+value;
            break;
        case 1:
            captcha="00000"+value;
            break;
        case 2:
            captcha="0000"+value;
            break;
        case 3:
            captcha="000"+value;
            break;
        case 4:
            captcha="00"+value;
            break;
        case 5:
            captcha="0"+value;
            break;
        case 6:
            captcha=value;
            break;
    }
    obj.captcha=captcha;
    ary.push(obj);
fs.writeFileSync("../captcha.json",JSON.stringify(ary),"utf-8");

//手机号
var phone=[],
    ary2=[],
    obj2={};
phone[0]=1;
for(var i=1;i<=10;i++){
    phone[i]=getRandom(0,9);
}
phone=phone.join("");
obj2["phone"]=phone;
ary2.push(obj2);
fs.writeFileSync("../number.json",JSON.stringify(ary2),"utf-8");

//省
var ary3=[],
    province=["吉林","辽宁","黑龙江","河北","山西","陕西","甘肃","青海","山东","安徽","江苏","浙江","河南","湖北","湖南","江西","台湾","福建","云南","海南","四川","贵州","广东","内蒙古","新疆","广西","西藏","宁夏","北京","上海","天津","重庆","香港","澳门","台湾"];
for(var j=0;j<province.length;j++){
    var obj3={};
    obj3["id"]=j;
    obj3["province"]=province[j];
    ary3.push(obj3);
}
fs.writeFileSync("../province.json",JSON.stringify(ary3),"utf-8");


//市
function city(cityList,address) {
    var ary=[];
    for (var i=0;i<cityList.length;i++){
        var obj={};
        obj["id"]=i;
        obj["city"]=cityList[i];
        ary.push(obj);
    }
    fs.writeFileSync(address,JSON.stringify(ary),"utf-8");
}
city(["长春","吉林","四平","辽源","通化","白山","松原","白城","延边"],"../json/jilin.json");
city(["沈阳","大连","鞍山","抚顺","本溪","丹东","锦州","营口","阜新","辽阳","盘锦","铁岭","朝阳","葫芦岛"],"../json/liaoning.json");
city(["石家庄","唐山","秦皇岛","邯郸","邢台","保定","张家口","承德","沧州","廊坊","衡水"],"../json/hebei.json");
city(["太原","大同","阳泉","长治","晋城","朔州","晋中","运城","忻州","临汾","吕梁"],"../json/shanxiNorth.json");
city(["呼和浩特","包头","乌海","赤峰","通辽","鄂尔多斯","呼伦贝尔","巴彦淖尔","乌兰察布","兴安","锡林郭勒","阿拉善"],"../json/neimenggu.json");
city(["北京"],"../json/beijing.json");
city(["上海"],"../json/shanghai.json");
city(["天津"],"../json/tianjin.json");
city(["重庆"],"../json/chongqing.json");
city(["哈尔滨","齐齐哈尔","鸡西","鹤岗","双鸭山","大庆","伊春","佳木斯","七台河","牡丹江","黑河","绥化","大兴安岭"],"../json/heilongjiang.json");
city(["南京","无锡","徐州","常州","苏州","南通","连云港","淮安","盐城","扬州","镇江","泰州","宿迁"],"../json/jiangsu.json");
city(["杭州","宁波","温州","嘉兴","湖州","绍兴","金华","衢州","舟山","台州","丽水"],"../json/zhejiang.json");
city(["合肥","芜湖","蚌埠","淮南","马鞍山","淮北","铜陵","安庆","黄山","滁州","阜阳","宿州","巢湖","六安","亳州","池州","宣城"],"../json/anhui.json");
city(["福州","厦门","莆田","三明","泉州","漳州","南平","龙岩","宁德"],"../json/fujian.json");
city(["南昌","景德镇","萍乡","九江","新余","鹰潭","赣州","吉安","宜春","抚州","上饶"],"../json/jiangxi.json");
city(["济南","青岛","淄博","枣庄","东营","烟台","潍坊","威海","济宁","泰安","日照","莱芜","临沂","德州","聊城","滨州","菏泽"],"../json/shandong.json");
city(["郑州","开封","洛阳","平顶山","焦作","鹤壁","新乡","安阳","濮阳","许昌","漯河","三门峡","南阳","商丘","信阳","周口","驻马店"],"../json/henan.json");
city(["武汉","黄石","襄樊","十堰","荆州","宜昌","荆门","鄂州","孝感","黄冈","咸宁","随州","恩施"],"../json/hubei.json");
city(["长沙","株洲","湘潭","衡阳","邵阳","岳阳","常德","张家界","益阳","郴州","永州","怀化","娄底","湘西"],"../json/hunan.json");
city(["广州","深圳","珠海","汕头","韶关","佛山","江门","湛江","茂名","肇庆","惠州","梅州","汕尾","河源","阳江","清远","东莞","中山","潮州","揭阳","云浮"],"../json/guangdong.json");
city(["南宁","柳州","桂林","梧州","北海","防城港","钦州","贵港","玉林","百色","贺州","河池","来宾","崇左"],"../json/guangxi.json");
city(["海口","三亚"],"../json/hainan.json");
city(["成都","自贡","攀枝花","泸州","德阳","绵阳","广元","遂宁","内江","乐山","南充","宜宾","广安","达州","眉山","雅安","巴中","资阳","阿坝","甘孜","凉山"],"../json/sichuan.json");
city(["贵阳","六盘水","遵义","安顺","铜仁","毕节","黔西南","黔东南","黔南"],"../json/guizhou.json");
city(["昆明","曲靖","玉溪","保山","昭通","丽江","普洱","临沧","文山","红河","西双版纳","楚雄","大理","德宏","怒江","迪庆"],"../json/yunnan.json");
city(["拉萨","昌都","山南","日喀则","那曲","阿里","林芝"],"../json/xizang.json");
city(["西安","铜川","宝鸡","咸阳","渭南","延安","汉中","榆林","安康","商洛"],"../json/shanxi.json");
city(["兰州","嘉峪关","金昌","白银","天水","武威","张掖","平凉","酒泉","庆阳","定西","陇南","临夏","甘南"],"../json/gansu.json");
city(["西宁","海东","海北","黄南","海南","果洛","玉树","海西"],"../json/qinghai.json");
city(["银川","石嘴山","吴忠","固原","中卫"],"../json/ningxia.json");
city(["乌鲁木齐","克拉玛依","吐鲁番","哈密","和田","阿克苏","喀什","克孜勒苏柯尔克孜","巴音郭楞蒙古","昌吉","博尔塔拉蒙古","伊犁哈萨克","塔城","阿勒泰"],"../json/xinjiang.json");
city(["台北","高雄","基隆","台中","台南","新竹","嘉义"],"../json/taiwan.json");
city(["香港岛","九龙半岛","新界"],"../json/xianggang.json");
city(["澳门半岛","离岛","路氹城"],"../json/aomen.json");

