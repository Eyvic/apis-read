var utils=(function () {
    var flag="getComputedStyle" in window;//ie6-8false

    //offset：获取页面中任意一个元素距离body的偏移（左偏移和上偏移）
    function offset(curEle){
        var disLeft=curEle.offsetLeft,disTop=curEle.offsetTop,par=curEle.offsetParent;
        while(par){
            if(window.navigator.userAgent.indexOf("MSIE 8.0")===-1){//IE8中使用offset获取偏移量时已经把父级参照物的边框算在内，所以不用加父级的边框
                disLeft+=par.clientLeft;
                disTop+=par.clientTop;
            }
            disLeft+=par.offsetLeft;
            disTop+=par.offsetTop;
            par=par.offsetParent;
        }
        return {left:disLeft,top:disTop};
    }

    //win：获取或设置浏览器的盒子模型信息
    function win(attr,value){
        if(typeof value==="undefined"){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }

    //getCss：获取元素经过浏览器计算的样式信息
    function getCss(attr){
        var val=null,reg=null;
        if(flag){
            val=window.getComputedStyle(this,null)[attr];
        }else{
            if(attr==="opacity"){
                val=this.currentStyle["filter"];
                reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                val=reg.test(val)?reg.exec(val)[1]/100:1;
            }else{
                val=curEle.currentStyle[attr];
            }
        }
        reg=/^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/i;
        return reg.test(val)?parseFloat(val):val;
    }

    //setCss：设置当前元素的某个样式属性值（增加在行内样式）(复合值需要写单位，单个值可以不写单位）
    function setCss(attr,value){
        if(attr==="float"){
            this["style"]["cssFloat"]=value;
            this["style"]["styleFloat"]=value;
            return;
        }
        if(attr==="opacity"){
            this["style"]["opacity"]=value;
            this["style"]["filter"]="alpha(opacity="+value*100+")";
            return;
        }
        var reg=/^(width|height|top|bottom|left|right|((margin|padding)(Top|Left|Right|bottom)?))$/;
        if(reg.test(attr)){
            if(!isNaN(value)){
                value+="px";
            }
        }
        this["style"][attr]=value;
    }

    //setGroupCss：批量设置当前元素的样式属性值
    function setGroupCss(options){
        for(var key in options){
            if(options.hasOwnProperty(key)){//只需遍历私有属性和方法（for in方法默认遍历私有和其所属类原型上扩展的属性和方法）
                setCss.call(this,key,options[key]);
            }
        }
    }

    //css：获取、单独设置、批量设置元素的样式值
    function css(curEle){
        var ary=Array.prototype.slice.call(arguments,1);
        if(typeof arguments[1]==="string"){
            if(typeof arguments[2]==="undefined"){//未传值
                return getCss.apply(curEle,ary);
            }
            setCss.apply(curEle,ary);
        }
        arguments[1]=arguments[1]||0;
        if(arguments[1].toString()==="[object Object]"){
            setGroupCss.apply(curEle,ary);
        }
    }

    //mouseEvent:事件对象兼容处理
    function mouseEvent(e) {
        e=e||window.event;
        var flag=e.target?true:false;//可简化为var flag=!!e.target;
        if(!flag){
            e.target=e.srcElement;
            e.pageX=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
            e.pageY=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
            e.preventDefault=function () {
                e.returnValue=false;
            };
            e.stopPropagation=function () {
                e.cancelBubble=true;
            }
        }
    }

    //hover:下拉菜单悬停
    function hover(curEle,drop,arrow) {
        var flag=drop.css("display")!=="none";
        curEle.on("mouseover",function () {
            if(!flag){
                arrow.css({background:"url('images/icon_arrow_up.png') no-repeat 42px 24px"});
                drop.css("display","inline-block");
            }
        });
        curEle.on("mouseout",function (e) {
            mouseEvent(e);
            if(e.target!==drop){
                arrow.css({background:"url('images/icon_arrow_down.png') no-repeat 42px 24px"});
                drop.hide();
            }
        });
    }

    return{
        offset:offset,
        win:win,
        css:css,
        mouseEvent:mouseEvent,
        hover:hover
    }
})();