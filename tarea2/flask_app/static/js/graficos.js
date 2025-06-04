document.addEventListener("DOMContentLoaded", () => {
  //Grafico de líneas
  fetch("/api/actividades_por_dia")
    .then(res => res.json())
    .then(data => {
      const seriesData = data.fechas.map((fecha, i) => [
        new Date(fecha).getTime(),  // timestamp
        data.cantidades[i]
      ]);
      Highcharts.chart("graficoLineas", {
        chart: { type: "line" },
        title: { text: "Cantidad de actividades por día" },
        xAxis: { categories: data.fechas },
        yAxis: { title: { text: "Cantidad Actividades" } },
        series: [{
          name: "Actividades",
          data: data.cantidades
        }]
      });
    });

  //Grafico de torta
  fetch("/api/actividades_por_tema")
    .then(res => res.json())
    .then(data => {
      Highcharts.chart("graficoTorta", {
        chart: { type: "pie" },
        title: { text: "Actividades por tema" },
        series: [{
          name: "Cantidad",
          colorByPoint: true,
          data: data.temas.map((t, i) => ({
            name: t,
            y: data.cantidades[i]
          }))
        }]
      });
    });

  //Grafico de barras
  fetch("/api/actividades_por_mes_hora")
    .then(res => res.json())
    .then(data => {
      Highcharts.chart("graficoBarras", {
        chart: { type: "column" },
        title: { text: "Cantidad de actividades por mes y rango horario" },
        xAxis: {
          categories: data.meses.map(m => `Mes ${m}`),
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: { text: "Cantidad de Actividades" }
        },
        tooltip: {
          shared: true
        },
        plotOptions: {
          column: { pointPadding: 0.2, borderWidth: 0 }
        },
        series: [
          { name: "Mañana", data: data["mañana"] },
          { name: "Mediodía", data: data["mediodía"] },
          { name: "Tarde", data: data["tarde"] }
        ]
      });
    });
});