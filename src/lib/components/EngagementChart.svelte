<script lang="ts">
    import {onMount} from "svelte";
    import Chart from 'chart.js/auto';
    let title = "Engagement overview";
    let idChart = "engagementChart";

    export let dataChart:any;

    function generateRandomData(){
        let data = [];
        for(let i = 0; i < 7; i++){
            data.push(Math.random()*1000);
        }
	    return data;
    }

    function getFakeEngagementsChartData() {
        const dataChart = {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                data: generateRandomData(),
                label: "This week",
                borderColor: "#0D64E8",
                backgroundColor: "#0D64E8",
                borderRadius:4,
                fill: true
            },
            {
                data: generateRandomData(),
                label: "Previous week",
                borderColor: "#9FB8DE",
                backgroundColor: "#9FB8DE",
                borderRadius:4,

                fill: true
        }]
    };

	// fake a call to the database by setting a timeout of 3sec
	return new Promise((resolve, reject) => {
	  setTimeout(() => {
		resolve(dataChart);
	  }, 3000);
	});
}

    onMount(async ()=>{
        const canvas = document.getElementById(idChart) as HTMLCanvasElement;
        if(!canvas) return;
        const chart = new Chart(canvas, {
            type: 'bar',
            data:dataChart,
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
                scales:{
                    x:{
                        grid:{
                            display:true
                        },
                    },
                    y:{
                        grid:{
                            display:true,
                        },
                        ticks:{
                            stepSize:200,
                            callback:function(value, index, ticks){
                                return Math.round(value);
                            }
                        }
                    }
                },
                responsive:true,
                maintainAspectRatio:false,
                plugins:{
                    legend:{
                        display:true,
                        align:"start",
                        labels:{
                            boxWidth:16,
                            boxHeight:16,
                            useBorderRadius:true,
                            borderRadius:8,
                            font:{
                                family:"Inter var",
                            }
                        }
                    },
                    title:{
                        align:"start",
                        font:{
                            family:"Inter var",
                            size:22,
                        },
                        display:true,
                        text:title
                    }
                },
            }
        });
    });
</script>

<canvas id="{idChart}"></canvas>

