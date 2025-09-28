import './App.css'
import useCounterStore from './store/useCounterStore'


function App() {
  
  const {count,increase, decrease} = useCounterStore();

  return (
    <>
    <h1>counts : {count}</h1>
    <button onClick={increase}>+1</button>
    <button onClick={decrease}>-1</button>
    newbutton
    </>
  )
}

export default App
