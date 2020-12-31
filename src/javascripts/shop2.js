$(function(){
    
   $.ajax({
    url:"./libs/data.json",
    type:"get",
    datatype:"json"
  })
  .then(function(res){
    // console.log(res);
    var index = location.href.split("#")[1].split("=")[1];
    // console.log(index);
    var item = res[index];
    // console.log(item);
 
    $("#cart-goods-list").html(
          
       ` 
        <tr>
            <td>
                <input type="checkbox" name="good-id" value="1">
            </td>
            <td class="goods">
                <div class="goods-image">
                    <img src="${item.image}">
                </div>
                <div class="goods-information">
                    <h3>${item.name}</h3>
                    <ul>
                        <li>全新</li>
                        <li>不支持7天无理由退货</li>
                    </ul>
                </div>
            </td>
            <td>
                <span class="price">￥<em class="price-em">${item.pricelf}</em></span>
            </td>
            <td>
                <div class="combo">
                    <input type="button" name="minus" value="-" class="combo-minus">
                    <input type="text" name="count" value="1" class="combo-value">
                    <input type="button" name="plus" value="+" class="combo-plus">
                </div>
            </td>
            <td>
                <strong class="amount">￥<em class="amount-em">25.00</em></strong>
            </td>
        </tr>`
          );
           
    $("#footer").hover(function(){
        $("#footer").css({"border":"#e00"})
        },)
         
        var inputs=document.getElementsByName("good-id");
        var all=document.getElementsByName("all")[0];
         
        all.onclick=function(){
        for(var i=0;i<inputs.length;i++){
        inputs[i].checked=this.checked;
        }
        sumprice();
        }
         
        for(var i=0;i<inputs.length;i++){
        inputs[i].onclick=function(){
        var count=0;
        for(var j=0;j<inputs.length;j++){
        if(inputs[j].checked==true){
        count++
        }
        }
        if(count<inputs.length){
        all.checked=false;
        }else{
        all.checked=true;
        }
        sumprice();
        }
        }
         
        //减少
        var minus=document.getElementsByName("minus");
        for(var i=0;i<minus.length;i++){
        minus[i].onclick=function(){
        var counts=this.nextElementSibling;
        var count=parseInt(counts.value);
        if(count>1){
        counts.value=--count;
        }
        sumprice();
        }
        }
        //增加
        var plus=document.getElementsByName("plus");
        for(var i=0;i<plus.length;i++){
        plus[i].onclick=function(){
        var counts=this.previousElementSibling;
        var count=parseInt(counts.value);
        counts.value=++count;
        sumprice();
        }
        }
         
        //手动输入
        var counts=document.getElementsByName("count");
        for(var i=0;i<counts.length;i++){
        counts[i].onblur=function(){
        var count=parseInt(this.value);
        if(isNaN(count)||count<1){
        count=1;
        }
        this.value=count;
        sumprice();
        }
        }
         
         
        //计算
       function sumprice() {
        var tbody = document.getElementById("cart-goods-list");
        var tbodyTr = tbody.getElementsByTagName("tr");
        var sumprice=0;
        for(var i = 0; i < tbodyTr.length; i++) {
        //获取单价
        var priceEm = (tbodyTr[i].getElementsByClassName("price-em")[0].innerHTML);
        priceEm = Number(priceEm.slice(1));
        // console.log(priceEm );
        // var price = parseFloat(priceEm.innerText);
        var price = priceEm;
        // console.log(price);
        
        //获取数量
        var counts = tbodyTr[i].getElementsByClassName("combo-value")[0];
        var count = parseInt(counts.value);
        //乘积
        var chengji=price*count;
        //把乘积弄到金额里面
        var amountEm=tbodyTr[i].getElementsByClassName("amount-em")[0];
        amountEm.innerText=chengji.toFixed(2);
         
        //获取单选框
        var liD=tbodyTr[i].getElementsByTagName("input")[0];
        if(liD.checked){
        sumprice+=chengji;
        }
        }
        var zong=document.getElementById("total-amount-em");
        zong.innerText=sumprice.toFixed(2);
       }
         
        //删除
        document.getElementById("cart-delete").onclick=function(){
        var tbody = document.getElementById("cart-goods-list");
        var del=[];
        for(var i=0;i<inputs.length;i++){
        if(inputs[i].checked){
        del.push(inputs[i].parentElement.parentElement);
        }
        }
        for(var i=0;i<del.length;i++){
        tbody.removeChild(del[i]);
        }
        all.checked=false;
        sumprice();
        }
         
        document.getElementById("total-amount").onmouseover=function(){
        document.getElementById("total-amount").style.cursor="pointer";
        }
         
        document.getElementById("total-amount").onclick=function(){
        var tbody = document.getElementById("cart-goods-list");
        var tr=document.createElement("tr");
        tr.innerHTML='<tr><td><input type="checkbox" name="good-id" value="1"></td><td class="goods"><div class="goods-image"><img src="./pic/goods/1.jpg"></div><div class="goods-information"><h3>Dior 迪奥 花漾甜心小姐 女士淡香水</h3><ul><li>50毫升</li><li>不支持7天无理由退货</li></ul></div></td><td><span class="price">￥<em class="price-em">498.00</em></span></td><td><div class="combo"><input type="button" name="minus" value="-" class="combo-minus"><input type="text" name="count" value="1" class="combo-value"><input type="button" name="plus" value="+" class="combo-plus"></div></td><td><strong class="amount">￥<em class="amount-em">498.00</em></strong></td></tr>';
        tbody.appendChild(tr);
        }
       })


       $("#settlement").on("click",function(){
           alert("没有此功能")
       })
});



 

