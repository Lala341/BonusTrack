import React from 'react';
import * as d3 from 'd3';


export default class Arbol extends React.Component {

    state={
        t:undefined,
        x:undefined,
        y:undefined,
        iheight:undefined,
        circle:undefined,
        inputValue:undefined,
        inputValueName:undefined,
        tree:undefined,
        m:undefined,
        svg:undefined
    }
    updateInputValue(evt){
        this.setState({
          inputValue: evt.target.value
        });


    }
    updateInputValueName(evt){
        this.setState({
          inputValueName: evt.target.value
        });
    }
    componentDidMount() {
        const data  = [];
          
        this.drawChart(data);
    }
    
    drawChart(data2) {

        var data = {
            "name": "black",
            "value": 50,
            "children": [
              {
                "name": "blue",
                "value": 60,
                
                "children": [
                  {
                    "name": "black",
                    "value": 40
                  },
                  {
                    "name": "black",
                    "value": 70
                  }
                ]
              },
              {
                "name": "black",
                "value": 20
              }
            ]
          }
          
          
        const canvas = d3.select(this.refs.canvas);
        const width = 900;
        const height = 500;
        const margin = { top:100, left:50, bottom: 40, right: 10};
        
        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);
        
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
       
        
        var root = d3.hierarchy(data);
        
        var treeLayout = d3.tree();
        treeLayout.size([400, 200]);
        treeLayout(root);
                
        var i=0;

          var m=  g.selectAll('circle.node')
            .data(root.descendants())
            .enter()
            .append('circle')
            .attr("class", "node")
            .attr("ref", function() {i=++i; return "to"+i;})
            .attr("id", function() {i=++i; return "to"+i;})
            
            .attr('cx', function(d) {return d.x;})
            .attr('cy', function(d) {return d.y;})
            .attr('r', 15)
            .style("fill",function(d) {return (d.data.name);} );


            g.selectAll('line.link')
            .data(root.links())
            .enter()
            .append('line')
            .attr("class", "link")
            .attr("stroke","#000000")
            .attr("stroke-width", 2)
            .attr('x1', function(d) {return d.source.x;})
            .attr('y1', function(d) {return d.source.y;})
            .attr('x2', function(d) {return d.target.x;})
            .attr('y2', function(d) {return d.target.y;})
            ;



          this.setState({tree:treeLayout, m:m, t:data, svg:g});

       

      
           
    }
  
    start2(){

this.state.m.style("fill","red" );


    }
    
   
    render() {
            return (
                <div>
                
                <div ref="canvas">
    
                </div>
                
                <label>Valor</label>
                <input value={this.state.inputValue} onChange={(e)=>this.updateInputValue(e)}/>
                <button id="change" onClick={()=>this.start2()}>Añadir nodo</button>
                
                </div>
            );
        }
}