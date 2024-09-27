<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { GetLocationInsights } from '$lib/services/NewFacebook/Insights_service';
  import { createEventDispatcher } from 'svelte';
  let highestEngagementLocation: string | null = null;
  const dispatch = createEventDispatcher();
  async function GetLocationDetails(): Promise<void> {
    try {
      const response = await GetLocationInsights();
      console.log('response location  data', response);
      const locationData = processData(response);
      console.log('location  data', locationData);
      highestEngagementLocation = findHighestEngagementLocation(response);
      console.log('check location display+++', highestEngagementLocation);
      dispatch('highestLocationUpdate', highestEngagementLocation);
      updateChart(locationData);
    } catch (error) {
      console.error('Error fetching locationData:', error);
    }
  }

  function processData(data: any): {
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  } {
    let NewYork = 0;
    let LosAngeles = 0;
    let SanFrancisco = 0;
    let Chicago = 0;
    let Other = 0;

    data.forEach((entry: any) => {
      switch (entry.region) {
        case 'New York':
          NewYork++;
          break;
        case 'Los Angeles':
          LosAngeles++;
          break;
        case 'San Francisco':
          SanFrancisco++;
          break;
        case 'Chicago':
          Chicago++;
          break;
        default:
          Other++;
      }
    });

    return {
      labels: ['New York', 'Los Angeles', 'San Francisco', 'Chicago', 'Other'],
      datasets: [
        {
          data: [NewYork, LosAngeles, SanFrancisco, Chicago, Other],
          backgroundColor: [
            '#589AFF',
            '#0D64E8',
            '#0024A4',
            '#273668',
            '#5E7BB3',
            '#9FB8DE',
          ],
        },
      ],
    };
  }

  function findHighestEngagementLocation(data: any): string | null {
    const engagementCounts = data.reduce((acc: any, entry: any) => {
      acc[entry.region] = (acc[entry.region] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(engagementCounts).reduce(
      (max: string | null, location: string) => {
        return engagementCounts[location] > (engagementCounts[max || ''] || 0)
          ? location
          : max;
      },
      null
    );
  }

  function updateChart(locationData: {
    labels: string[];
    datasets: { data: number[] }[];
  }): void {
    const canvas = document.getElementById(idChart) as HTMLCanvasElement;
    if (!canvas) return;

    const config = {
      type: 'doughnut',
      data: locationData,
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
              font: {
                family: 'Inter var',
              },
              boxWidth: 20,
              boxHeight: 20,
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          title: {
            display: false,
            align: 'start',
            font: {
              family: 'Inter var',
              size: 22,
            },
            text: 'Locations',
          },
        },
      },
    };

    new Chart(canvas, config);
  }

  let idChart = 'cityChart';

  onMount(() => {
    GetLocationDetails();
  });
</script>

<div class="h-full">
  <canvas
    class="max-h-[180px]"
    id={idChart}
  />
</div>
