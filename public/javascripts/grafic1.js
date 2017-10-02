/*$(document).ready( function() {
  var chart = AmCharts.makeChart("chartdiv", {
    "theme": "chalk",
    "type": "serial",
    "dataProvider": [{
        "country": "USA",
        "year2004": 3.5,
        "year2005": 4.2
    }, {
        "country": "UK",
        "year2004": 1.7,
        "year2005": 3.1
    }, {
        "country": "Canada",
        "year2004": 2.8,
        "year2005": 2.9
    }, {
        "country": "Japan",
        "year2004": 2.6,
        "year2005": 2.3
    }, {
        "country": "France",
        "year2004": 1.4,
        "year2005": 2.1
    }, {
        "country": "Brazil",
        "year2004": 2.6,
        "year2005": 4.9
    }, {
        "country": "Russia",
        "year2004": 6.4,
        "year2005": 7.2
    }, {
        "country": "India",
        "year2004": 8,
        "year2005": 7.1
    }, {
        "country": "China",
        "year2004": 9.9,
        "year2005": 10.1
    }],
    "valueAxes": [{
        "stackType": "3d",
        "unit": "%",
        "position": "left",
        "title": "Mundo",
    }],
    "startDuration": 1,
    "graphs": [{
        "balloonText": "GDP grow in [[category]] (2004): <b>[[value]]</b>",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "title": "2004",
        "type": "column",
        "valueField": "year2004"
    }, {
        "balloonText": "fdhg [[category]] (2005): <b>[[value]]</b>",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "title": "2005",
        "type": "column",
        "valueField": "year2005"
    }],
    "plotAreaFillAlphas": 0.1,
    "depth3D": 60,
    "angle": 30,
    "categoryField": "country",
    "categoryAxis": {
        "gridPosition": "start"
    },
    "export": {
      "enabled": true
     }
  });
  jQuery('.chart-input').off().on('input change',function() {
  var property	= jQuery(this).data('property');
  var target		= chart;
  chart.startDuration = 0;
  
  if ( property == 'topRadius') {
    target = chart.graphs[0];
        if ( this.value == 0 ) {
          this.value = undefined;
        }
  }
  
  target[property] = this.value;
  chart.validateNow();
  });
});*/
//////////////////////////////////////////////////////
$(document).ready( function() {
    $(function () {
        Highcharts.chart('container', {
            data: {
                table: 'datatable'
            },
            title: {
                text: 'Ranking 2017'
            },
            yAxis: [{ 
                title: {
                    text: 'Valores'
                }
            }, { //--- Secondary yAxis
                title: {
                    text: ''
                },
                opposite: true
            }]
        });
    });
});
/*$(document).ready( function() {
    $(function () {
        Highcharts.chart('container', {
            data: {
                table: 'datatable'
            },
            chart: {
                type: 'column'
            },
            title: {
                text: 'Ranking'
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Units'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.point.y + ' ' + this.point.name.toLowerCase();
                }
            }
        });
    });
});*/
