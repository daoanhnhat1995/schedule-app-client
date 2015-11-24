angular.module('parse-starter.factories')
	.factory('courseData',function(){
		 var cartList = [];
		  return {
		    addClass: function(deptName,className){
		      //add a class to the list view
		      cartList.push({
		        department: deptName,
		        class: className
		      });
		    },
		    getCartList: function(){
		      return cartList;
		    },
		    removeClass: function(classname){
		      cartList.splice(cartList.indexOf(classname),1);
		    }
		  }
	})