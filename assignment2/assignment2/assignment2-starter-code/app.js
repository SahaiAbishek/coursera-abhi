(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListControllerOne', ShoppingListControllerOne)
.controller('ShoppingListControllerTwo', ShoppingListControllerTwo)
.service('ShoppingListService', ShoppingListService);

//code for controller1
ShoppingListControllerOne.$inject = ['ShoppingListService'];
function ShoppingListControllerOne(ShoppingListService){
  var showList = this;
  showList.items = ShoppingListService.getItems();
  
  showList.removeItem = function(itemIndex){
	  try{
		  ShoppingListService.removeItem(itemIndex);
	  }catch(error){
		  showList.errorMessage = error.message;  
	  }
  };
}


//code for controller2
ShoppingListControllerTwo.$inject = ['ShoppingListService'];
function ShoppingListControllerTwo(ShoppingListService){
	 console.log("In controller 2");
	  var showList2 = this;
	  try{
		  showList2.items = ShoppingListService.getItems2();
		  console.log(">>>>>>>>>>>",showList2.items.length);
	  }catch(error1){
		  showList2.errorMessage1 = error1.message;
	  }
}


function ShoppingListService(){
		var service = this;
		var items = [
		{
			name: "Milk",
			quantity: "2"
		},
		{
			name: "Donuts",
			quantity: "20"
		},
		{
			name: "cookies",
			quantity: "30"
		},
		{
			name: "chocolate",
			quantity: "5"
		},
		{
			name: "chips",
			quantity:"10"
		}
		];
		
		var items2 = [];

		service.addItem = function(itemName,quantity){
			var item = {
					name: itemName,
					quantity: quantity
			};
			items.push(item);
		};

		service.getItems = function(){
			return items;
		};
		
		service.removeItem = function(itemIdex){
			items2.push(items[itemIdex]);
			items.splice(itemIdex,1);
			console.log(items2.length);
			if( items.length === 0 ){
				throw new Error("Everything is bought!");
			}
			
			
		};
		
		service.getItems2 = function(){	
			return items2;
		};
	}

})();
