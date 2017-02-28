/**
 * Created by Andrii Abramov on 5/31/16.
 */
(function () {
  'use strict';

  angular
    .module('app.warehouses')
    .directive('supplyArc', ['$timeout', 'd3', function ($timeout, d3) {
      function link(scope, elems, attrs) {
        scope.$watch('vmSupply.supply.amount', function () {
          createGuage(scope.vmSupply.supply, d3, elems[0]); // redraw amount svg on amount change
        });
      }
      return {
        restrict: 'A',
        link: link
      };
    }]);

  function createGuage(supply, d3, elem) {

    var sideSize = 450;
    var radius = sideSize / 3;
    var ticks = 12;
    var ticksSubdivide = 4;
    var bigTickSize = 15;
    var mediumTickSize = 10;
    var otherTickSize = 8;
    var tickPadding = 3;

    var svg = d3.select(elem)
      .html('')
      .attr('width', sideSize)
      .attr('height', sideSize);


    var gauge = iopctrl.arcslider()
      .radius(radius)
      .events(false)
      .indicator(iopctrl.defaultGaugeIndicator);

    gauge.axis().orient('out') // arrows [in | out]
      .normalize(true) // number
      .ticks(ticks) // num of numbers
      .tickSubdivide(ticksSubdivide) // num of sub ticks
      .tickSize(bigTickSize, mediumTickSize, otherTickSize) // (big, middle, unknown)
      .tickPadding(tickPadding) // number from arc
      .scale(d3.scale.linear()
        .domain([0, supply.maxCapacity]) // (from -> to)
        .range([-3 * Math.PI / 4, 3 * Math.PI / 4])); // (size of arc)

    var numOfDigits = getNumberOfDigits(supply.maxCapacity);

    var segDisplay = iopctrl.segdisplay() // digit field
      .width(numOfDigits * 30) // - == -
      .digitCount(numOfDigits) // num of digits in field
      .negative(false) // is negative
      .decimals(0); // clear

    svg.append('g')
      .attr('class', 'warehouse-gauge')
      .call(gauge);

    svg.append('g')
      .attr('class', 'warehouse-display')
      .attr('transform', 'translate(' + (210 - numOfDigits * 20) + ',' + (300) + ')') //60, 100
      .call(segDisplay);

    gauge.value(supply.amount);
    segDisplay.value(supply.amount);
  }

  function getNumberOfDigits(num) {
    return num.toString().length;
  }
})();
