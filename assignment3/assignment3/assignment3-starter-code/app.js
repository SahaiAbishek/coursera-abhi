(function(){
	'use strict';
	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.constant('ApiBasePath',"http://davids-restaurant.herokuapp.com")
	.directive('foundItems',FoundItems);
	
	function FoundItems(){
		var ddo ={
				restrict:'E',
				templateUrl:'foundItems.html',
				scope: {
					menu: '=foundItems',
					onRemove: '&'
				}
				
		};
		return ddo;
	}
	
	
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var menu = this;
		menu.searchItems = function(){
			
			var promise = MenuSearchService.narrowedItems(menu.searchTerm);
			
			promise.then(function(response){
				menu.xyz = response;
			}).catch(function(error){
				console.log("Something went wrong");
			});
		};
		
		
		menu.removeItem = function(itemIndex){
			console.log("IN menu.removeItem");
			MenuSearchService.removeItem(itemIndex);
		};
		
	}
	
	MenuSearchService.$inject = ['$http','ApiBasePath'];
	function MenuSearchService($http,ApiBasePath){
		var service = this;
		var filterList = [] ;
		
		service.getMatchedMenuItems = function(searchTerm){
			var response = $http({
				method:"GET",
				url:ApiBasePath+"/menu_items.json",
//				params: {
//					category: searchTerm
//				}
			});
			return response;
			
		};
		
		service.narrowedItems = function(filter){
			
			return service.getMatchedMenuItems().then(function(response){
	
				var response1 = response.data.menu_items;
				
				for(var i=0;i<response1.length;i++){
					var itemName = response1[i].name;
					var itemDesc = response1[i].description;
					if(itemDesc.toLocaleLowerCase().indexOf(filter) !== -1){
						if(filterList.indexOf(itemName) === -1){
							filterList.push(itemName);
						}
						
					}
				}
				return filterList;
			});
		};
		
		service.removeItem = function(itemIndex){
			filterList.splice(itemIndex,1);
		};
	}
	
})();