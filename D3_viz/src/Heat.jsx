import * as d3 from "d3";
import { useEffect, useRef } from "react";

const dUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const Heat = () => {
  const ref = useRef();





  useEffect(() => {

    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    const svg = d3
    .select(ref.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
    d3.json(dUrl).then((e) => {

      const monthTxt = [

        "Jan-",
        "Feb-",
        "Mar-",
        "Apr-",
        "May-",
        "Jun-",
        "Jul-",
        "Aug-",
        "Sep-",
        "Oct-",
        "Nov-",
        "Dec-",
      ];

      const monthFull =["January","February","March",]
      const x = d3.scaleBand().range([0, width]).domain(e.monthlyVariance.map((d) => d.year)).padding(0.1);

      const y = d3.scaleBand().range([0, height]).domain(e.monthlyVariance.map((d) => d.month)).padding(0.1);

      svg
        .append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3
            .axisBottom(x)
            .tickSize(0)
            .tickFormat((d, i) => (i % 29 === 0 ? d : null))
        )
        .selectAll("text")
        .attr("transform", "translate(-10,10)rotate(-45)")
        .style("anchor-text", "end");

      svg
        .append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .selectAll("text")
        .text((e) => monthTxt[e - 1]);

      const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateTurbo)
        .domain([1.5, 12]);

      svg
        .selectAll()
        .data(e.monthlyVariance)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.year))
        .attr("y", (d) => y(d.month))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", (d) => colorScale(8.66 + d.variance))
        .style("stroke-width", .5)
        .style("opacity", 0.8)
        .attr("class","heatc")
   
    
    const tooltip = d3.select("#tooltip2")

    const vW = document.documentElement.clientWidth
    const vH = document.documentElement.clientHeight

    const handleOnEnter = (e,data) => {
      const [px,py] = d3.pointer(e)
      tooltip.style("opacity",1)
      tooltip.select("#tooltipTxt2")
        .text(`${monthTxt[data.month-1]}${data.year}`)
      tooltip.select("#tooltipVal2")
      .text(`${(data.variance+8.66).toPrecision(3)}°C`)
      tooltip.style("left",`${px+80}px`)
      tooltip.style("top",`${py-30}px`)
      
      
    }

    const handleOnExit = () =>{
      tooltip.style("opacity",0)

    }

    d3.select("#heatm").selectAll("rect")
        .on("mouseenter",handleOnEnter)
        .on("mouseleave",handleOnExit)

    });
  });

  return (<><div class="xdiv">
  <div id="tooltip2" class="tooltip2">
    <div><span id="tooltipTxt2">test</span></div>
    <div><span id="tooltipVal2">test</span></div>
  </div></div>
  <svg id="heatm" className="graph" ref={ref} width={700} height={400}/>
  
   </>) 
};

export default Heat;
