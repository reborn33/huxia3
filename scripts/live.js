/**
 * Created by hu on 2016/9/26.
 */
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

function stripeTable() {
    var tables=document.getElementsByTagName("table");
    var odd,rows;
    for(var i=0;i<tables.length;i++){
        odd=false;
        rows=tables[i].getElementsByTagName("tr");
        for(var j=0;j<rows.length;j++){
            if(odd==true){
                rows[j].style.backgroundColor="#699";
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

        rows[i].onmouseover=function () {
        this.style.fontWeight="bold";
        }
        rows[i].onmouseout=function () {
            this.style.fontWeight="normal";
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
    var header_text=document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles=document.getElementsByTagName("article");
    var container=articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
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
addLoadEvent(stripeTable);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
