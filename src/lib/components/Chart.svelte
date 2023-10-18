<script>
	import * as d3 from "d3";
  import { format } from "date-fns";
	import { get_style_string } from "$lib/utils";
	
	export let data;

	let xScale = d3
    .scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, 100]);
  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.value)) ?? 0])
    .range([100, 0]);

  let line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  let d = line(data);
</script>


<div
      class="@container relative h-full w-full"
      style={
        get_style_string({
          "--marginTop": "6px",
          "--marginRight": "8px",
          "--marginBottom": "25px",
          "--marginLeft": "25px",
        })
      }
>
      <!-- X axis -->
      <svg
        class="absolute inset-0
          h-[calc(100%-var(--marginTop))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
				{#each data as day, i}
        
          <g key={i} class="overflow-visible font-medium text-gray-500">
            <text
              x={`${xScale(day.date)}%`}
              y="100%"
              text-anchor={
                i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
              }
              fill="currentColor"
              class="@sm:inline hidden text-sm"
            >
              {format(day.date, "EEE")}
            </text>
            <text
              x={`${xScale(day.date)}%`}
              y="100%"
              text-anchor={
                i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
              }
              fill="currentColor"
              class="@sm:hidden text-xs"
            >
              {format(day.date, "EEEEE")}
            </text>
          </g>
        
				{/each}
      </svg>

      <!-- Y axis -->
      <svg
        class="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <g class="translate-x-4">
          {#each (
            yScale
            .ticks(8)
            .map(yScale.tickFormat(8, "d"))
          ) as value, i}
          
            <text
              key={i}
              y={`${yScale(+value)}%`}
              alignment-baseline="middle"
              text-anchor="end"
              class="text-xs tabular-nums text-gray-600"
              fill="currentColor"
            >
              {value}
            </text>
          {/each}
        </g>
      </svg>

      <!-- Chart area -->
      <svg
        class="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <svg
          viewBox="0 0 100 100"
          class="overflow-visible"
          preserveAspectRatio="none"
        >
          <!-- Grid lines -->
          {#each (
          yScale
          .ticks(8)
          .map(yScale.tickFormat(8, "d"))
          ) as active, i}
            
              <g
                transform={`translate(0,${yScale(+active)})`}
                class="text-gray-700"
                key={i}
              >
                <line
                  x1={0}
                  x2={100}
                  stroke="currentColor"
                  stroke-dasharray="6,5"
                  stroke-width={0.5}
                  vector-effect="non-scaling-stroke"
                />
              </g>
          {/each}

          <!-- Line -->
          <path
            d={d}
            fill="none"
            class="text-gray-600"
            stroke="currentColor"
            stroke-width="2"
            vector-effect="non-scaling-stroke"
          />

          <!-- Circles -->
          {#each data as d}
            <path
              key={d.date.toString()}
              d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
              vector-effect="non-scaling-stroke"
              stroke-width="8"
              stroke-linecap="round"
              fill="none"
              stroke="currentColor"
              class="text-gray-400"
            />
          {/each}
        </svg>
      </svg>
	

	
</div>
