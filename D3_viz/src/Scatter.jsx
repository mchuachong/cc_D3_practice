import { useEffect, useRef } from "react";
import * as d3 from 'd3';

const dUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
const Scatter = () => {
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

  d3.json(dUrl).then(e=>{
    const x = d3
        .scalePoint()
        .domain(e.map(d=>d.Year).sort((a,b)=>b-a))
        .range([width,0])
    
    const y = d3
        .scalePoint()
        .domain(e.map(d=>d.Time))
        .range([0,height])

    svg.append("g")
        .call(d3.axisBottom(x))
        .attr("transform",`translate(0,${height})`)

    svg.append("g")
        .call(d3.axisLeft(y).tickFormat((d,i)=>{
            return i % 3 === 0 ? `${d}` : null
        })
        )

        svg.selectAll('circle')
        .data(e)
        .enter()
        .append("circle")
        .attr("r",5)
        .attr(`transform`,d=>`translate (${x(d.Year)},${y(d.Time)})`)
        .attr("fill", "orange")
      
  })
    


})


    return (<>
    <svg className="graph" width = {450} height = {400} id = "Scatter" ref = {ref}/></>
)
}

export default Scatter