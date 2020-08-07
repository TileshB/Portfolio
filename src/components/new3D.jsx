import React, { Component, Suspense, useRef  } from "react";
import * as THREE from 'three'
import { Canvas, Dom, extend, useLoader, useThree, useFrame } from 'react-three-fiber'
import Model from "./newDuck"
import "./new3D.scss";
// 2.86, 5.57
class New3D extends Component {
    state = {multi: 300, rotx:2.54, roty:0.27, rotz:0, l1x:0, l1y:0, l1z:0, l2x:0, l2y:0, l2z:0, l3x:0, l3y:0, l3z:0
    }

    constructor(props) {
        super(props);
    
    
      }

    updateX = (e) =>{
        this.setState({
            rotx: e
        })
    }
    updateY = (e) =>{
        this.setState({
            roty: e
        })
    }
    updateZ = (e) =>{
        this.setState({
            rotz: e
        })
    }

    updatel1X = (e) =>{
        this.setState({
            l1x: e
        })
    }
    updatel1Y = (e) =>{
        this.setState({
            l1y: e
        })
    }
    updatel1Z = (e) =>{
        this.setState({
            l1z: e
        })
    }

    updatel2X = (e) =>{
        this.setState({
            l2x: e
        })
    }
    updatel2Y = (e) =>{
        this.setState({
            l2y: e
        })
    }
    updatel2Z = (e) =>{
        this.setState({
            l2z: e
        })
    }

    updatel3X = (e) =>{
        this.setState({
            l3x: e
        })
    }
    updatel3Y = (e) =>{
        this.setState({
            l3y: e
        })
    }
    updatel3Z = (e) =>{
        this.setState({
            l3z: e
        })
    }

    animate(){
        // rotx:0.29, roty:2.86
        // //console.log("running")
        if (this.state.roty !== this.props.mouseX * -1) {
            var tempVar =
              this.state.roty +
              (this.props.mouseX * -1 - this.state.roty) * 0.01;
            if (tempVar > -0.5 && tempVar < 0.5) {
              tempVar = this.state.roty +=
                (this.props.mouseX * -1 - this.state.roty) * 0.01;
              // //console.log("Y: " + this.state.roty);
            }
            this.setState({
              roty: tempVar
            })
          }
        //   if (this.state.rotx > 0 && this.state.rotx < 5) {
        //     var tempVar =
        //       this.state.rotx +
        //       (this.props.mouseY * -1 - this.state.roty) * 0.001;
        //     if (tempVar > 2 && tempVar < 3) {
        //       tempVar = this.state.rotx +=
        //         (this.props.mouseY * -1 - this.state.roty) * 0.001;
        //       // //console.log("X: " + this.state.rotx);
        //     }
        //     this.setState({
        //         rotx: tempVar
        //       })
        //   }
        // if(this.state.rotY > -0.5 && this.staterotY < 0.5 ){
        //     if(this.props.mouseX >0){
        //         var tempVar = this.state.roty + (0.5 - this.state.roty)/100;
        //         this.setState({
        //         roty: tempVar
        //         })
        //     }else{
        //         var tempVar = this.state.roty + (-0.5 - this.state.roty)/100;
        //         this.setState({
        //         roty: tempVar
        //         })
        //     }
        // }
    }


    componentDidMount(){
        let x =setInterval(() => {this.animate()}, 10)
    }

    componentDidUpdate(prevProps){
        if(prevProps.open != this.props.open){
            if(this.props.open == "open"){
                this.setState({
                    multi: 150
                })
            }else{
                this.setState({
                    multi: 300
                })
            }
        }
    }
    
    render() { 
        return (
            <div className={`object ${this.props.open} mobi`}>
                {/* <input type="number" name="" id="" step="0.01" onChange={(e) => this.updatel1X(e.target.value)}/>
                <input type="number" name="" id="" step="0.01" onChange={(e) => this.updatel1Y(e.target.value)}/>
                <input type="number" name="" id="" step="0.01" onChange={(e) => this.updatel1Z(e.target.value)}/>
                <br/>
                <input type="number" name="" id="" step="0.01" onChange={(e) => this.updatel2X(e.target.value)}/>
                <input type="number" name="" id="" step="0.01" onChange={(e) => this.updatel2Y(e.target.value)}/>
                <input type="number" name="" id="" step="0.01" onChange={(e) => this.updatel2Z(e.target.value)}/>
                <br/>
                <input type="number" name="" id="" step="0.01" onChange={(e) => this.updatel3X(e.target.value)}/>
                <input type="number" name="" id="" step="0.01" onChange={(e) => this.updatel3Y(e.target.value)}/>
        <input type="number" name="" id="" step="0.01" onChange={(e) => this.updatel3Z(e.target.value)}/> */}
                
                {/* <input type="number" name="" id="" step="0.01" onChange={(e) => this.updateX(e.target.value)}/>
                <input type="number" name="" id="" step="0.01" onChange={(e) => this.updateY(e.target.value)}/>
                <input type="number" name="" id="" step="0.01" onChange={(e) => this.updateZ(e.target.value)}/> */}
                <Canvas
            className="canvas"
            concurrent
            gl={{ alpha: true }}
            camera={{ position: [75, 100,0.1,], fov: 70 }}
            onCreated={({ gl, camera }) => {
              camera.lookAt(0, 0, 0)
            //   gl.setClearColor('rgb(226, 149, 135)')
              gl.toneMapping = THREE.Uncharted2ToneMapping
            }}>
            <ambientLight />
            {/* l1: -20, 20, 100 l2: 20, 20, 100 l3: -20, 0, -100 */}
            {/* l1: -20, 50, 0 l2: -20, -50, 100 l3: -20, 0, -100 */}
            {/* <pointLight position={[this.state.l1x, this.state.l1y, this.state.l1z]} intensity={0.8} />
            <pointLight position={[this.state.l2x, this.state.l2y, this.state.l2z]} intensity={0.19}/>
            <pointLight position={[this.state.l3x, this.state.l3y, this.state.l3z]} intensity={0.5}/> */}
            <pointLight position={[-20, 50, 0]} intensity={0.8} />
            <pointLight position={[-20, -50, 100]} intensity={0.19}/>
            <pointLight position={[-20, 0, -100]} intensity={0.5}/>
            <Suspense fallback={<Dom center>loading ...</Dom>}>
                <Model multi={this.state.multi} mouseX={this.props.mouseX} mouseY={this.props.mouseY} coordx={this.state.rotx} coordy={this.state.roty} coordz={this.state.rotz} />
            </Suspense>
            </Canvas></div> );
    }
}
 
export default New3D;