/**
 * Created by hu on 2016/9/26.
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function focusLabels() {
    var labels=document.getElementsByTagName("label");
    for(var i=0;i<labels.length;i++){
        if(!labels[i].getAttribute("for"))continue;
        labels[i].onclick=function () {
            var id=this.getAttribute("for");
            if(!document.getElementById(id))return false;
            var element=document.getElementById(id);
        }
    }
}
addLoadEvent(focusLabels);
function resetField(whichform) {
    for (var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.type=="submit")continue;
        var check=element.placeholder||element.getAttribute('placeholder');
        if (!check)continue;
        element.onfocus=function () {
            var text=this.placeholder||this.getAttribute('placeholder');
            if(this.value==text){
                this.className='';
                this.value="";
            }
        }
        element.onblur=function () {
            if(this.value==""){
                this.className='placeholder';
                this.value=this.placeholder||this.getAttribute('placeholder');
            }
        }
        element.onblur();
    }
}
function prepareForms() {
    for (var i=0;i<document.forms.length;i++){
        var thisform=document.forms[i];
        resetField(thisform);
        thisform.onsubmit=function () {
            return validateForm(this);
        }
    }
}

function isFilled(field) {
    if(field.value.replace('',''.length==0))return false;
    var placeholder=field.placeholder||field.getAttribute('placeholder');
    return (filed.value!=placeholder);
}
function isEmail(field) {
    return (field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);
}
function validateForm(whichform) {
    for(var i=0;i<whichform.elements.length;i++){
        if(element.required=='required'){
            if(!isFilled(element)){
                alert("please fill in the "+element.name+"field");
                return false;
            }
        }
        if(element.type=='email'){
            if(!isEmail(element)){
                alert("the"+element.name+"field must be a vaild email address.");
                return false;
            }
        }
    }
    return true;
}

function getHttpObject() {
    if(typeof  XMLHttpRequest=="undefined")
        XMLHttpRequest=function () {
            try {return new ActiveXObject("Msxml2.XMHLHTTP.6.0");}
            catch (e){}
            try {return new ActiveXObject("Msxml2.XMHLHTTP.3.0");}
            catch (e){}
            try {return new ActiveXObject("Msxml2.XMHLHTTP");}
            catch (e){}
            return false;
        }
        return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
    while (element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","images/loading.gif");
    content.setAttribute("alt","loading...");
    element.appendChild(content);
}

