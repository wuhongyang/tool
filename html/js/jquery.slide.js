
;(function($){
    jQuery.slideBox={
		slide:function(){
			var domString=arguments[0],width=arguments[1],length = $(domString).find("ul li").length;
				var currentSlide = $(".active",domString).data("index");

				$.slideBox.preNext(currentSlide,length);
				$.slideBox.init(domString,length,width);
				//点击上一组下一组
				
		},
		init:function(domString,length,width){
			$(".pre-next").click(function(){
					var name = $(this).attr("name");
					var currentSlide = $(".active",domString).data("index");
					if("next" == name){
						if(currentSlide+1<=length-1){
							$.slideBox.next(currentSlide,length,width); 
						}else{
							return;
						}
					}else{
						if(currentSlide-1>=0){
							$.slideBox.pre(currentSlide,length,width); 
						}else{
							return;
						}						 
					}					
				});
		},
		preNext:function(currentSlide,length){
		    if(0==currentSlide){
		    	$(".pre").addClass("none-left");
		    	$(".next").removeClass("none-right")
		    }else if(length-1 == currentSlide){
		    	$(".next").addClass("none-right");
		    	$(".pre").removeClass("none-left");

		    }else if(currentSlide<length-1&&currentSlide>0){
              $(".next").removeClass("none-right");
              $(".pre").removeClass("none-left") ;
		    }else{
		    	
		    }
		    if(1 == length){
              $(".next").addClass("none-right");
              $(".pre").addClass("none-left") ;
		    }
		},
		next:function(currentSlide,length,width){
		   var $current = $("#slide_"+currentSlide),$next = $("#slide_"+(currentSlide+1)),$parent=$current.parent();
		   var parentMargin = $parent.css("margin-left");
		       $current.parent().css("margin-left",parseInt(parentMargin)-width+"px");
		       $next.addClass("active").siblings().removeClass("active");
		       $.slideBox.preNext(currentSlide+1,length);
		},
		pre:function(currentSlide,length,width){
		     var $current = $("#slide_"+currentSlide),$pre = $("#slide_"+(currentSlide-1)),$parent=$current.parent();
		     var parentMargin = $parent.css("margin-left");
		       $current.parent().css("margin-left",parseInt(parentMargin)+width+"px");
		       $pre.addClass("active").siblings().removeClass("active");
		       $.slideBox.preNext(currentSlide-1,length); 
		}
    }	
})(jQuery); 