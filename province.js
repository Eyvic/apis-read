//provinceToChinese:把省从英语转化为汉字
function provinceToChinese() {
    var province;
    this.setName=function (pro) {
        province=pro;
    };
    this.proConvert=function () {
        var proChi=null;
        switch (province){
            case "anhui":
                proChi="安徽";
                break;
            case "beijing":
                proChi="北京";
                break;
            case "chongqing":
                proChi="重庆";
                break;
            case "fujian":
                proChi="福建";
                break;
            case "gansu":
                proChi="甘肃";
                break;
            case "guangdong":
                proChi="广东";
                break;
            case "guangxi":
                proChi="广西";
                break;
            case "guizhou":
                proChi="贵州";
                break;
            case "hainan":
                proChi="海南";
                break;
            case "hebei":
                proChi="河北";
                break;
            case "heilongjiang":
                proChi="黑龙江";
                break;
            case "henan":
                proChi="河南";
                break;
            case "xianggang":
                proChi="香港";
                break;
            case "hubei":
                proChi="湖北";
                break;
            case "hunan":
                proChi="湖南";
                break;
            case "jiangsu":
                proChi="江苏";
                break;
            case "jiangxi":
                proChi="江西";
                break;
            case "jilin":
                proChi="吉林";
                break;
            case "liaoning":
                proChi="辽宁";
                break;
            case "aomen":
                proChi="澳门";
                break;
            case "neimenggu":
                proChi="内蒙古";
                break;
            case "ningxia":
                proChi="宁夏";
                break;
            case "qinghai":
                proChi="青海";
                break;
            case "shandong":
                proChi="山东";
                break;
            case "shanghai":
                proChi="上海";
                break;
            case "shanxi":
                proChi="陕西";
                break;
            case "shanxiNorth":
                proChi="山西";
                break;
            case "sichuan":
                proChi="四川";
                break;
            case "taiwan":
                proChi="台湾";
                break;
            case "tianjin":
                proChi="天津";
                break;
            case "xinjiang":
                proChi="新疆";
                break;
            case "xizang":
                proChi="西藏";
                break;
            case "yunnan":
                proChi="云南";
                break;
            case "zhejiang":
                proChi="浙江";
                break;
            default:
                proChi="";
                break;
        }
        this.provinceChi=proChi;
        return this.provinceChi;
    };
}
module.exports=provinceToChinese;