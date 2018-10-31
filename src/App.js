import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.image = new Image();
    this.image.src =  "/assets/images/ship.png";
    const width = 100;
    const height = 110;

    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
      map : {
        37 : false,
        38 : false,
        39 : false,
        40 : false,
        32 : false
      },
      player : {
        width: width,
        height :height,
        x : window.innerWidth / 2 - width / 2,
        y : window.innerHeight  - ( height + 10),
        power : 10
      }
    };

    document.addEventListener("keydown", this._handleKeydownEvents, false);
    document.addEventListener("keyup", this._handleKeyupEvents, false);
  }

  _handleKeyupEvents = (event) => {
    if( event.keyCode in this.state.map) {
      let map = {...this.state.map}
      map[event.keyCode]  = false;
      this.setState({map},() => {});
    }
  }

  _handleKeydownEvents = (event) =>{
    let step = 10;
    if( event.keyCode in this.state.map) {
      let map = {...this.state.map};
      map[event.keyCode]  = true;

      this.setState({map}, () => {
        let player = {...this.state.player};
        switch(event.keyCode){
          case 37:
            player.x += -step;
            this.setState({player},()=> { });
            break;
          case 38:
            player.y += -step;
            this.setState({player},()=> { });
            break;
          case 39:
            player.x += step;
            this.setState({player},()=> { });
            break;
          case 40:
            player.y += step;
            this.setState({player},()=> { });
            break;
          case 32:
            console.log("spacebar");
            break;
          default:
            break;
        }
      });
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    canvas.height = this.state.height;
    canvas.width = this.state.width;
    this.setState({
      context: canvas.getContext("2d")
    },()=>{
      this.animate();
    }); 
  }

  drawPlayer=()=>{
    this.state.context.drawImage( 
      this.image,
      this.state.player.x, 
      this.state.player.y,
      this.state.player.width,
      this.state.player.height, 
    ); 
  }

  animate = () => {
    requestAnimationFrame( this.animate );
    this.state.context.clearRect(0,0, this.state.width, this.state.height);
    this.drawPlayer();
  }

  render() {
    const style = {
      background:'#000'
    }
    return (
      <div className="App">
        <canvas ref="canvas" style={style} />
      </div>
    );
  }
}

export default App;
