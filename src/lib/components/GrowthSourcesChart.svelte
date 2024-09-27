<script lang="ts">
    import { onMount } from "svelte";
    import Chart from 'chart.js/auto'; 

    let idChart = "growthSourcesChart";
    const dataChart = {
        labels: ["Organic", "Campaign"],
        datasets: [{ 
            data: [Math.random()*500, Math.random()*500],
            label: "Organic",
            backgroundColor: ["#9FB8DE", "#0D64E8"],
        }]
    };

    const config = {
        type: 'doughnut',
        data: dataChart,
        plugins:[{
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
            }
        }],
        options: {
            borderWidth:0,
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
                display:true,
                align:"start",
                labels:{
                    boxWidth:16,
                    boxHeight:16,
                    useBorderRadius:true,
                    borderRadius:8,
                    font:{
                        family:"Inter var",
                    },
                }
            },
            title: {
                display: true,
                align: 'start',
                font:{
                    family:"Inter var",
                    size:22,
                },
                text: 'Growth Source'
            }
            }
        },
    };

    onMount(()=>{
        const canvas = document.getElementById(idChart) as HTMLCanvasElement;
        if(!canvas) return;
        const chart = new Chart(canvas, config);
    })
</script>

<canvas id="{idChart}"></canvas>