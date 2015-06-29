## Synopsis

Simple and reusable directive for making list elements draggable.

## Code Example

To make elements draggable add "ml-draggable-list" custom attribute and pass in the collection name.

```
<ul class="list-group" ng-init="initList()">
	<li class="list-group-item" id="item-{{item.Id}}" ng-repeat="item in listItems track by $index" ml-draggable-list="listItems">{{item.Name}}</li>
</ul>
```

## Motivation

Needed a simple and reusable directive to make elements in ng-repeat draggable.

## Installation

```
Step 1 - Add directive e.g. [yourApp].directive('mlDraggableList', function(){ 
Step 2 - Add "ml-draggable-list" attribute to your ng-repeat and pass in the collection name e.g. ="ml-draggable-list='listItems'"
```

## Contributors

tarikub

## License

MIT: http://opensource.org/licenses/MIT