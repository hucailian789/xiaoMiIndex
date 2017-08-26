$(function(){
    var urls='http://192.168.70.61:9900/api/';
    $.ajax({
        url:urls+'nav',
        dataType:'json',
        success:function(data){
            console.log({backData:data});
            $('.mainNav .zhNav').html(template("tempMain",{backData:data}));

            $('.mainNav .zhNav li:nth-child(-n+7)').hover(function(){
                var type = $(this).attr('data-type');               
                $.ajax({
                    url:urls+'nav',
                    dataType:'json',
                    data:{
                        type:type
                    },
                    success:function(data){
                        console.log(data);
                       $('.mainNavList ul').html(template("tempmainNavList",{backData:data})); 
                    }
                });
                $('.mainNavList').stop().slideDown(500);                
            },function(){
                $('.mainNavList').stop().slideUp(500);
            });
            $('.mainNavList').hover(function(){
                $('.mainNavList').stop().slideDown(500);
            },function(){
                $('.mainNavList').stop().slideUp(500);
            });            
        }
    });

    $('.searchBox input').focus(function(){
       $('.searchBox').addClass("active");

    });
    $('.searchBox input').blur(function(){
        $('.searchBox').removeClass("active");
    });

// 轮播图
    $.ajax({
        url:urls+'lunbo',
        dataType:'json',
        success:function(data){            
            console.log({backData:data});
            $('.bannerWrap .banner').html(template("tempBanner",{backData:data}));
           
           var index = 0;
            $('.next').click(function(){                                
                getNext();                            
            })
            function getNext(){
                if(index ==$('.banner li').length-1){
                    $('.banner li').hide().eq(index).fadeIn(600);
                    index =0;
                }
                index ++;
               $('.banner li').hide().eq(index).fadeIn(600);
            }
            $('.pre').click(function(){                                
                if(index ==0){
                    $('.banner li').hide().eq(index).fadeIn(600);
                    index =$('.banner li').length;
                }
                index --;
               $('.banner li').hide().eq(index).fadeIn(600);
                            
            })         
            var timeId = setInterval(getNext,2000);    
            
            $('.bannerWrap').mouseover(function(){
                clearInterval(timeId);
            })
             $('.bannerWrap').mouseout(function(){                
                timeId = setInterval(getNext,2000);
            })
        }

    });

// 轮播侧边导航栏

    $.ajax({
        url:urls+'items',
        dataType:'json',
        success:function(data){            
            // console.log({backData:data});
            var str = template("tempMenu",{backData:data});
            $('.menuItems').html(str);

            $(".menuItems li").hover(function(){
                var type =$(this).attr('data-type');
                $.ajax({
                    url:urls+'items',
                    data:{
                        type:type
                    },
                    dataType:'json',
                    success: function(backData) {
                        var ulLen = Math.ceil(backData.length / 6);
                        $(".menuDetal").empty();
                        for(var i = 0; i < ulLen; i++) {
                            var ul = document.createElement("ul");
                            if(i < ulLen - 1) {
                                for(var j = 0; j < 6; j++) {
                                    var str = backData[i * 6 + j].buyStatus == "true" ? '<li><a href="' + backData[i * 6 + j].sourceUrl + '"> <img src="' + backData[i * 6 + j].imgUrl + '" alt=""> <h4>' + backData[i * 6 + j].name + '</h4> </a> <a href="' + backData[i * 6 + j].buyUrl + '">选购</a> </li>' : '<li><a href="' + backData[i * 6 + j].sourceUrl + '"> <img src="' + backData[i * 6 + j].imgUrl + '" alt=""> <h4>' + backData[i * 6 + j].name + '</h4> </a> <a  class="buyStatus" href="' + backData[i * 6 + j].buyUrl + '">选购</a> </li>';
                                    $(ul).append(str);
                                }
                            } else {
                                for(var k = 0; k < (backData.length - (ulLen - 1) * 6); k++) {
                                    var str = backData[i * 6 + k].buyStatus == "true" ? '<li><a href="' + backData[i * 6 + k].sourceUrl + '"> <img src="' + backData[i * 6 + k].imgUrl + '" alt=""> <h4>' + backData[i * 6 + k].name + '</h4> </a> <a href="' + backData[i * 6 + k].buyUrl + '">选购</a> </li>' : '<li><a href="' + backData[i * 6 + k].sourceUrl + '"> <img src="' + backData[i * 6 + k].imgUrl + '" alt=""> <h4>' + backData[i * 6 + k].name + '</h4> </a> <a href="' + backData[i * 6 + k].buyUrl + '" class="buyStatus">选购</a> </li>';
                                    $(ul).append(str);
                                }
                            }
                            $(".menuDetal").append(ul);
                        }
                    }
                });

                $(".menuDetal").stop().show();
            },function(){
                $(".menuDetal").stop().hide();
            });

            $(".menuDetal").hover(function(){
                $(".menuDetal").stop().show();
            },function(){
                console.log(1234567);
                $(".menuDetal").stop().hide();
            });
        }
    });










    
})