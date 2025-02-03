import * as d3 from "d3";
import { useEffect, useRef } from "react";

const dUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const Heat = () => {
  const ref = useRef();

  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select(ref.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  useEffect(() => {
    d3.json(dUrl).then((e) => {
      const xData = new Set(e.monthlyVariance.map((d) => d.year));
      const yData = e.monthlyVariance.map((d) => d.variance);
      const zData = new Set(e.monthlyVariance.map((d) => d.month));
      const month = [
        // {"1":"Jan-"},
        // {"2":"Feb-"},
        // {"3":"Mar-"},
        // {"4":"Apr-"},
        // {"5":"May-"},
        // {"6":"Jun-"},
        // {"7":"Jul-"},
        // {"8":"Aug-"},
        // {"9":"Sep-"},
        // {"10":"Oct-"},
        // {"11":"Nov-"},
        // {"12":"Dec-"}
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
      const x = d3.scaleBand().range([0, width]).domain(xData).padding(0.1);

      const y = d3.scaleBand().range([0, height]).domain(zData).padding(0.1);

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
        .text((e) => month[e - 1]);

      const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateTurbo)
        .domain([2.8, 12.8]);

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
        .style("stroke-width", 0)
        .style("opacity", 0.8);
    });
  }, []);
  return <svg className="graph" ref={ref} width={450} height={400} />;
};

export default Heat;
