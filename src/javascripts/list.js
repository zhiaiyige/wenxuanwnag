
    $(".master-logo").click( function(){
      location.href ="./index.html"
    })
    $(".temp-active").click( function(){
      location.href ="./active.html"
    })
    $.ajax({
      url:"./libs/data.json",
      type:"get",
      datatype:"json"
    })
    .then(function(res){
      // console.log(res);
      var list = res; 
      // console.log(list);
      var html = list.map( function(item ,index){
        return  `<div class="books" data-index=${index}>
                       <img data-src="${item.image}" alt="">
                       <p>${item.name}</p>
                          <div class="price">
                           <span class="price-n"> ${item.pricelf}</span>
                           <span class="price-o"> ${item.pricerg}</span>
                          </div>
              </div>`
      }).join("");
      $(".cell-books").html(html).find("img").lazyload();
    });
    $(".cell-books").on("click",".books",function(){
      //     console.log(this);
      var data_index = $(this).attr("data-index");
      location.href = "./detail.html#index="+data_index;
    })  
  