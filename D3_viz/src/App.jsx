
import './App.css'
import Bar from './Bar.jsx'
import Scatter from './Scatter.jsx'

const App = () => {
  return <>
  <h1>D3 Visualization</h1>
  <hr></hr>
  <h2>U.S. GDP</h2>
  <Bar/>
  <hr></hr>
  <h2>Fastest Cycling Times (Alpe d'Huez)</h2>
  <Scatter/>
  <hr></hr>
  </>
}
export default App
