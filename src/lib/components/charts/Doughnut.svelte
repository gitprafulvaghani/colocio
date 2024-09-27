<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let idChart = "randomChart";
  export let useHtmlLegend = false;
  export let dataChart = {
    labels: ["Random 1", "Random 2", "Random 3", "Random 4", "Random 5"],
    datasets: [
      {
        data: [
          Math.random() * 500,
          Math.random() * 500,
          Math.random() * 500,
          Math.random() * 200,
          Math.random() * 200,
        ],
        label: "RandomDataSet",
        backgroundColor: [
          "#589AFF",
          "#0D64E8",
          "#0024A4",
          "#273668",
          "#5E7BB3",
        ],
      },
    ],
  };

  const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector("ul");

    if (!listContainer) {
      listContainer = document.createElement("ul");
      listContainer.style.display = "flex";
      listContainer.style.flexDirection = "column";
      listContainer.style.margin = 0;
      listContainer.style.padding = 0;

      legendContainer.appendChild(listContainer);
    }

    return listContainer;
  };

  const htmlLegendPlugin = {
    id: "htmlLegend",
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);

      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }

      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      items.forEach((item) => {
        const li = document.createElement("li");
        li.style.alignItems = "center";
        li.style.cursor = "pointer";
        li.style.display = "flex";
        li.style.flexDirection = "row";
        li.style.marginLeft = "10px";
        li.style.marginBottom = "8px";
        li.style.fontSize = "12px";

        li.onclick = () => {
          const { type } = chart.config;
          if (type === "pie" || type === "doughnut") {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(
              item.datasetIndex,
              !chart.isDatasetVisible(item.datasetIndex)
            );
          }
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement("span");
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + "px";
        boxSpan.style.display = "inline-block";
        boxSpan.style.flexShrink = 0;
        boxSpan.style.height = "20px";
        boxSpan.style.marginRight = "10px";
        boxSpan.style.width = "20px";
        boxSpan.style.borderRadius = "50%";
        boxSpan.style.color = "#474747";

        // Text
        const textContainer = document.createElement("p");
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? "line-through" : "";

        let svg_file = "";
        let bool_img = false;
        let img_src = "";
        switch (item.text) {
          case "Facebook":
            svg_file =
              '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 6.20002H8.9905V5.00003C8.9905 4.38083 9.03838 3.99083 9.88152 3.99083H10.9464V2.08284C10.4282 2.02644 9.90717 1.99884 9.38556 2.00004C7.83895 2.00004 6.71021 2.99423 6.71021 4.81943V6.20002H5V8.60002L6.71021 8.59942V14H8.9905V8.59822L10.7383 8.59762L11 6.20002Z" fill="#4B5563"/></svg>';
            break;
          case "Instagram":
            svg_file = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.33333 2C3.49533 2 2 3.49533 2 5.33333V10.6667C2 12.5047 3.49533 14 5.33333 14H10.6667C12.5047 14 14 12.5047 14 10.6667V5.33333C14 3.49533 12.5047 2 10.6667 2H5.33333ZM5.33333 3.33333H10.6667C11.7693 3.33333 12.6667 4.23067 12.6667 5.33333V10.6667C12.6667 11.7693 11.7693 12.6667 10.6667 12.6667H5.33333C4.23067 12.6667 3.33333 11.7693 3.33333 10.6667V5.33333C3.33333 4.23067 4.23067 3.33333 5.33333 3.33333ZM11.3333 4C11.1565 4 10.987 4.07024 10.8619 4.19526C10.7369 4.32029 10.6667 4.48986 10.6667 4.66667C10.6667 4.84348 10.7369 5.01305 10.8619 5.13807C10.987 5.2631 11.1565 5.33333 11.3333 5.33333C11.5101 5.33333 11.6797 5.2631 11.8047 5.13807C11.9298 5.01305 12 4.84348 12 4.66667C12 4.48986 11.9298 4.32029 11.8047 4.19526C11.6797 4.07024 11.5101 4 11.3333 4ZM8 4.66667C6.162 4.66667 4.66667 6.162 4.66667 8C4.66667 9.838 6.162 11.3333 8 11.3333C9.838 11.3333 11.3333 9.838 11.3333 8C11.3333 6.162 9.838 4.66667 8 4.66667ZM8 6C9.10267 6 10 6.89733 10 8C10 9.10267 9.10267 10 8 10C6.89733 10 6 9.10267 6 8C6 6.89733 6.89733 6 8 6Z" fill="#4B5563"/>
                      </svg>`;
            break;
          case "X":
            svg_file = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.4507 3H13.2908L9.27076 7.2359L14 13H10.297L7.39675 9.5041L4.07815 13H2.23696L6.53678 8.46923L2 3H5.79697L8.41858 6.19538L11.4507 3ZM10.8049 11.9846H11.8245L5.24294 3.96205H4.1488L10.8049 11.9846Z" fill="#4B5563"/>
                      </svg>`;
            break;
          case "Tiktok":
            svg_file = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.88196 3H8.30354V9.81158C8.30354 10.6232 7.69646 11.2899 6.94098 11.2899C6.1855 11.2899 5.57842 10.6232 5.57842 9.81158C5.57842 9.0145 6.17201 8.36231 6.90052 8.33333V6.62319C5.29511 6.65217 4 8.05797 4 9.81158C4 11.5797 5.32209 13 6.95448 13C8.58684 13 9.90893 11.5652 9.90893 9.81158V6.31883C10.5025 6.78261 11.231 7.05797 12 7.07247V5.36232C10.8128 5.31884 9.88196 4.27536 9.88196 3Z" fill="#4B5563"/>
                      </svg>`;
            break;
          case "Like":
          case "Heart":
          case "Care":
          case "Haha":
          case "Wow":
          case "Sad":
          case "Angry":
            bool_img = true;
            img_src = `/images/facebook/${item.text.toLowerCase()}.png`;
            break;

          default:
            break;
        }

        const text = document.createElement("span");
        let boxSpanKey = document.createElement("span");
        let boxSpanValue = document.createElement("span");
        boxSpanKey.id = "spanValue";
        boxSpanValue.id = "campaignValue";
        if (bool_img) {
          const icon_img = document.createElement("img");
          icon_img.src = img_src;
          icon_img.width = 20;
          icon_img.height = 20;
          icon_img.alt = item.text;
          text.appendChild(icon_img);

          const itemKey = `${item.text}:`;
          const itemValue = `${chart.data.datasets[0].data[item.index]}`;
          boxSpanKey.textContent = itemKey; // or use innerText
          boxSpanValue.textContent = itemValue;
          text.appendChild(boxSpanKey); // Append the span to the body or any other container
          text.appendChild(boxSpanValue); // Append the span to the body or any other container
        } else {
          //  text.innerHTML =
          //    svg_file +
          //    `${item.text}: ${chart.data.datasets[0].data[item.index]}`;
          boxSpanKey.id = "socialMedia";
          const itemKey = `${item.text}:`;
          const itemValue = `${chart.data.datasets[0].data[item.index]}`;
          boxSpanKey.textContent = itemKey;
          boxSpanValue.textContent = itemValue;
          text.appendChild(boxSpanKey); // Append the span to the body or any other container
          text.appendChild(boxSpanValue); // Append the span to the body or any other container
        }
        text.style.display = "flex";
        text.style.flexDirection = "row";
        text.style.alignItems = "center";
        text.style.gap = "5px";
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    },
  };

  let legend = {
    position: "right",
    display: true,
    align: "middle",
    labels: {
      font: {
        family: "Inter var",
      },
      boxWidth: 20,
      boxHeight: 20,
      usePointStyle: true,
      pointStyle: "circle",
    },
  };

  const plugins = [
    {
      beforeInit(chart) {
        // Get a reference to the original fit function
        const originalFit = chart.legend.fit;
        // Override the fit function
        chart.legend.fit = function fit() {
          // Call the original function and bind scope in order to use `this` correctly inside it
          originalFit.bind(chart.legend)();
          // Change the height as suggested in other answers
          this.height += 16;
        };
      },
    },
  ];

  if (useHtmlLegend) {
    plugins.push(htmlLegendPlugin);
    legend.display = false;
  }

  const config = {
    type: "doughnut",
    data: dataChart,
    plugins: plugins,
    options: {
      borderWidth: 0,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: legend,
        title: {
          display: false,
          align: "start",
          font: {
            family: "Inter var",
            size: 22,
          },
          text: "Platforms",
        },
        htmlLegend: {
          containerID: "legend-container-" + idChart,
        },
      },
    },
  };

  onMount(() => {
    const canvas = document.getElementById(idChart) as HTMLCanvasElement;
    if (!canvas) return;
    const chart = new Chart(canvas, config);
  });
</script>

<div
  class="h-full flex sm:justify-between justify-center gap-[20px] sm:flex-nowrap flex-wrap"
>
  <div class="max-h-[200px] w-full max-w-full">
    <canvas id={idChart} />
  </div>
  {#if useHtmlLegend}
    <div
      id="legend-container-{idChart}"
      class="flex justify-center items-center"
    />
  {/if}
</div>

<style>
  .chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  canvas {
    max-width: 100%;
    max-height: 100%;
  }

  @media (max-width: 768px) {
    .chart-container {
      flex-direction: column;
    }
  }
</style>
