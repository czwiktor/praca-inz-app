import FusionCharts from "fusioncharts/core";

// include chart from viz folder - import ChartType from fusioncharts/viz/[ChartType];
import Column2D from "fusioncharts/viz/column2d";

// add chart as dependency - FusionCharts.addDep(ChartType);
FusionCharts.addDep(Column2D);

// instantiate the chart.
var chartInstance = new FusionCharts({
  type: "Column2D",
  renderAt: "chart-container", // div container where chart will render
  width: "600",
  height: "400",
  dataFormat: "json",
  dataSource: {
    // chart configuration
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subcaption: "In MMbbl = One Million barrels",
    },
    // chart data
    data: [
      { label: "Venezuela", value: "290000" },
      { label: "Saudi", value: "260000" },
      { label: "Canada", value: "180000" },
      { label: "Iran", value: "140000" },
      { label: "Russia", value: "115000" },
      { label: "UAE", value: "100000" },
      { label: "US", value: "30000" },
      { label: "China", value: "30000" },
    ],
  },
});

// render the chart
chartInstance.render();