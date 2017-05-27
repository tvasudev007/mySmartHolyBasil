angular.module('app.controllers', [])
  

  
.controller('navCtrl', function($scope,$rootScope,$window) { 
	
})

.controller('dashboardCtrl', function($scope,$rootScope,$window) {
	
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

{
  (function () {
    var LineChart = (function () {
      function LineChart(columns, color, margin, data, nv) {
        _classCallCheck(this, LineChart);

        this.columns = columns;
        this.color = color;
        this.margin = margin;
        this.data = data;
        this.nv = nv;
        this.maxX = 130;
        this.drawStep = 6; // It shows how many points will be drawn in one step
        this.durationResizeAnimation = 500;
      }

      _createClass(LineChart, [{
        key: '_addSvgContainer',
        value: function _addSvgContainer() {
          this.svg = d3.select('.line-chart__container').append('div').append('svg');
        }
      }, {
        key: '_getSvgSizes',
        value: function _getSvgSizes() {
          var svgWidth = getComputedStyle(this.svg[0][0]).width,
              svgHeight = getComputedStyle(this.svg[0][0]).height;
          this.svgWidth = svgWidth.slice(0, svgWidth.length - 2);
          this.svgHeight = svgHeight.slice(0, svgHeight.length - 2) - this.margin;
        }
      }, {
        key: '_addAxisLabels',
        value: function _addAxisLabels() {
          d3.selectAll('.line-chart__container svg .y-axis-label').remove();
          d3.select('.line-chart__container svg').append('text').attr('class', 'y-axis-label').attr('x', '-72').attr('y', '12').attr('transform', 'rotate(-90)').text('REVENUE');
          d3.select('.line-chart__container svg').append('text').attr('class', 'x-axis-label').text('TIME');
        }
      }, {
        key: '_buildBackground',
        value: function _buildBackground() {
          this._addSvgContainer();
          this._getSvgSizes();

          var bars = [];
          for (var i = 0; i < this.columns; i++) {
            bars.push(this.svgHeight);
          }

          this.barsLayout = this.svg.append('g').attr('class', 'bars').attr('transform', 'translate(' + this.margin + ', 0)').selectAll('rect').data(bars).enter().append('rect');

          this._addAxisLabels();

          this._setBackgroundSizes();
        }
      }, {
        key: '_setBackgroundSizes',
        value: function _setBackgroundSizes() {
          var availableBarWidth = (this.svgWidth - 2 * this.margin) / this.columns,
              barWidth = availableBarWidth / 2;
          this.barsLayout.attr('fill', this.color).attr('y', this.margin).attr('height', function (d, i) {
            return d;
          }).transition().duration(this.durationResizeAnimation).attr('width', barWidth).attr('x', function (d, i) {
            return i * availableBarWidth;
          });
          d3.select('.line-chart__container svg .x-axis-label').transition().duration(this.durationResizeAnimation).attr('x', this.svgWidth - this.margin - 30).attr('y', this.svgHeight - this.svgHeight / 4 + this.margin + 14);
        }
      }, {
        key: 'drawChart',
        value: function drawChart() {
          this._buildBackground();
          this._buildLegend();
          this._buildNvGraph();
          this._animateGraphs();
        }
      }, {
        key: '_buildNvGraph',
        value: function _buildNvGraph() {
          var _this = this;

          this._tuneNvGraph();

          nv.addGraph(function () {
            _this.svg.datum(_this.data).transition().duration(0).call(_this.lineChart);
            nv.utils.windowResize(_this.resizeBackground.bind(_this));
            nv.utils.windowResize(_this.lineChart.update);
            return _this.lineChart;
          });
        }
      }, {
        key: '_tuneNvGraph',
        value: function _tuneNvGraph() {
          this.lineChart = nv.models.lineChart().margin({ top: this.margin, right: this.margin, bottom: 0, left: this.margin }).useInteractiveGuideline(true).xDomain([0, 13.6]).yDomain([-1.01, 3]).showLegend(false).showYAxis(true).showXAxis(true).pointSize(5);

          this.lineChart.tooltip.enabled(false);
          this.lineChart.interactiveLayer.tooltip.enabled(false);

          this.lineChart.xAxis.showMaxMin(false).tickValues([0]).tickFormat(d3.format('c'));

          this.lineChart.yAxis.showMaxMin(false).ticks(10).tickFormat(d3.format('c'));
        }
      }, {
        key: '_buildLegend',
        value: function _buildLegend() {
          var legend = d3.select('.line-chart__container').append('div').attr('class', 'legend').selectAll('.legend__item').data(this.data).enter().append('div').attr('class', 'legend__item');

          legend.append('div').attr('class', 'legend__mark pull-left').style('background-color', function (d) {
            return d.color;
          });

          legend.append('div').attr('class', 'legend__text').text(function (d) {
            return d.key;
          });
        }
      }, {
        key: 'resizeBackground',
        value: function resizeBackground() {
          this._getSvgSizes();
          this._setBackgroundSizes();
        }
      }, {
        key: '_animateGraphs',
        value: function _animateGraphs() {
          var _this2 = this;

          var i = 1;
          this.timer = setInterval(function () {
            _this2._calcAllGraphs(i);
            _this2._drawNextStep(i);
            i++;
            _this2._checkEndOfAnimation(i);
          }, 15);
        }
      }, {
        key: '_drawNextStep',
        value: function _drawNextStep(i) {
          if (i % this.drawStep == 0 || i == this.maxX) {
            this.lineChart.update();
          }
        }
      }, {
        key: '_checkEndOfAnimation',
        value: function _checkEndOfAnimation(i) {
          if (i == this.maxX + 1) {
            this.lineChart.duration(this.durationResizeAnimation);
            this.data[1].fillOpacity = 0.11;
            this.lineChart.update();
            clearInterval(this.timer);
          }
        }
      }, {
        key: '_calcAllGraphs',
        value: function _calcAllGraphs(i) {
          this._calcFirstGraph(i);
          this._calcSecondGraph(i);
          this._calcThirdGraph(i);
        }
      }, {
        key: '_calcFirstGraph',
        value: function _calcFirstGraph(i) {
          var INTERVAL_1 = 28,
              INTERVAL_2 = 71,
              INTERVAL_3 = 110;
          var graphAwesome = this.data[0].values;

          if (i < INTERVAL_1) {
            graphAwesome.push({ x: i / 10, y: (.0343 * i * i - .67 * i) / 14 });
          } else {
            if (i < INTERVAL_2) {
              graphAwesome.push({ x: i / 10, y: -(i - 71) * (i - 71) / 1026 + 2.378 });
            } else {
              if (i < INTERVAL_3) {
                graphAwesome.push({ x: i / 10, y: -4 / (i - 43) + 2.53 });
              } else {
                graphAwesome.push({ x: i / 10, y: (i - 114) * (i - 114) * (i - 114) / 13000 + 2.476 });
              }
            }
          }
        }
      }, {
        key: '_calcSecondGraph',
        value: function _calcSecondGraph(i) {
          var INTERVAL_1 = 30,
              INTERVAL_2 = 82;
          var graphGood = this.data[1].values;

          if (i < INTERVAL_1) {
            graphGood.push({ x: i / 10, y: (.03255 * i * i - .96 * i) / 16 });
          } else {
            if (i < INTERVAL_2) {
              graphGood.push({ x: i / 10, y: (-.01055 * (i - 80.3) * (i - 80.3) + 27) / 15 });
            } else {
              graphGood.push({ x: i / 10, y: (i / 2 - 45) * (i / 2 - 45) * (i / 2 - 45) / 15000 + 1.805 });
            }
          }
        }
      }, {
        key: '_calcThirdGraph',
        value: function _calcThirdGraph(i) {
          var INTERVAL_1 = 31,
              INTERVAL_2 = 103;
          var graphFail = this.data[2].values;

          if (i < INTERVAL_1) {
            graphFail.push({ x: i / 10, y: (.02255 * i * i - .91 * i) / 13 });
          } else {
            if (i < INTERVAL_2) {
              graphFail.push({ x: i / 10, y: .82 * Math.sin((i - 45) / 21) });
            } else {
              graphFail.push({ x: i / 10, y: -(i - 130) * (i - 130) * (i - 130) / 64000 });
            }
          }
        }
      }]);

      return LineChart;
    })();

    var data = [{
      values: [{ x: 0, y: 0 }],
      key: 'Awesome',
      color: 'rgb(80, 150, 215)'
    }, {
      values: [{ x: 0, y: 0 }],
      key: 'Good',
      color: 'rgb(0, 188, 212)',
      fillOpacity: 0.00001,
      area: true
    }, {
      values: [{ x: 0, y: 0 }],
      key: 'Fail',
      color: 'rgb(255, 82, 82)'
    }];
    var lineChartContainer = document.querySelector('.line-chart__container');
    if (lineChartContainer) {
      var lineChart = new LineChart(7, '#4a4a4a', 20, data, nv);
      lineChart.drawChart();
    }
  })();
}

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

{
  (function () {
    'use strict';

    /*==========MODEL==========*/

    var Model = (function () {
      function Model(database) {
        _classCallCheck(this, Model);

        this.database = database || [{
          title: 'Fix bugs',
          id: 1651644545,
          completed: ''
        }, {
          title: 'Implement 30% of my feature',
          id: 1651646545,
          completed: ''
        }, {
          title: 'Fencing',
          id: 5451646545,
          completed: 'checked'
        }, {
          title: 'Read an article about Test-Driven Development',
          id: 5428646545,
          completed: ''
        }];
      }

      /*==========VIEW==========*/

      _createClass(Model, [{
        key: 'createItem',
        value: function createItem(title) {
          var newItem = {
            title: title,
            id: new Date().getTime(),
            completed: ''
          };
          this.database.push(newItem);
          return newItem;
        }
      }, {
        key: 'checkItem',
        value: function checkItem(id) {
          for (var i = 0; i < this.database.length; i++) {
            if (id == this.database[i].id) {
              this.database[i].completed = this.database[i].completed ? '' : 'checked';
              return;
            }
          }
        }
      }, {
        key: 'deleteItem',
        value: function deleteItem(id) {
          for (var i = 0; i < this.database.length; i++) {
            if (id == this.database[i].id) {
              this.database.splice(i, 1);
              return;
            }
          }
        }
      }, {
        key: 'deleteCompletedItems',
        value: function deleteCompletedItems() {
          for (var i = 0; i < this.database.length; i++) {
            if (this.database[i].completed === 'checked') {
              this.database.splice(i, 1);
              i--;
            }
          }
        }
      }]);

      return Model;
    })();

    var View = (function () {
      function View() {
        _classCallCheck(this, View);

        this.$todoList = document.querySelector('.todo .mdl-list');
        this.inputTemplate = '<div class="mdl-textfield mdl-js-textfield">\n                         <input class="mdl-textfield__input" type="text" id="todo-input">\n                         <label class="mdl-textfield__label" for="todo-input">What to do?..</label>\n                     </div>';
      }

      /*==========CONTROLLER==========*/

      _createClass(View, [{
        key: 'insertInput',
        value: function insertInput() {
          var newLi = document.createElement('li');
          newLi.classList.add('mdl-list__item');
          newLi.innerHTML = this._prepareTemplate({});
          this.$todoList.appendChild(newLi);
          View.upgradeNewMdlComponents();
          var inputSpan = document.querySelector('.todo .mdl-list li:last-child .mdl-checkbox__label');
          inputSpan.innerHTML = this.inputTemplate;
          View.upgradeNewMdlComponents();
          document.querySelector('.todo .mdl-list__item:last-child .mdl-textfield__input').focus();
        }
      }, {
        key: '_prepareTemplate',
        value: function _prepareTemplate(data) {
          return '<span class = "mdl-list__item-primary-content">\n                        <label for="' + data.id + '" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" checkboxItem>\n                            <input type="checkbox" id="' + data.id + '" ' + data.completed + ' class="mdl-checkbox__input" />\n                            <span class="mdl-checkbox__label">' + data.title + '</span>\n                        </label>\n                    </span>\n                    <div class="mdl-list__item-secondary-content">\n                        <button for = "' + data.id + '" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored mdl-button--mini-icon pull-right" deleteItem>\n                            <i class="material-icons">clear</i>\n                        </button>\n                    </div>';
        }
      }, {
        key: 'showAll',
        value: function showAll(database) {
          var _this = this;

          this.$todoList.innerHTML = '';
          database.forEach(function (data) {
            var newLi = document.createElement('li');
            newLi.classList.add('mdl-list__item');
            newLi.innerHTML = _this._prepareTemplate(data);
            _this.$todoList.appendChild(newLi);
          });
          View.upgradeNewMdlComponents();
        }
      }, {
        key: 'show',
        value: function show(data) {
          var newLi = document.createElement('li');
          newLi.classList.add('mdl-list__item');
          newLi.innerHTML = this._prepareTemplate(data);
          this.$todoList.appendChild(newLi);
          View.upgradeNewMdlComponents();
        }
      }], [{
        key: 'upgradeNewMdlComponents',
        value: function upgradeNewMdlComponents() {
          componentHandler.upgradeDom();
        }
      }]);

      return View;
    })();

    var Controller = (function () {
      function Controller(model, view) {
        var _this2 = this;

        _classCallCheck(this, Controller);

        this.$addItemButton = document.querySelector('.todo .mdl-button--fab');
        this.$removeCompletedButton = document.querySelector('.todo .mdl-card__actions .mdl-button');
        this.model = model;
        this.view = view;

        this.view.$todoList.addEventListener('mouseup', function (event) {
          var clickTarget = event.path[1];
          if (clickTarget.hasAttribute('deleteItem')) {
            var id = clickTarget.getAttribute('for');
            _this2.model.deleteItem(id);
            _this2.removeItem(event);
          } else if (clickTarget.hasAttribute('checkboxItem')) {
            _this2.check(clickTarget);
          } else {
            clickTarget = event.target;
            if (clickTarget.hasAttribute('checkboxItem')) {
              _this2.check(clickTarget);
            }
          }
        });

        this.$addItemButton.addEventListener('click', function () {
          _this2.$addItemButton.setAttribute('disabled', 'true');
          _this2.$removeCompletedButton.setAttribute('disabled', 'true');
          _this2.view.insertInput();

          var inputTextArea = document.querySelector('.todo .mdl-list__item:last-child .mdl-textfield__input');
          inputTextArea.addEventListener('keydown', function (event) {
            if (event.keyCode === 27) {
              _this2.removeItem(event);
            } else {
              if (event.keyCode === 13) {
                _this2.addItem(inputTextArea.value);
                _this2.removeItem(event);
              }
            }
          });
        });

        this.$removeCompletedButton.addEventListener('click', function () {
          _this2.removeCompletedItems();
        });

        if (this.model.database != []) {
          this.view.showAll(this.model.database);
        }
      }

      /*==========INITIALIZE==========*/

      _createClass(Controller, [{
        key: 'addItem',
        value: function addItem(title) {
          if (title.trim() === '') {
            return;
          }
          this.view.show(this.model.createItem(title));
        }
      }, {
        key: 'removeItem',
        value: function removeItem(clickTarget) {
          for (var i = 0; i < clickTarget.path.length; i++) {
            if (clickTarget.path[i].className == 'mdl-list__item') {
              clickTarget.path[i].remove();
              break;
            }
          }
          this.$addItemButton.removeAttribute('disabled');
          this.$removeCompletedButton.removeAttribute('disabled');
        }
      }, {
        key: 'removeCompletedItems',
        value: function removeCompletedItems() {
          this.model.deleteCompletedItems();
          this.view.showAll(this.model.database);
        }
      }, {
        key: 'check',
        value: function check(checkbox) {
          var id = checkbox.getAttribute('for');
          this.model.checkItem(id);
        }
      }]);

      return Controller;
    })();

    var Todo = function Todo() {
      _classCallCheck(this, Todo);

      this.model = new Model();
      this.view = new View();
      this.controller = new Controller(this.model, this.view);
    };

    var todoContainer = document.querySelector('.todo');
    if (todoContainer) {
      var todo = new Todo();
    }
  })();
}

{
    (function () {
        var task1 = document.querySelector('#task1'),
            task2 = document.querySelector('#task2'),
            task4 = document.querySelector('#task4');

        if (task1 && task2 && task4) {
            task1.addEventListener('mdl-componentupgraded', function () {
                task1.MaterialProgress.setProgress(44);
            });
            task2.addEventListener('mdl-componentupgraded', function () {
                task2.MaterialProgress.setProgress(14);
            });
            task4.addEventListener('mdl-componentupgraded', function () {
                task4.MaterialProgress.setProgress(31);
            });

            setTimeout(function () {
                document.querySelector('.projects-table .is-selected td > label').classList.add('is-checked');
                componentHandler.upgradeDom();
            }, 100);
        }
    })();
}
})
 
.controller('loginCtrl', function($scope,$rootScope,$window) {
	
})
 