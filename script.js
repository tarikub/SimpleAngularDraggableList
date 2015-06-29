var app = angular.module("listApp", []);
app.controller("listCtrl", function($scope) {
// Example list for ng-repeat
    $scope.listItems = [];
	$scope.initList = function()
	{
		$scope.listItems.push({Id:0, Name:'one'});
		$scope.listItems.push({Id:1, Name:'two'});
		$scope.listItems.push({Id:2, Name:'three'});
	}
});
// Simple and reusable directive for making list elements draggable.
app.directive('mlDraggableList', function(){ 
   return {
      restrict: 'A', //attribute only
      link: function(scope, elem, attr, ctrl) {
			//Drag functions
				scope.swapItems = function(sourceElemId, targetElemId, collectionName)
				{
					var source = scope[collectionName][sourceElemId];
					scope[collectionName][sourceElemId] = scope[collectionName][targetElemId];
					scope[collectionName][targetElemId] = source;
					scope.$apply();
				}
				scope.listDragStart = function()
				{
				 var sourceElem = event.target.id;
				var startElemId = $(event.target).attr("dlid");
				event.dataTransfer.setData("dlid", startElemId);
				}
				
				scope.listDragOver = function () {
					event.preventDefault();
				}
				
				scope.listDrop = function (collectionName) {
					 event.preventDefault();
					var targetElem = $(event.target).closest('li')
					var targetElemId = targetElem.attr("dlid");
					var sourceElemId = event.dataTransfer.getData("dlid");

					if (sourceElemId != targetElemId)
					{
						scope.swapItems(sourceElemId, targetElemId, collectionName);
					}
				}
			// Wire elements on last ng-repeat
		   if (scope.$last){
				scope.dllistItems = scope.$eval("scope." + attr.mlDraggableList);
		     $("li[ml-draggable-list]").each(function(index, item){
				
				$(item).attr("dlid", index); // Id used for swapping elements
				$(item).attr("draggable", true);
				$(item).bind('dragstart', function(e) { // Capture source element
					scope.$eval("listDragStart()");
				});
				$(item).bind('dragover', function(e) { // overriding default behavior
					scope.$eval("listDragOver()");
				});
				$(item).bind('drop', function(e) {
					scope.$eval("listDrop('" + attr.mlDraggableList + "')"); // When element is dropped
				});
			 });
		   }
      }
   };
});