import React from 'react';
import * as d3 from 'd3';


export default class Char extends React.Component {

    state={
        t:undefined,
        x:undefined,
        y:undefined,
        iheight:undefined,
        circle:undefined,
        inputValue:undefined
    }
    updateInputValue(evt){
        this.setState({
          inputValue: evt.target.value
        });
    }
    componentDidMount() {
        const data = [
            { name: "Medellín", w2005: 3, w2006: 33 },
            { name: "Cali", w2005: 39, w2006: 45 },
            { name: "Bogotá", w2005: 7, w2006: 31 },
            { name: "Pereira", w2005: 35, w2006: 36 },
            { name: "Bucaramanga", w2005: 16, w2006: 23 },
            { name: "Cúcuta", w2005: 45, w2006: 45 },
            { name: "Armenia", w2005: 6, w2006: 16 }
        ];
        this.drawChart(data);
    }
    
    drawChart(data) {
        const canvas = d3.select(this.refs.canvas);



        const width = 700;
        const height = 500;
        const margin = { top:10, left:50, bottom: 40, right: 10};
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top -margin.bottom;
        
        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);
        
        
         const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
                const y = d3.scaleLinear() 
                .domain([0, 30])
                .range([iheight, 0]);
            
            const x = d3.scaleBand()
            .domain(data.map(d => d.name) ) 
            .range([0, iwidth])
            .padding(0.1);  
        
        const bars = g.selectAll("rect").data(data);
        
        const bar= bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.w2005))
        .attr("height", d => iheight - y(d.w2005))
        .attr("width", x.bandwidth())
        
        
        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  
        
        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));



        const svg2 = d3.select(this.refs.canvas2).append("svg")
    .attr("width", 400)
    .attr("height", 200)
    .style("border-color", "black")
    .style("border-style", "solid")
    .style("border-width", "1px");

        const circle = svg2.append("circle")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 50);

        
        this.setState({t:bar, y:y, x:x,iheight:iheight,circle:circle}); 
            
           
    }
    start(){
        this.state.t.transition()
        .attr("class", "bar")
        .style("fill", "red")
    .attr("x", d => this.state.x(d.name))
    .attr("y", d => this.state.y(d.w2006))
    .attr("height", d => this.state.iheight - this.state.y(d.w2006))
    .attr("width", this.state.x.bandwidth());
        
    }
    start2(){
        this.state.t.transition()
        .attr("class", "bar")
        .style("fill", "red")
    .attr("x", d => this.state.x(d.name))
    .attr("y", d => this.state.y(this.state.inputValue))
    .attr("height", d => this.state.iheight - this.state.y(d.w2006))
    .attr("width", this.state.x.bandwidth());
        
    }
    reset(){
        this.state.t.transition()
        .attr("class", "bar")
        .style("fill", "steelblue")
    .attr("x", d => this.state.x(d.name))
    .attr("y", d => this.state.y(d.w2005))
    .attr("height", d => this.state.iheight - this.state.y(d.w2006))
.attr("width", this.state.x.bandwidth());
    }
    startcircle(){
this.state.circle
        .transition()
        .attr("cx", 250)
        .attr("r", 100) 
        .style("fill", "blue")
        .attr("opacity",0.5);
    }
    resetcircle(){
        this.state.circle
        .transition()
        .attr("cx", 50)
        .attr("r", 50)
        .style("fill", "black")
        .attr("opacity",1);
    }
    render() {
            return (
                <div>
                    <button id="start2" onClick={()=>this.startcircle()}>Start</button>
                <button id="reset2" onClick={()=>this.resetcircle()}>Reset</button>
                <div ref="canvas2">
    
                </div>
                
                
                
                <button id="start" onClick={()=>this.start()}>Start</button>
                <button id="reset" onClick={()=>this.reset()}>Reset</button>
               
                <div ref="canvas">
    
                </div>
                <div>
                
                </div>
                <button id="change" onClick={()=>this.start2()}>Start2</button>
                <input value={this.state.inputValue} onChange={(e)=>this.updateInputValue(e)}/>
               
                </div>
            );
        }
}