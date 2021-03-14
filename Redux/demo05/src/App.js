import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function Repeat(props) {
  console.log(props);
  const items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => (
        <div key={index}>
          This is item
          {' '}
          {index}
          {' '}
          in the list
        </div>
      )}
    </Repeat>
  );
}

let myEvent = null;
function App() {
  useEffect(() => {
    const cusEvent = new Event('pingan', { bubbles: true, cancelable: false });
    window.addEventListener('pingan', (e) => {
      console.log('->>', e);
    });
    myEvent = new CustomEvent('pingan', {
      detail: { name: 'wangpingan' },
    });

    // 添加适当的事件监听器
    window.addEventListener('pingan', (e) => {
      console.log(e);
      window.dispatchEvent(cusEvent);
    });
  }, []);

  console.log(<ListOfTenThings />);

  const def = 'A';

  return (
    <div className="App">
      <ListOfTenThings />
    </div>
  );
}

export default App;
