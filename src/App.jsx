import { useState } from 'react'


import './App.css'
import axios from 'axios';
import Trainline from './Trainline';

function App() {
  const [test, setTest] = useState();

  return (
    <>
    <Trainline/>
    <div className="App">
      <h1>요청결과 : {test}</h1>
      <button onClick={() => {
        axios.get('http://localhost:8888/test')
        .then((response) => {
          console.log(response);
          setTest(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
      }}>test요청</button>
          <button onClick={()=>{
        axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/test2`)
        .then((response)=>{
          console.log(response.data)
        })
	        .catch((error)=>{
          console.log(error)
        })
      }}>test요청2</button>
            <button onClick={()=>{
        axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/test3/7`, {
          "id": 'kkk',
          "pw": "1234",
          "age":30
          },{
            params : {
              // localhosst:8888?masg=hello 와 같음
              "msg":"hello Spring" 
            }
          }
        )
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) =>{
          console.log(error)
        })
      }}>서버로전송</button>
    </div>


    </>
  )
}

export default App
