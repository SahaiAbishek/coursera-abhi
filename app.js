(function () {
'use strict';

angular.module('assApp', [])

.controller('assController', function ($scope) {
  $scope.lunchMenu = "";
  $scope.myLunchComment = "";
  $scope.displayLunch = function () {
  		if($scope.lunchMenu == ""){
  			$scope.myLunchComment = "Please enter data first";
  		}else{
    	
    	 var totalItems = splitString($scope.lunchMenu,',');
    	 if(totalItems<=3){
     		$scope.myLunchComment = "Enjoy!"
  		 }else{
     		$scope.myLunchComment = "Too Much !"
     	}
 	}
  };

  function splitString(stringToSplit, separator){
  	var arrayOfStrings = stringToSplit.split(separator);
  	return arrayOfStrings.length;
  }
});

})();