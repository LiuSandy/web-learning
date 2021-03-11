import { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

function Repeat(props) {
  console.log(props)
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}

let myEvent = null
function App() {

  useEffect(() => {
    const cusEvent = new Event("pingan", { "bubbles": true, "cancelable": false });
    window.addEventListener("pingan", e => {
      console.log("->>", e)
    })
    myEvent = new CustomEvent("pingan", {
      detail: { name: "wangpingan" }
    });

    // 添加适当的事件监听器
    window.addEventListener("pingan", e => {
      console.log(e)
      window.dispatchEvent(cusEvent)
    });

  }, []);

  const fib = (n) => {
    let fiber = { arg: n, returnAddr: null, a: 0 };
    // 标记循环
    rec: while (true) {
      // 当展开完全后，开始计算
      if (fiber.arg <= 2) {
        let sum = 1;
        // 寻找父级
        while (fiber.returnAddr) {
          fiber = fiber.returnAddr;
          if (fiber.a === 0) {
            fiber.a = sum;
            fiber = { arg: fiber.arg - 2, returnAddr: fiber, a: 0 };
            continue rec;
          }
          sum += fiber.a;
        }
        return sum;
      } else {
        // 先展开
        fiber = { arg: fiber.arg - 1, returnAddr: fiber, a: 0 };
      }
    }
  }

  const fib1 = (n) => {
    if (n <= 2) {
      return 1;
    } else {
      return fib(n - 1) + fib(n - 2);
    }
  }

  const a = (p, s) => {

    const x = (3 * s - p) / 8
    return { x, y: p - x }

  }
  console.log(<ListOfTenThings />)
  return (
    <div className="App">
      <ListOfTenThings />
    </div>
  );
}

export default App;
