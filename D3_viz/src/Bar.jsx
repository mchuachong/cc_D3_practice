import * as d3 from "d3"
import { useState , useRef, useEffect } from "react"
const DataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
const Bar = () => {

    const ref = useRef()
useEffect(()=>{
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
    d3.json(DataUrl)
    .then(e=>{

        const x = d3
                .scaleBand()
                .range([0,width])
                .domain(e.data.map(d=>(d[0].slice(0,4))))
                .padding(0.2)
        
        const y = d3
                .scaleLinear()
                .domain([0,20000])
                .range([height,0])
        svg.append('g').call(d3.axisLeft(y)).attr("fill","orange")

        svg.append("g")
            .attr("transform",`translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat((d,i)=>{
                return i % 4 === 0 ? d : null
            }))
            .selectAll("text")
            .attr("transform","translate(-10,0)rotate(-45)")
            .style("text-anchor","end")
           
            svg
            .selectAll("mybar")
            .data(e.data)
            .join("rect")
            .attr("x", (d) => x(d[0].slice(0,4)))
            .attr("y", (d) => y(d[1]))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d[1]))
            .attr("fill", "orange");

    }
    )})
    return (
        <svg className="graph" width = {450} height = {400} id="Bar" ref = {ref}/>
    )
}

export default Bar