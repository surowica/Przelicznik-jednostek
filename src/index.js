import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRulerHorizontal, faWeightHanging, faComputer, faCube , faClock, faBolt} from '@fortawesome/free-solid-svg-icons'

const LenghtSigns = new Array(
  {sign:'mm', value: 0.001},
  {sign:'cm', value: 0.01},
  {sign:'m', value: 1},
  {sign:'km', value: 1000},
  {sign:'in', value: 0.0254},
  {sign:'mi', value: 1609},
  {sign:'ft', value: 0.305});


const WeightSigns = new Array(
    {sign:'mg', value: 0.000001},
    {sign:'g', value: 0.001},
    {sign:'dag', value: 0.01},
    {sign:'kg', value: 1},
    {sign:'t', value: 1000},
    {sign:'oz', value: 0.028},
    {sign:'lb', value: 0.454});


const ByteSigns = new Array(
    {sign:'b', value: 0.125},
    {sign:'B', value: 1},
    {sign:'KB', value: 1000},
    {sign:'MB', value: 1000000},
    {sign:'GB', value: 1000000000},
    {sign:'TB', value: 1000000000000});

const VolumeSigns = new Array(
    {sign:'l', value: 1},
    {sign:'ml', value: 0.001},
    {sign:'m3', value: 1000},
    {sign:'oz', value: 0.029},
    {sign:'qt', value: 0.946},
    {sign:'gal', value: 3.785});

const TimeSigns = new Array(
    {sign:'ms', value: 0.001},
    {sign:'s', value: 1},
    {sign:'min', value: 60},
    {sign:'h', value: 3600},
    {sign:'day', value:86400},
    {sign:'week', value: 604800});

const EnergySigns = new Array(
    {sign:'J', value: 1},
    {sign:'cal', value: 4.184},
    {sign:'kJ', value: 1000},
    {sign:'kcal', value:4184},
    {sign:'ft-lbs', value: 1.355});

class MainWindow extends React.Component
{
  

  constructor(props)
  {
    super(props);
    let array = new Array();
    array.push({id:1, icon: faRulerHorizontal},
    {id:2 , icon: faWeightHanging},
    {id:3 , icon: faComputer},
    {id:4 , icon: faCube},
    {id:5 , icon: faClock},
    {id:6 , icon: faBolt});
    this.state = {views: array, current: 1};
    this.setViev = this.setViev.bind(this);
  }


  setViev(e, id)
  {
    this.setState({current: id});
  }


  render()
  {
    let currentArray;
    switch (this.state.current) {
      case 1:
        currentArray = LenghtSigns;
        break;
      case 2:
        currentArray = WeightSigns;
        break;
      case 3:
        currentArray = ByteSigns;
        break;
      case 4:
        currentArray = VolumeSigns;
        break;
      case 5:
        currentArray = TimeSigns;
        break;
      case 6:
        currentArray = EnergySigns;
        break;
      
      default:
        break;
    }
    return(
      
      <div id='mainViev'>
        
        <div id='nav'>
          {
            this.state.views.map((elem, i)=>{
              return <button className={(elem.id == this.state.current)? 'navButtonActivated': 'navButton'} onClick={(e)=>this.setViev(e, elem.id)}><FontAwesomeIcon icon={elem.icon} /></button>
            }
            )
          }
        </div>
        <LenghtView array={currentArray}/>
          
      </div>
    )
  }
}

function LenghtView(params) {
  const [mark, setMark] = useState(0);
  const [markR, setMarkR] = useState(1);
  const [number, setNumber] = useState('');


  function SetNumber(e) {
    setNumber(e.target.value);
  }

  function SetMark(e, i) {
    setMark(i);
  }

  function SetMarkR(e, i) {
    setMarkR(i);
  }


  let outputFieldValue = number * params.array[mark].value / params.array[markR].value;

  return(
    <div id='view'>
      <div id='left'>
        <div id='viewNav'>
          {
            params.array.map((elem, i)=>{
              return <button className={(i == mark)? 'btnTargeted':''} onClick={(e)=>SetMark(e, i)}>{elem.sign}</button>
            }
            )
          }
        </div>
        <div id='inputField'>
          <input type='number' value={number} onChange={SetNumber}/>
          <span className='mark'>{params.array[mark].sign}</span>
        </div>
      </div>
      <div id='right'>
        <div id='viewNav'>
          {
            params.array.map((elem, i)=>{
              return <button className={(i == markR)? 'btnTargeted':''} onClick={(e)=>SetMarkR(e, i)}>{elem.sign}</button>
            }
            )
          }
        </div>
        <div id='outputField'>
          <span className='output'>{outputFieldValue}</span>
          <span className='mark'>{params.array[markR].sign}</span>
        </div>
      </div>
    </div>
  );
}


ReactDOM.render(
  <MainWindow/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
