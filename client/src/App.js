import './App.css';
import React, {useState, useEffect} from 'react';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api')
    .then((res) => res.json())
    .then((data) => setData(data.msg))
  },[])

  return (
    <div className="App">
      {!data ? "No data": data}
    </div>
  );
}
export default App;
