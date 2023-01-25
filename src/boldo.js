Webflow.push(function () {
  const doughnut = ["total"];

  for (let i = 0; i < doughnut.length; i++) {
    const type = doughnut[i];
    let proFormaTypeEl = $("#portfolio-" + type);

    let proFormaTypes = proFormaTypeEl
      .parent()
      .parent()
      .parent()
      .next()
      .children(".wrapper")
      .children();
    let proFormaTypesNums = [];
    let proFormaTypesColors = [];
    let proFormaTypesLabels = [];

    for (let i = 0; i < proFormaTypes.length; i++) {
      proFormaTypesNums.push(
        parseFloat(
          $(proFormaTypes[i])
            .children(".portfolio-graph-numbers")
            .children()
            .text()
            .split("%")[0]
        )
      );
      proFormaTypesColors.push(
        $(proFormaTypes[i])
          .children(".portfolio-graph-circle")
          .css("background-color")
      );
      proFormaTypesLabels.push($(proFormaTypes[i]).children().last().text());
    }
    const proFormaTypeData = {
      labels: proFormaTypesLabels,
      datasets: [
        {
          label: "Pro Forma " + type,
          data: proFormaTypesNums,
          backgroundColor: proFormaTypesColors,
          borderColor: "transparent"
        }
      ]
    };

    const proFormaTypesConfig = {
      type: $("#pro-forma-global").length ? "pie" : "doughnut",
      data: proFormaTypeData,
      options: {
        legend: {
          display: false
        },
        responsive: true,
        title: {
          display: false
        }
      }
    };

    const proFormaTypesChart = new Chart(proFormaTypeEl, proFormaTypesConfig);
  }

  // Bar Charts
  const bars = ["total"];

  for (let i = 0; i < bars.length; i++) {
    const type = bars[i];
    let proFormaTypeEl = $("#property-" + type);
    let proFormaTypes = proFormaTypeEl
      .parent()
      .parent()
      .parent()
      .prev()
      .children(".wrapper")
      .children();
    let proFormaTypesNums = [];
    let proFormaTypesColors = [];
    let proFormaTypesLabels = [];

    for (let i = 0; i < proFormaTypes.length; i++) {
      proFormaTypesNums.push(
        parseFloat(
          $(proFormaTypes[i])
            .children(".portfolio-graph-numbers")
            .children()
            .text()
            .split("%")[0]
        )
      );
      proFormaTypesColors.push(
        $(proFormaTypes[i])
          .children(".portfolio-graph-circle")
          .css("background-color")
      );
      proFormaTypesLabels.push(
        $(proFormaTypes[i]).children().last().children().first().text()
      );
    }
    const proFormaTypeData = {
      labels: proFormaTypesLabels,
      datasets: [
        {
          label: "Pro Forma " + type,
          data: proFormaTypesNums,
          backgroundColor: proFormaTypesColors,
          borderColor: "transparent"
        }
      ]
    };

    const proFormaTypesConfig = {
      type: "horizontalBar",
      data: proFormaTypeData,
      options: {
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false
        },
        scales: {
          x: {
            ticks: {
              display: false,
              beginAtZero: true,
              min: 0,
              suggestedMin: 0
            }
          },
          xAxes: [
            {
              time: {
                unit: "Areas"
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                display: false,
                beginAtZero: true,
                min: 0,
                suggestedMin: 0
              }
            }
          ],
          y: {
            display: false
          },
          yAxes: [
            {
              time: {
                unit: "Areas"
              },
              gridLines: {
                display: false
              },
              barThickness: 40
            }
          ]
        }
      }
    };

    const proFormaTypesChart = new Chart(proFormaTypeEl, proFormaTypesConfig);
  }
});
