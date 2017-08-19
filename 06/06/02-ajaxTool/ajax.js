	//由于使用XMLHttpRequest对象 请求服务器 
	//每次使用有大量重复代码，希望封装一个工具函数来简化重复书写代码 
	// 封装函数： 封装公共代码，把其中变化的部分以参数的形式暴露出来
	
	// 参数：（变化部分） 
	//  请求方式type：get post 
	//  请求处理程序url: 
	//  传递给服务器的数data:
	//  如何处理服务器返回的数据callback;
	
	//命名空间
	var $={
		ajax:function(obj){
			//检测调用者传递的参数是否合理
			var rType=obj.type||'get';
			var rUrl=obj.url||location.href;  //location.href当前页面地址
			var rData=this.setData(obj.data); //"name=zs&age=18"
			var callback=obj.callback;


			//创建XMLHttpRequest对象
			var  xhr=new XMLHttpRequest();

			if(rType=="get"){
				rUrl=rUrl+"?"+rData;
				rData=null;
			}
			//请求行
			xhr.open(rType,rUrl);

			//请求头部 get可以省略 
			if(rType=="post"){
				xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			}

			//设置请求的主体
			xhr.send(rData);

			//监听服务器响应
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					var result=xhr.responseText;
					//假设 服务器返回是json数据
					result=JSON.parse(result);
					//要处理接受到的数据
					callback&&callback(result);
				}
			}
		},		
		//把用户传入的对象 转换成  "name=zs&age=18"
		setData:function(obj){
			if(typeof obj=="object"){
				var s='';
				for(var key in obj){							
					s+=key+"="+obj[key]+"&";
				}
				//裁剪最后一个&号
				s=s.slice(0,length-1);						
				return s;
			}
		}
	}
