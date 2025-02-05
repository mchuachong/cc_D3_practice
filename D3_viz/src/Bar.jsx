import * as d3 from "d3"
import { useState , useRef, useEffect } from "react"
const DataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"


const Bar = () => {

    const ref = useRef()
useEffect(()=>{
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 550 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // const tooltip = d3
    //     .select("body")
    //     .append("div")
    //     .attr("class")

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
            .attr("fill", "orange")
            .attr("class","bar")

       const tooltip =  d3.select("#tooltip")
    
        const vH = document.documentElement.clientHeight;
        const vW = document.documentElement.clientWidth;

       const onMouseEnter = (event,data) => {
        const [px,py] = d3.pointer(event)
        tooltip.select("#tooltipName")
            .text(`$${String(data[1]).slice(0,-5)},${String(data[1]).slice(-5)} Billion`)
        tooltip.select("#tooltipVal")
            .text(data[0])
        tooltip.style(`left`,`${px+160}px`)
        tooltip.style(`top`,`${py-20}px`)
        tooltip.style("opacity",1)
      
      
    }
    
    const onMouseLeave = (event,data) => {
        tooltip.style("opacity",0)
    }
    
    
        d3.selectAll("rect")
            .on("mouseenter",onMouseEnter)
            .on("mouseleave",onMouseLeave)

  


    })
    


    })
    return (     <><div class="xdiv">
           <div id="tooltip" className="tooltip">
                <div className="tooltipBox">
                    <span id="tooltipName"></span>
                </div>
            <div className="tooltipText">
                    <span id="tooltipVal"></span>
                </div>
            </div></div>
        <svg className="graph" width = {550} height = {400} id="Bar" ref = {ref}/>
        </>)
}

export default Bar