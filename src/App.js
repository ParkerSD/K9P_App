import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import handleClick from './handleClick';
import {bleScan, callbackTx, callbackHeaderTx} from './ble';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { borders } from '@material-ui/system';
import { compose, spacing, palette } from '@material-ui/system';
import React, { Component } from 'react';
import puck from './puck';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
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
    save(file, 'data.txt')
    return; 
  }


  startHandler = () => {
    var header = startByte;
    puck.write(header, null);
  }
  
  stopHandler = async () => {

    this.saveFileCallback();

    var header = stopByte;
    puck.write(header, null);
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h2>K9 Phys App</h2>

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
        </header>
      </div>
    );
  }
}
export default App;
