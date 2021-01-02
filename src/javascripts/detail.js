$(".master-logo").click( function(){
      location.href ="./index.html"
})
$(".temp-active").click( function(){
      location.href ="./active.html"
    })



// Magnifier.prototype.changeImage = function( big , small , ele){
//     this.big_img_ele.attr("src" , big);
//     this.small_img_ele.attr("src" , small);
   
//     $(ele).addClass("active")
//     .siblings()
//     .removeClass("active");
// };



// var index = location.href.split("#")[1].split("=")[1];

$.ajax({
      url:"./libs/data.json",
      type:"get",
      datatype:"json"
    })
    .then(function(res){
      // console.log(res);
      var index = location.href.split("#")[1].split("=")[1];
      var item = res[index];
      // console.log(item);
   
      $(".box").html(
            
        //     `<div class="info-side">
        //     <!-- 小图部分 -->
        //     <div class="box clear">
        //         <div class="small">
        //             <div class="mask"></div>
        //             <img src="${item.image}" alt="">
        //         </div>
        //         <div class="big">
        //             <img src="${item.bigimg}" alt="">
        //         </div>
        //         <div class="infolink">
        //             <a href="javascript:void(0);"></a>
        //         </div>
        //     </div>
          
        //     <div class="fx">
        //         <span> 分享到： 7</span>
        //         <a href="javascript:void(0);" type="btn">加入收藏</a>
        //     </div>
        // </div>`


        `<div class="mainrg">
        <div class="info-side">
            <!-- 小图部分 -->
            <div class="box clear">
                <div class="small">
                    <div class="mask"></div>
                    <img src="${item.image}" alt="">
                </div>
                <div class="big">
                    <img src="${item.bigimg}" alt="">
                </div>
                <div class="infolink">
                    <a href="javascript:void(0);"></a>
                </div>
            </div>
          
            <div class="fx">
                <span> 分享到： 7</span>
                <a href="javascript:void(0);" type="btn">加入收藏</a>
            </div>
        </div>
        <div class="info-main">
            <div class="name">
                <h1>${item.name}</h1>
                <h3>企业采购书卡&书目服务电话（微信同号）178-8231-4046（法定工作日9:00-17:00）</h3>
            </div>
            <div class="attr">
                <dl class="price-d">
                    <dt>定价:</dt>
                    <dd><b>${item.pricelf}</b></dd>
                </dl>
                <dl class="price-w">
                    <dt>文轩价:</dt>
                    <dd><b>${item.pricerg}</b></dd>
                </dl>
                <dl class="express">
                    <dt>配送至:</dt>
                    <dd>
                        <select id="group" value="1">
                            <option value="1">中国唐山市玉田县</option>
                            <option value="2">中国北京市昌平区</option>
                        </select>
                        <span class="yh">现在有货</span>
                    </dd>
                    <dd>
                        <span>
                            文轩网
                            <b>正版图书音像</b>
                            ，为您快捷发货
                        </span>
                        <a href="javascript:void(0);">（配送详情）</a>
                    </dd>
                </dl>
                <dl class="author">
                    <dt>作者:</dt>
                    <dd>古希腊<a href="javascript:void(0);">伊索</a>等</dd>
                </dl>
                <dl class="class">
                    <dt>所属分类:</dt>
                    <dd>
                        <a href="javascript:void(0);">图书</a>>
                        <a href="javascript:void(0);">童书、育儿</a>>
                        <a href="javascript:void(0);">0-6岁</a>>
                        <a href="javascript:void(0);">幼儿绘本</a>
                    </dd>
                </dl>
                <dl class="sale">
                    <dt>促销活动:</dt>
                    <dd><span>❤图书音像单笔满99减10,199减25！(0.65折内图书、电子书除外）</span></dd>
                </dl>
            </div>
            <div class="purchase">
                <dl class="buy-num">
                    <dt>购买数量:</dt>
                    <dd>
                        <span>
                        <a href="#">-</a>
                        <input type="text" value="1">
                        <a href="#">+</a>件
                        </span>
                    </dd>
                </dl>
                <dl class="buy-active">
                    <dd><a href="#">加入购物车</a></dd>
                </dl>
                <dl class="buy-sevice">
                    <dt>服务</dt>
                    <dd><span>由"文轩网"直接销售和发货，并提供售后服务</span></dd>
                    <dd>
                        <a href="#">正品低价</a>|
                        <a href="#">闪电发货</a>|
                        <a href="#">货到付款</a>|
                        <a href="#">高效退换货</a>
                    </dd>
                </dl>
            </div>
        </div>
    </div>`
            );
            function Magnifier(){
                this.small_ele = $(".small");
                this.small_img_ele = $(".small img");
                this.mask_ele  = $(".mask");
                this.big_ele   = $(".big");
                this.big_img_ele = $(".big img");
                this.container_ele = $(".info-side");
                // this.list_imgs  = $(".list img");
            //     this.src_list = [
            //           {
            //                 small : "./images/small.jpg",
            //                 big : "./asset/1.big.jpg"
            //           },
            //           {
            //                 small : "./asset/2.jpg",
            //                 big : "./asset/2.big.jpg"
            //           }
            //     ];
                this.bindEvent();
                this.init();
            }
            Magnifier.prototype.bindEvent = function(){
                var _this = this;
                // 给small绑定事件; 
                this.small_ele.mouseover(function(){
                      // this => DOM对象; 
                      _this.toggle("block");
                });
                this.small_ele.mouseout(function(){
                      _this.toggle("none");
                });
                // 给small绑定鼠标移动事件; 
                this.small_ele.mousemove(function( evt ){
                      var e = evt || event;
            
                      var x = e.pageX ; 
                      var y = e.pageY ; 
                      
            
                      _this.maskMove( x , y );
                });
                // this.list_imgs.mouseover(function(){
                //       var i = $(this).index(".list img") ;
                //       console.log(i , _this.src_list);
                //       _this.changeImage( _this.src_list[i].big , _this.src_list[i].small , this);
                // });
            };
            // 显示隐藏功能
            Magnifier.prototype.toggle = function( type ){
                this.mask_ele.css({
                      display : type
                });
                this.big_ele.css({
                      display : type
                });
            }
            Magnifier.prototype.init  = function(){
                // 1. 获取数据 : 
                // 获取small的宽高; 
                this.small_size = this.small_ele.width();
                this.big_img_size =  this.big_img_ele.width();
                this.big_size =  this.big_ele.width();
                this.mask_size = this.small_size / this.big_img_size * this.big_size;
                // 给mask赋值; 
            //     console.log(this.small_size,this.big_img_size,this.big_size)
                this.mask_ele.css({
                      width : this.mask_size ,
                      height : this.mask_size
                }) ;
                // 获取container根据浏览器可是窗口的偏移; 
                this.offset_left = this.container_ele.offset().left;
                this.offset_top = this.container_ele.offset().top;
            
            };
            Magnifier.prototype.maskMove = function( x , y ){
                // 处理x,y ; 
                var _left = x - this.mask_size / 2 - this.offset_left;
                var _top  = y - this.mask_size / 2 - this.offset_top;
                // 边界检测; 
                // - 最小值
                _left = _left < 0 ? 0 : _left;
                _top  = _top  < 0 ? 0 : _top;
                //  - 最大值
                var max = this.small_size - this.mask_size;
                _left = _left > max ? max : _left;
                _top  = _top  > max ? max : _top ; 
            
                this.mask_ele.css({
                      left : _left ,
                      top  : _top 
                });
            
                // 计算百分比 : 
                var _left_prop = _left / ( this.small_size - this.mask_size);
                var _top_prop  = _top  / ( this.small_size - this.mask_size);
            
                this.bigImageMove(_left_prop , _top_prop);
            };
            
            Magnifier.prototype.bigImageMove = function( _left_prop , _top_prop){
                this.big_img_ele.css({
                      left : _left_prop * ( this.big_size - this.big_img_size) , 
                      top  : _top_prop * ( this.big_size - this.big_img_size)
                  
                });
            };
              new Magnifier();





  });

     

  