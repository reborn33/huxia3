/**
 * Created by hu on 2016/9/26.
 */
$(function () {
 $("#imagegallery img").fadeTo("slow", 0.5);
$("#imagegallery img").hover(function(){
 $(this).fadeTo("slow", 1.0); // 设置透明度为100%
},function(){
 $(this).fadeTo("slow", 0.5); // 设置不透明度mouseout回到50%
});
});

function showPic(whichpic) {
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
}

function preparePlaceholder() {
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
 }

function prepareGallery() {
 if(!document.getElementById("imagegallery"))return false;
 var gallery=document.getElementById("imagegallery");
 var links=gallery.getElementsByTagName("a");
 for (var i=0;i<links.length;i++){
 links[i].onclick=function () {
  return !showPic(this);

 }
 }
 }
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
addLoadEvent(preparePlaceholder);
window.onload=prepareGallery;
