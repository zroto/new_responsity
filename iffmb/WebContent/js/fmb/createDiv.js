var click = false;
var addContent = "";
var dom = null;
var domchild = null;
var mindivleft = null;
var mindivtop = null;
var x = null;
var y = null;
$(function(){
	var $parent = $("#draw");
	 var startX, startY, diffX, diffY;
	 var dragging = false; //是否拖动
	 var dropping = false;  //是否拖拽改变大小
	 
	 //鼠标按下事件
	 $(document).on('mousedown','#draw',function(e){
		 e = e || window.event;
		 startX = e.pageX;
		 startY = e.pageY;
		 if(e.target.className.match(/btn/)){
			 e.target.parentNode.parentNode.id = "box";
			 $('#box').remove();
		 }else if(e.target.className.match(/div_top/)){
			 // 允许拖动
			 dragging = true;
			 // 设置当前 box 的 id 为 moving_box
			 if($("#moving_box") !== null) {
				$("#moving_box").removeAttr("id");
			 }
			 e.target.parentNode.id = "moving_box";
			 // 计算坐标差值
			 diffX = startX - e.target.parentNode.offsetLeft +1 ;
			 diffY = startY - e.target.parentNode.offsetTop +1;
		 }else if(e.target.className.match(/box/) || e.target.className.match(/div/) || e.target.className.match(/font/)){
			 if($("#active_box") !== null){
				$("#active_box").removeAttr("id");
			 }
			 if(e.target.className.match(/box/)){
				e.target.id = "active_box";
			 }else if(e.target.className.match(/div/)){
				e.target.parentNode.id = "active_box";
			 }else{
				 e.target.parentNode.parentNode.id = "active_box";
			 }
			 dropping = true;
		 }else{
			 var div = "<div class ='box' style='left:"+startX+"px;top:"+startY+"px;' " +
					"id ='active_box' ><div class='div_top' ><div class='btn'>X</div></div></div>";
			 $parent.append(div);
		 }
	 });
		 
	 //鼠标移动事件 
	 $(document).on('mousemove',"#draw",function(e){
		 if($("#active_box") !== null){
			mindivleft = $parent.width();
			mindivtop = $parent.height();
			var minleft = startX;
			var mintop = startY;
			var $ab = $("#active_box");
			var $boxes = $('.box');
			getXY(minleft,mindivleft,mintop,mindivtop,$boxes,$ab,e.pageX,e.pageY);
			if(dropping){
				if($("#active_box").length !== 0){
					startX = $ab.position().left;
					startY = $ab.position().top;
				}
				dropping = false;
			}
			if(e.pageX > x && e.pageY > y){
				$ab.width(x-startX);
				$ab.height(y-startY);
			}else if(e.pageX > x && e.pageY < y){
				$ab.width(x-startX);
				$ab.height(e.pageY-startY);
			}else if(e.pageX < x && e.pageY > y){
				$ab.width(e.pageX-startX);
				$ab.height(y-startY);
			}else if(e.pageX <= x && e.pageY <= y){
				$ab.width(e.pageX-startX);
				$ab.height(e.pageY - startY);
			}
		 }
		 // 移动，更新 box 坐标
		 if($("#moving_box") !== null && dragging) {
				var boxes = $(".box");
				var mb = $("#moving_box");
				var left = 0; //左
				var top = 0;  //上
				var right = $parent.width(); //右
				var bottom = $parent.height();  //下
				for(var i=0;i<boxes.length;i++){
					if(boxes[i] != mb[0]){
						var divleft = boxes[i].offsetLeft;
						var divtop = boxes[i].offsetTop;
						var divright = boxes[i].offsetLeft + boxes[i].offsetWidth;
						var divbtm = boxes[i].offsetTop + boxes[i].offsetHeight;
						if(mb.position().left > divleft){ //左边
							if(mb.position().left >= divright){
								if(!(mb.position().top > divbtm || mb.position().top +mb.height() < divtop)){
									if(left <= divright){
										left = divright;
									}
								}
							}else{
								if(mb.position().top > divbtm){
									if(top < divbtm){
										top = divbtm;
									}
								}
								if(mb.position().top + mb.height() < divtop){
									if(bottom > divtop){
										bottom = divtop;
									}
								}
							}
						}
						if(mb.position().left + mb.width() < divright){ //右边
							if(mb.position().left + mb.width() <= divleft){
								if(!(mb.position().top > divbtm || mb.position().top + mb.height() < divtop)){
									if(right > divleft){
										right = divleft;
									}
								}
							}else{
								if(mb.position().top > divbtm){
									if(top < divbtm){
										top = divbtm;
									}
								}
								if(mb.position().top + mb.height() <divtop){
									if(bottom > divtop){
										bottom = divtop;
									}
								}
							}
						}
						if(mb.position().top >= divbtm){//上
							if(!(mb.position().left > divright || mb.position().left + mb.width() < divleft)){
								if(top < divbtm ){
									top = divbtm;
								}
							}
						}
						if(mb.position().top + mb.height() <= divtop){ //下
							if(!(mb.position().left > divright || mb.position().left + mb.width() < divleft)){
								if(bottom > divtop){
									bottom = divtop;
								}
							}
						}
					}
				}
				if(e.pageX - diffX >= left && e.pageX - diffX <= right - mb.width()){
					mb.css('left',e.pageX - diffX); 
				}
				if(e.pageY - diffY >= top && e.pageY - diffY <= bottom - mb.height()){
					mb.css('top',e.pageY - diffY);
				}
			}
	 });
		 
	//鼠标抬起事件
	$(document).on('mouseup',"#draw",function(e){
		dragging = false;
		if($("#active_box") !== null) {
			var $ab = $("#active_box");
			// 如果长宽均小于 30px，移除 box
			if($ab.width() < 30 || $ab.height() < 30) {
				$ab.remove();
			}
			$ab.removeAttr('id');
		}
		
		if(click){
			if(e.target.className.match(/box/)){
				if(e.target.children[1] != undefined){
					e.target.children[1].children[0].inneText = addContent;
				}else{
					var height = e.target.offsetHeight +"px";
					var div = "<div class='div' style='height:100%;line-height:"+height+";'>"+
						"<font class='font' style='line-height:"+height+"'>"+addContent+"</font></div>";
					e.target.id = "tempBox";
					$("#tempBox").append(div);
					$("#tempBox").removeAttr('id');
				}
			}else if(e.target.className.match(/div/)){
				e.target.children[0].textContent = addContent;
			}else if(e.target.className.match(/font/)){
				e.target.textContent = addContent;
				
			}
			click = false;
		}
	});
		
});

//选择图标功能
parent.$("#selectCharts").mousedown(function(e){
	var row = parent.$("#dg1").datagrid("getSelected");
	if(row != null){
		parent.$("#dlg1").dialog('close');
		click = true;
		addContent = row.ctVarName;
	}else{
		window.parent.tips();
	}
});
	
//div移动边界限定
var divtop = null;
var divbtm = null;
function getMindivleft(minleft,mindivleft,mintop,mindivtop,boxes,ab){
	for(var i=0;i< boxes.length;i++){
		if(boxes[i] != ab){
			//获取当前范围内最小的divleft
			if(minleft < (boxes[i].offsetLeft-1) && mintop < (boxes[i].offsetTop + boxes[i].offsetHeight -2) ){
				if(boxes[i].offsetTop -1 < mindivtop){ 
					if(mindivleft > boxes[i].offsetLeft -1){
						mindivleft = boxes[i].offsetLeft -1;
						divtop = boxes[i].offsetTop -1;
						divbtm = boxes[i].offsetTop + boxes[i].offsetHeight -2 ;
					}
				}
			}
		}
	}
	return mindivleft;
}


function getMindivtop(minleft,mindivleft,mintop,mindivtop,boxes,ab){
	for(var i= 0;i< boxes.length;i++){
		if(boxes[i]!= ab){
			//获取在当前范围内最小的divtop
			if(mintop <= (boxes[i].offsetTop-1) && minleft <= (boxes[i].offsetLeft + boxes[i].offsetWidth -2)){
				if(boxes[i].offsetLeft - 1 < mindivleft){
					if(mindivtop > boxes[i].offsetTop -1){
						mindivtop = boxes[i].offsetTop -1;
					}
				}
			}
		}
	}
	return mindivtop;
}

function getXY(minleft,mindivleft,mintop,mindivtop,boxes,ab,x1,y1){
	//获取最小的mindivleft
	var zuo = false;  //判断是否向下移动
	var shang = false;  //判断是否向右移动
	var mdivleft = getMindivleft(minleft,mindivleft,mintop,mindivtop,boxes,ab);
	var mdivtop = getMindivtop(minleft,mdivleft,mintop,mindivtop,boxes,ab);
	//左上角需要经过特殊处理
	if(x1 == mdivleft){
		zuo = true;
		shang = false;
	}
	if(y1 ==  mdivtop){
		zuo = false;
		shang = true;
	}
	//左上角处理
	var mdivleft2 = getMindivleft(mdivleft,mindivleft,mintop,mindivtop,boxes,ab);
	var mdivtop2 = getMindivtop(mdivleft,mdivleft2,mintop,mindivtop,boxes,ab);
	if(x1 > mdivleft && x1 < mdivleft2 && y1 > divtop && y1 < divbtm){
		if(zuo){
			x = mdivleft;
			y = mdivtop;
		}
		if(shang){
			x = mdivleft2;
			y =  mdivleft2;
		}
	}else if(x1 > mdivleft && x1 < mdivleft2 && y1 > divbtm && y1 < mdivtop){
		x = mdivleft;
		y = mdivtop;
	}else if(x1 > mdivleft &&  x1 < mdivleft2 && y1 < divtop ){
		x = mdivleft2;
		y = mdivtop2;
	}else if(x1 > minleft && x1 < mdivleft && y1 > mintop && y1 < mdivtop){
		x = mdivleft;
		y = mdivtop;
	}
}