<script>
	import './barelystyled.css';
	import Chart from '$lib/components/Chart.svelte'


	let sales = [
  { date: "2023-04-30T12:00:00.00+00:00", value: 4 },
  { date: "2023-05-01T12:00:00.00+00:00", value: 6 },
  { date: "2023-05-02T12:00:00.00+00:00", value: 8 },
  { date: "2023-05-03T12:00:00.00+00:00", value: 7 },
  { date: "2023-05-04T12:00:00.00+00:00", value: 10 },
  { date: "2023-05-05T12:00:00.00+00:00", value: 12 },
  { date: "2023-05-06T12:00:00.00+00:00", value: 4 },
];
let data = sales.map((d) => ({ ...d, date: new Date(d.date) }));
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
<h1>Responsive Line Chart</h1>
<h2>The original writeup and example by Sam Selikoff at Build UI can be found <a href="https://buildui.com/recipes/responsive-line-chart">here</a>.</h2>
</section>
<div class="grid grid-cols-2 gap-x-4 gap-y-12 p-4">
  <div class="col-span-2 h-60">
    <Chart data={data} />
  </div>
  <div class="h-40 col-span-1">
    <Chart data={data} />
  </div>
  <div class="h-40 col-span-1">
    <Chart data={data} />
  </div>
</div>



