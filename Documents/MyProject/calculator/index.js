function onKeyDown(event) {   
    event.preventDefault();
}
function getCaret(node) {
    node.focus();
    if (node.selectionStart) {
      return node.selectionStart;
    } else if (!document.selection) {
      return 0;
    }
  
    var c = "1",
        sel = document.selection.createRange(),
        dul = sel.duplicate(),
        len = 0;
  
    dul.moveToElementText(node);
    sel.text = c;
    len = dul.text.indexOf(c);
    sel.moveStart('character',-1)
    sel.text = "";
    return len;
  }
function setCaretPosition(elem, caretPos) {
    if(elem != null) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
    }
}
let getValue=(object)=>{
    let value=object.getAttribute('data-value');
    return value;
}
let addValue=(object)=>{
    let items=document.getElementById('index');
    let result=document.getElementById('result');
    let value=getValue(object);
    let caretPos=getCaret(items);
    if(document.getElementById('display').getAttribute('data-status')=='off'){
        alert('vui lòng bật máy tính');
    }
    if(result.innerHTML!=''){
        if(value=='+'||value=='%'||value=='-'||value=='*'||value=='/'){
            items.value='Ans';
        }else{
            items.value='';
        }
    }
    document.getElementById('result').innerHTML='';
    let text=items.value;
    if(value=='del'){
        if(text.substring(caretPos,caretPos-3)=='Ans'){
            items.value=text.substring(0,caretPos-3)+text.substring(caretPos,text.length);
            setCaretPosition(items,caretPos-3);
        }
        else{
            text=text.substring(0,caretPos-1)+text.substring(caretPos,text.length);
            items.value=text;
            setCaretPosition(items,caretPos-1);
        }
        
    }else if(value=='ac'){
        items.value='';
    }
    else{
        items.value=text.substring(0,caretPos)+value+text.substring(caretPos,text.length);
        setCaretPosition(items,caretPos+1);
    }
}
let ans=0;
let equal=(a)=>{
    const arrayMath=[];
    a=a.replace('Ans',ans);
    for(var i=0;i<a.length;i++){
        if(a[i]=='+'&&a[i+1]=='*'||a[i]=='+'&&a[i+1]=='/'||a[i]=='+'&&a[i+1]=='%'
        ||a[i]=='*'&&a[i+1]=='/'||a[i]=='*'&&a[i+1]=='%'||a[i]=='*'&&a[i+1]=='*'
        ||a[i]=='/'&&a[i+1]=='*'||a[i]=='/'&&a[i+1]=='%'||a[i]=='/'&&a[i+1]=='/'
        ||a[i]=='%'&&a[i+1]=='*'||a[i]=='%'&&a[i+1]=='/'||a[i]=='%'&&a[i+1]=='%'
        ||a[i]=='-'&&a[i+1]=='/'||a[i]=='-'&&a[i+1]=='*'||a[i]=='-'&&a[i+1]=='%')
        {
            document.getElementById('result').innerHTML="MATH ERROR";
            return;
        }
    }
    for(var i=0;i<a.length;i++){
        if(a[i]=='+'&&a[i+1]=='+'||a[i]=='-'&&a[i+1]=='-'){
            console.log(a.replace(a[i]+a[i+1],'+'));
            a=a.replace(a[i]+a[i+1],'+');
        }
    }
    for(var i=0;i<a.length;i++){
        if(a[i]=='+'||a[i]=='*'||a[i]=='/'||a[i]=='%'){
            arrayMath.push(a[i]);
            a=a.replace(a[i],',');
        }
    }
    const arrayNumber=a.split(',');
    for(var i=0;i<arrayMath.length;i++){
        if(arrayMath[i]=='*'){
            let temp=parseFloat(arrayNumber[i])*parseFloat(arrayNumber[i+1]);
            arrayNumber.splice(i,2,temp);
            arrayMath.splice(i,1);
            i=i-1;
        }else if(arrayMath[i]=='/'){
            let temp=parseFloat(arrayNumber[i])/parseFloat(arrayNumber[i+1]);
            arrayNumber.splice(i,2,temp);
            arrayMath.splice(i,1);
            i=i-1;
        }else if(arrayMath[i]=='%'){
            let temp=parseFloat(arrayNumber[i])/100;
            arrayNumber.splice(i,1,temp);
            arrayMath.splice(i,1);
            i=i-1;}
    }
    for(var i=0;i<arrayMath.length;i++){
            let temp=parseFloat(arrayNumber[i])+parseFloat(arrayNumber[i+1]);
            arrayNumber.splice(i,2,temp);
            arrayMath.splice(i,1);
            i=i-1;     
    }
    let result=arrayNumber[0];
    document.getElementById('result').innerHTML=result;
    ans=result;
}

document.getElementById('btn-on').addEventListener('click',() =>{
    let status= document.getElementById('display').getAttribute('data-status');
    let display=document.getElementById('display');
    if(status =='on'){
        let node=document.getElementById('index');
        let node2=document.getElementById('result');
        display.removeChild(node);
        display.removeChild(node2);
    }
    let index= document.createElement('input');
    let result= document.createElement('span')
    index.id='index';
    index.type='text';
    result.id='result';
    display.appendChild(index);
    display.appendChild(result);
    display.setAttribute('data-status','on');
    document.getElementById('index').addEventListener('keydown',onKeyDown);
    document.getElementById('index').focus();
}
)
document.getElementById('btn-off').addEventListener('click',() =>{
    let status= document.getElementById('display').getAttribute('data-status');
    let display=document.getElementById('display');
    if(status =='on'){
        let index=document.getElementById('index');
        let result=document.getElementById('result');
        display.removeChild(index);
        display.removeChild(result);
        display.setAttribute('data-status','off');
    }
})
document.getElementById('btn-eq').addEventListener('click',()=>{
    let items=document.getElementById('index');
    equal(items.value);
})
document.getElementById('btn-left').addEventListener('click',()=>{
    var textfield=document.getElementById('index');
    var result=document.getElementById('result');
    var positionCaret=getCaret(textfield);
    if(result.innerHTML!=''){
        setCaretPosition(textfield,textfield.value.length);
    }
    else{
        setCaretPosition(textfield,positionCaret-1);
        
    }
    document.getElementById('result').innerHTML='';
})
document.getElementById('btn-right').addEventListener('click',()=>{
    var textfield=document.getElementById('index');
    var result=document.getElementById('result');
    var positionCaret=getCaret(textfield);
    if(result.innerHTML!=''){
        setCaretPosition(textfield,0);
    }
    else{
        setCaretPosition(textfield,positionCaret+1);
        
    }
    document.getElementById('result').innerHTML='';
})
