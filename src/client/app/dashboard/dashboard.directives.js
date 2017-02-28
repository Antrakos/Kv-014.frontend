/**
 * Created by Taras on 27.05.2016.
 */
(function () {
  'use strict';

  angular.module('app.dashboard')
    .directive('fedAnimalsPieChart', ['DashboardService', 'd3', '$location',
      function (DashboardService, d3, $location) {
        return {
          link: function (scope, element) {
            DashboardService.getFedAnimals().success(function (data) {
              donutChart(d3, element[0].localName, 200, 200,
                [{percent: data, pie: 1}, {percent: 1 - data, pie: 0}],
                'Fed animals\n' + (data * 100).toFixed(2) + '%', $location.path());
            });
          }
        };
      }])
    .directive('taskStatistics', ['c3', 'DashboardService',
      function (c3, DashboardService) {
        return {
          template: '<div id="taskStatus" class="col-md-5 col-md-offset-1 text-center"></div>' +
          '<div id="taskType" class="col-md-5 col-md-offset-1 text-center"></div>',
          link: function () {
            DashboardService.getTaskStatistics().success(function (data) {
              pieChart(c3, '#taskType', 'Task types', {height: 250}, data.taskTypes.map(function (item) {
                return [item.taskType, item.count];
              }));
              pieChart(c3, '#taskStatus', 'Task statuses', {height: 250}, data.taskStatuses.map(function (item) {
                return [item.taskStatus, item.count];
              }));
            });
          }
        };
      }]);
  function pieChart(c3, bindto, title, size, data) {
    c3.generate({
      bindto: bindto,
      size: size,
      padding: {right: 10, left: 10, top: 10},
      data: {
        columns: data,
        type: 'pie'
      },
      pie: {
        label: {
          format: function (value) {
            return value;
          }
        }
      },
      title: {
        text: title
      }
    });
  }

  function donutChart(d3, element, width, height, data, title, url) {
    var radius = Math.min(width, height) / 2;

    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(((radius - 10) / 5) * 3);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) {
        return d.percent;
      });

    var svg = d3.select(element).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var defs = svg.append('svg:defs');

    var redGradient = defs.append('svg:linearGradient')
      .attr('id', 'red-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')
      .attr('spreadMethod', 'pad');
    redGradient.append('svg:stop')
      .attr('offset', '0%')
      .attr('stop-color', 'rgb(221,48,2)')
      .attr('stop-opacity', 1);
    redGradient.append('svg:stop')
      .attr('offset', '100%')
      .attr('stop-color', 'rgb(247, 78, 1)')
      .attr('stop-opacity', 1);

    var radialGradient = defs.append('radialGradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '75%')
      .attr('fx', '50%')
      .attr('fy', '50%')
      .attr('gradientTransform', 'translate(-' + radius + ',-' + radius + ')')
      .attr('id', 'radial-gradient');
    radialGradient.append('stop').attr('offset', '0%').style('stop-color', 'black');
    radialGradient.append('stop').attr('offset', '55%').style('stop-color', 'white');
    radialGradient.append('stop').attr('offset', '95%').style('stop-color', 'black');

    var y = 0;
    var text = svg.append('svg:text')
      .attr('x', 0)
      .attr('y', y)
      .attr('fill', 'red');
    title.split('\n').forEach(function (entry) {
      var size = visualLength(entry);
      text.append('tspan')
        .attr('x', -(size.width) / 2)
        .attr('y', y)
        .text(entry);
      y += size.height;
    });

    var g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');
    g.append('path')
      .attr('d', arc)
      .style('fill', function (d) {
        if (d.data.pie === 1) {
          return 'url(' + url + '#red-gradient)';
        } else {
          return 'url(' + url + '#radial-gradient)';
        }
      });
  }

  function visualLength(string) {
    var ruler = document.getElementById('ruler');
    ruler.innerHTML = string;
    var data = {
      width: ruler.offsetWidth,
      height: ruler.offsetHeight
    };
    ruler.innerHTML = '';
    return data;
  }
})();


