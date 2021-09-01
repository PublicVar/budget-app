<script>
  import { Chart, registerables } from "chart.js";
  import { onMount } from "svelte";

  Chart.register(...registerables);

  export let labels = [];
  export let backgroundColor = [];
  export let data = [];
  export let label = "Title";

  $: chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor,
        hoverOffset: 4,
      },
    ],
  };

  let chart = null;

  onMount(() => {
    const ctx = document.getElementById("pieChart");
    chart = new Chart(ctx, {
      type: "pie",
      data: chartData,
    });
  });

  $: if (data && chart) {
    chart.data = chartData;
    chart.update();
  }
</script>

<canvas id="pieChart" width="400" height="400" />
