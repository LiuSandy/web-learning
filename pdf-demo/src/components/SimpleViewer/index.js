import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import './style.css'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const firstPageNumber = 1;
const devicePixelRatio = window.devicePixelRatio;
const step = 10

function HelloWorld() {
  return (
    <div className="hello">
      {[1, 2, 3, 4, 5].map(item => (
        <p key={item}>
          <span>{item}</span>
          <span>--</span>
          <span>{Math.random(0, 100000)}</span>
        </p>
      ))}
    </div>
  )
}
export default ({ url }) => {
  const [numPages, setNumPages] = useState([]);

  const [pdf, setPdf] = useState(null);
  const [scale, setScale] = useState(1);
  const container = useRef()
  const loopInfo = useRef({})

  const add = () => {
    const loopLen = loopInfo.current.loopCount === 1 ? loopInfo.current.loopLen : step
    // 创建虚拟节点
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < loopLen; i++) {
      const div = document.createElement('div');
      div.innerHTML = i + (loopInfo.current.countRender * loopLen)
      ReactDOM.render(<HelloWorld />, div)
      fragment.appendChild(div)
    }
    container.current.appendChild(fragment)
    loopInfo.current.countRender++
    loop()
  }

  const loop = () => {
    const { countRender = 0, loopCount = 0 } = loopInfo.current
    if (countRender < loopCount) {
      window.requestAnimationFrame(add)
    }
  }


  const getPageInfo = async (curPdf) => {
    const page = await curPdf.getPage(firstPageNumber);
    const viewport = page.getViewport({ scale: scale * devicePixelRatio });
    const width = viewport.width;
    const height = viewport.height;
    const array = []
    for (let index = 0; index < curPdf.numPages; index++) {
      array.push({ width, height })
    }
    if (array.length < step) {
      loopInfo.current = {
        countRender: 0,
        loopCount: 1,
        loopLen: array.length
      }
    } else {
      const loopCount = Math.ceil(array.length / step);
      loopInfo.current = {
        countRender: 0,
        loopCount,
      }
    }
    loop()
    setNumPages(array)

  }

  const getPages = async () => {
    const loadingTask = pdfjs.getDocument(url);
    const curPdf = await loadingTask.promise;
    await setPdf(curPdf);
    getPageInfo(curPdf);
  }

  useEffect(() => {
    getPages()
  }, []);


  return (
    <div id="container" ref={container}>
      {/* {numPages.map((item, index) => (
        <div key={index}>
          <HelloWorld />
        </div>
      ))} */}
    </div>
  )
}