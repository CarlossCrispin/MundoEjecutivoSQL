$(document).ready( function() {
    (function() {
        var $table = $('#chart-example'), $chart = $('#chart-example-chart'), chart;
      
        // Create a button to toggle our table's visibility.
        // We could just hide it completely if we don't need it.
        $('#toggle-chart-table').click(function(e) {
          e.preventDefault();
          $table.toggle();
        });
      
        // Set up our Highcharts chart
        chart = new Highcharts.Chart({
          chart: {
            type: 'column',
            renderTo: 'chart-example-chart'
          },
          title: {
            text: 'World\'s largest cities per 2008'
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Population (millions)'
            }
          },
          series: [{
            name: 'Population',
            color: '#006A72'
          }]
        });
      
        // Create a function to update the chart with the current working set
        // of records from dynatable, after all operations have been run.
        function updateChart() {
          var dynatable = $table.data('dynatable'), categories = [], values = [];
          $.each(dynatable.settings.dataset.records, function() {
            categories.push(this.city);
            values.push(parseFloat(this.population));
          });
      
          chart.xAxis[0].setCategories(categories);
          chart.series[0].setData(values);
        };
      
        // Attach dynatable to our table, hide the table,
        // and trigger our update function whenever we interact with it.
        $table
          .dynatable({
            inputs: {
              queryEvent: 'blur change keyup',
              recordCountTarget: $chart,
              paginationLinkTarget: $chart,
              searchTarget: $chart,
              perPageTarget: $chart
            },
            dataset: {
              perPageOptions: [5, 10, 20],
              sortTypes: {
                'population': 'number'
              }
            }
          })
          .hide()
          .bind('dynatable:afterProcess', updateChart);
      
        // Run our updateChart function for the first time.
        updateChart();
      })();
});