<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { getPlatfrom } from '$lib/services/NewFacebook/Insights_service';

  async function GetPlatformDetails(): Promise<void> {
    try {
      const response = await getPlatfrom();

      const platformData = processData(response);
      updateChart(platformData);
    } catch (error) {
      console.error('Error fetching platform data:', error);
    }
  }

  function processData(data: any): number[] {
    let fbInsta = 0;
    let Insta = 0;
    let FB = 0;
    let InstaTicktok = 0;
    let Tiktok = 0;
    data.forEach((entry: any) => {
      if (entry.publisher_platform === 'facebook, instagram') {
        fbInsta++;
      } else if (entry.publisher_platform === 'instagram') {
        Insta++;
      } else if (entry.publisher_platform === 'facebook') {
        FB++;
      } else if (entry.publisher_platform === 'instagram, tiktok') {
        InstaTicktok++;
      } else if (entry.publisher_platform === 'tiktok') {
        Tiktok++;
      }
    });

    return [fbInsta, Insta, FB, InstaTicktok, Tiktok];
  }

  let idChart = 'platformsChart';
  const dataChart = {
    labels: [
      'Facebook, Instagram',
      'Instagram',
      'Facebook',
      'Instagram, Tiktok',
      'Tiktok',
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        label: 'Platforms',
        backgroundColor: [
          '#589AFF',
          '#0D64E8',
          '#0024A4',
          '#273668',
          '#5E7BB3',
        ],
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: dataChart,
    plugins: [
      {
        beforeInit(chart: any) {
          const originalFit = chart.legend.fit;
          chart.legend.fit = function fit() {
            originalFit.bind(chart.legend)();
            this.height += 16;
          };
        },
      },
    ],
    options: {
      borderWidth: 0,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          display: true,
          align: 'middle',
          maxWidth: 100,
          labels: {
            boxWidth: 20,
            boxHeight: 20,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              family: 'Inter var',
            },
          },
        },
        title: {
          display: false,
          align: 'start',
          font: {
            family: 'Inter var',
            size: 22,
          },
          text: 'Platforms',
        },
      },
    },
  };

  function updateChart(platformData: number[]): void {
    if (!platformData || platformData.length !== 5) return;

    // Update dataChart with fetched data
    dataChart.datasets[0].data = platformData;

    const canvas = document.getElementById(idChart) as HTMLCanvasElement;
    if (!canvas) return;
    const chart = new Chart(canvas, config);
  }

  onMount(() => {
    GetPlatformDetails();
  });
</script>

<div class="h-full">
  <canvas
    class="max-h-[180px]"
    id={idChart}
  />
</div>
