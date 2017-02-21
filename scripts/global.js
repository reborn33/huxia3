/**
 * Created by hu on 2016/9/22.
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

function insertAfter(newElement,targetElement) {
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value) {
    if (!element.className){
        element.className=value;
    }else {
        newClassName=element.className;
        newClassName+=" ";
        newClassName+=value;
        element.className=newClassName;
    }
}


function highlightPage() {
    var headers=document.getElementsByTagName("header");
    if(headers.length==0)return false;
    var navs=headers[0].getElementsByTagName('nav');
    if(navs.length==0)return false;
    var links=navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i=0;i<links.length;i++){
        linkurl=links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl)!=-1){
            links[i].className="here";
        }
    }
}

function highlightPage(href) {
    var headers=document.getElementsByTagName("header");
    if(headers.length==0)return false;
    var navs=headers[0].getElementsByTagName('nav');
    if(navs.length==0)return false;
    var links=navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i=0;i<links.length;i++){
        linkurl=links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl)!=-1){
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}

function moveElement(elementID,final_x,final_y,interval) {
    if(!document.getElementById(elementID))return false;
    var elem=document.getElementById(elementID);
    if (elem.movement){
        clearTimeout(elem.movement);
    }
    if (!elem.style.left){
        elem.style.left="0px";
    }
    if(!elem.style.top){
        elem.style.top="0px";
    }
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    if (xpos==final_x&&ypos==final_y){
        return true;
    }
    //一个像素移动
    /* if (xpos<final_x){
     xpos++;
     }
     if (xpos>final_x){
     xpos--;
     }
     if(ypos<final_y){
     ypos++;
     }
     if (ypos>final_y){
     ypos--;
     }*/
    //越接近目标速度越慢
    if (xpos<final_x){
       var dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos+dist;
    }
    if (xpos>final_x){
        var dist=Math.ceil((xpos-final_x)/10);
        xpos=xpos-dist;
    }
    if (ypos<final_y){
       var dist=Math.ceil((final_y-ypos)/10);
        ypos=ypos+dist;
    }
    if (ypos>final_y){
      var  dist=Math.ceil((ypos-final_y)/10);
        ypos=ypos-dist;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}


function prepareSlideshow() {
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview=document.createElement("img");
    preview.setAttribute("src","images/loog.jpg");
    preview.setAttribute("alt","a glimpse if what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);

    var links=document.getElementsByTagName("a");
    var destination;
    for (var i=0;i<links.length;i++){
        links[i].onmouseover=function () {
            destination=this.getAttribute("href");
           if (destination.indexOf("index.html")!=-1){
                moveElement("preview",0,0,5);
            }
            if (destination.indexOf("about.html")!=-1){
                moveElement("preview",-150,0,5);
            }
            if (destination.indexOf("photos.html")!=-1){
                moveElement("preview",-300,0,5);
            }
            if (destination.indexOf("live.html")!=-1){
                moveElement("preview",-450,0,5);
            }
            if (destination.indexOf("contact.html")!=-1){
                moveElement("preview",-600,0,5);
            }
        }
    }
/*links[0].onmouseover=function () {
    moveElement("preview",0,0,5);
}
    links[1].onmouseover=function () {
        moveElement("preview",-150,0,5);
    }
    links[2].onmouseover=function () {
        moveElement("preview",-300,0,5);
    }
    links[3].onmouseover=function () {
        moveElement("preview",-450,0,5);
    }
    links[4].onmouseover=function () {
        moveElement("preview",-600,0,5);
    }*/

}


function showSection(id) {
    var sections=document.getElementsByTagName("section");
    for(var i=0;i<sections.length;i++){
        if(sections[i].getAttribute("id")!=id){
           sections.style.display="none";
        }else {
            sections[i].style.display="block";
        }
    }
}
function prepareInternalnav() {
    var articles=document.getElementsByTagName("article");
    if(articles.length==0)return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0)return false;
    var nav=navs[0];
    var links=nav.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        var sectionId=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId))continue;
        document.getElementById(sectionId).style.display="none";
       links[i].destination=sectionId;
        links[i].onclick=function () {
            showSection(this.destination);
            return false;
        }
    }
}

/*function showPic(whichpic) {
    if(!document.getElementById("placeholder"))return false;
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if(document.getElementById("description")){
        var text=whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
        var description=document.getElementById("description");
        if (description.firstChild.nodeType==3){
            description.firstChild.nodeValue=text;
        }
    }
    return true;
}*/

/*function preparePlaceholder() {
   var placeholder=document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/placeholder.png");
    placeholder.setAttribute("alt","my image gallery");
    var description=document.createElement("p");
    description.setAttribute("id","description");
    var desctext=document.createTextNode("choose an image");
    description.appendChild(desctext);
    var gallery=document.getElementById("imagegallery");
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);
}*/

/*function prepareGallery() {
    if(!document.getElementById("imagegallery"))return false;
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for (var i=0;i<links.length;i++){
        links[i].onclick=function () {
            return showPic(this)?false:true;
        }
    }
}*/
function showPic(whichpic) {
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    var text=whichpic.getAttribute("title");
    var description=document.getElementById("description");
    description.firstChild.nodeValue=text;
}

function stripeTable() {
    var tables=document.getElementsByTagName("table");
    var odd,rows;
    for(var i=0;i<tables.length;i++){
        odd=false;
        rows=tables[i].getElementsByTagName("tr");
        for(var j=0;j<rows.length;j++){
            if(odd==true){
                rows[j].style.backgroundColor="#ffc";
                odd=false;
            }else {
                odd=true;
            }
        }
    }
}

function highlightRows() {
    var rows=document.getElementsByTagName("tr");
    for(var i=0;i<rows.length;i++){
        rows[i].oldClassName=rows[i].className;
        rows[i].onmouseover=function () {
            addClass(this,"highlight");
        }
        rows[i].onmouseout=function () {
            this.className=this.oldClassName;
        }
    }
}

function displayAbbreviations() {
    var abbreviations=document.getElementsByTagName("abbr");
    if(abbreviations.length<1)return false;
    var defs=new Array();
    for (var i=0;i<abbreviations.length;i++){
        var current_abbr=abbreviations[i];
        if(current_abbr.childNodes.length<1)continue;
        var definition=current_abbr.getAttribute("title");
        var key=current_abbr.lastChild.nodeValue;
        defs[key]=definition;
    }
    var dlist=document.createElement("dl");
    for(key in defs){
        var definition=defs[key];
        var dtitle=document.createElement("dt");
        var dtitle_text=document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc=document.createElement("dd");
        var ddesc_text=document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }

    if(dlist.childNodes.length<1)return false;
    var header=document.createElement("h3");
    var header_text=document.createTextNode(abbreviations);
    header.appendChild(header_text);
    var articles=document.getElementsByTagName("article");
    var container=articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
//addLoadEvent(preparePlaceholder);
//addLoadEvent(prepareGallery);
addLoadEvent(stripeTable);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
