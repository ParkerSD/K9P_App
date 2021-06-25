import logo from "./img/mantel logo.png";
import './App.css';
import Button from '@material-ui/core/Button';
import handleClick from './handleClick';
import {bleScan, callbackTx, callbackHeaderTx} from './ble';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import React, { Component } from 'react';
import puck from './puck';
import { makeStyles } from '@material-ui/core/styles';
import { save } from 'save-file';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));



const startByte = "A"; 
const stopByte = "B";



class App extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      dataBuffer: null,
    };
}

  saveFileCallback = () => {
    var file = this.state.dataBuffer;
    file = puck.data;
    console.log(file);
    if(file !== null){
      save(file, 'data.txt')
    }
  }


  startHandler = () => {
    var header = startByte;
    puck.write(header, null);
  }
  

  stopHandler = () => {
    this.saveFileCallback();
    var header = stopByte;
    puck.write(header, null);
  }

  render(){
    return (
      <div className="App">
        <header className="App-header"> 
          <h2>K9P App</h2>
           <p>
            <Button variant="outlined" color="primary" size="large" onClick={this.startHandler} 
              style={{
                position: 'relative',
                right: 10,
              }}> 
              Start 
            </Button>
        
            <Button variant="outlined" color="secondary" size="large" onClick={this.stopHandler}
                style={{
                position: 'relative',
                left: 10,
              }}> 
              Stop
            </Button>
          </p>
          <br/>

          <div style={{fontSize: 10}}>
            View Data Feed <br/> Right Click -> Inspect -> Console
          </div>
         

          <br/>
          <br/>
          <br/>
          <br/>
          
          
          <img src={logo} alt="Logo" width="30" height="20"/>
          <div style={{ fontSize: 15}}> 
            Mantel Technologies
          </div>
          
        </header>
      </div>
    );
  }
}
export default App;
