import React, { useRef, useEffect, useState } from 'react'
import { useKeyPress } from '@umijs/hooks';
import { PDFLinkService, PDFFindController, PDFViewer, DownloadManager, EventBus, AnnotationLayerBuilder } from 'pdfjs-dist/web/pdf_viewer';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import 'pdfjs-dist/web/pdf_viewer.css';
import './style.css'

const pdfjs = require('pdfjs-dist')

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


// 显示文字类型 0 不显示 1 显示 2 启用增强
const TEXT_LAYER_MODE = 1;
// 是否通过CSS控制放大缩小 true false
const USE_ONLY_CSS_ZOOM = true

const Index = props => {
    const containerRef = useRef(null);

    const [viewer = {}, setViewer] = useState({});
    const [currentPageNumber = 1, setCurrentPageNumber] = useState(1);
    const [numPages = 1, setNumPages] = useState(1);
    const [pageData = 1, setPageData] = useState([]);
    const [scale = 1, setScale] = useState("auto");
    const [searcher = {}, setSearcher] = useState({
        source:window,
        phraseSearch: true,
        type:'findagain',
        query: '',
        findPrevious: true,
        highlightAll: true,
    });
    const [pdfDom = 1, setPdfDom] = useState(null);
    const [matchesCount = {}, setMatchesCount] = useState({});

    const eventBus = useRef(null)

    const changePage = (num) => {
        viewer.currentPageNumber = num
        setCurrentPageNumber(num)
    }

    // 渲染页面
    const initialViewer = (url) => {
        eventBus.current = new EventBus();
        const linkService = new PDFLinkService({
            eventBus:eventBus.current,
        });
        const findController = new PDFFindController({
            eventBus:eventBus.current,
            linkService
        })
        const newViewer = new PDFViewer({
            container: containerRef.current,
            linkService,
            eventBus:eventBus.current,
            useOnlyCssZoom: USE_ONLY_CSS_ZOOM,
            textLayerMode: TEXT_LAYER_MODE,
            // renderer:'svg',
            findController,
            renderInteractiveForms:true,
            enableWebGL: true
        });
        linkService.setViewer(newViewer);
        // 设置初始缩放
        newViewer.currentScaleValue = scale;

        const loadingTask = pdfjs.getDocument({ url });
        loadingTask.promise.then(pdf => {
            if (pdf) {
                const nums = pdf.numPages
                setNumPages(nums)
                newViewer.setDocument(pdf);
                linkService.setDocument(pdf);
                setViewer(newViewer)
                console.log("--->",newViewer);
                // 判断是否已经渲染完毕
                const interval = setInterval(() => { loadPdf() }, 1000);
                function loadPdf() {
                    if (newViewer.pageViewsReady) {
                        const dom = document.querySelector("div[data-page-number='1']")
                        const div = document.createElement("div");
                        div.setAttribute("style","position:absolute;width:auto;height:100%;background:red;opacity:0.2;top:0;left:0;right:0;bottom:0;")
                    
                        dom.appendChild(div)
                        console.log(dom.style);
                        // // 暂时没有用到
                        const pdfDom = document.getElementById('innerContainer')
                        const pageData = []
                        pdfDom.childNodes.forEach((item, index) => {
                            pageData.push({
                                div: item,
                                id: index
                            })
                        })
                        clearInterval(interval);
                        setPageData(pageData)
                        setPdfDom(pdfDom)
                    }
                }
            }
        })
    }

    const { url } = props

    useEffect(() => {
        if (url) {
            initialViewer(url)
        }
        // 监听事件
        document.addEventListener('pagechanging', function (evt) {
            const page = evt.detail.pageNumber;
            changePage(page)
        })
    }, [url])

    useKeyPress('enter', event => {
        viewer.findController.executeCommand('findagain',searcher)
    });

    useEffect(() => {
        eventBus.current.on('updatefindcontrolstate',e=>{
            setMatchesCount(e.matchesCount);
        })
        eventBus.current.on('updatefindmatchescount',e=>{
            setMatchesCount(e.matchesCount);
        })
        return ()=>{
            eventBus.current.off('updatefindcontrolstate');
            eventBus.current.off('updatefindcontrolstate');
        }
        // window.addEventListener('updatefindcontrolstate', e => {
        //     setMatchesCount(e.detail.matchesCount);
        // });
        // window.addEventListener('updatefindmatchescount', e => {
        //     setMatchesCount(e.detail.matchesCount);
        // })
    })


    const getPageStyle = (div) => {
        const demo = window.getComputedStyle(div, null);
        let divStyles = {}
        Object.keys(demo).forEach(key => {

            if (`${key}` !== '0' && !parseInt(key) && demo[key]) {
                divStyles = {
                    ...divStyles,
                    [`${key}`]: demo[key]
                }
            }
        })
        return divStyles
    }

    return (
        <div className="viewer">
            <div className="toolBus">
                <div className='pagination'>
                    <button
                        className="toolbarButton pageUp"
                        title="Previous Page"
                        id="previous"
                        onClick={() => {
                            const newCurrentPageNumber = currentPageNumber - 1
                            changePage(newCurrentPageNumber)

                        }}
                        disabled={currentPageNumber === 1}
                    >
                        Previous Page
                    </button>
                    <input
                        type="number"
                        id="pageNumber"
                        value={currentPageNumber}
                        onChange={e => {
                            const val = parseInt(e.target.value)
                            if (val >= 1 && val <= numPages) {
                                changePage(val)
                            }
                        }}
                    />
                    / {numPages}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        className="toolbarButton pageDown"
                        title="Next Page"
                        id="next"
                        onClick={() => {
                            const newCurrentPageNumber = currentPageNumber + 1
                            changePage(newCurrentPageNumber)
                        }}
                        disabled={currentPageNumber === numPages}
                    >
                        Next Page
                    </button>
                </div>
                <div className="selection">
                    <select
                        value={`${scale}`}
                        onChange={e => {
                            const newScale = e.target.value
                            viewer.currentScaleValue = newScale;
                            setScale(newScale)
                        }}
                    >
                        <option value="auto">自动缩放</option>
                        <option value="page-actual">实际大小</option>
                        <option value="page-fit">适合页面</option>
                        <option value="page-width">适合页宽</option>
                        <option value="0.50">50%</option>
                        <option value="0.75">75%</option>
                        <option value="1">100%</option>
                        <option value="1.25">125%</option>
                        <option value="1.50">150%</option>
                        <option value="1.75">175%</option>
                        <option value="2">200%</option>
                        <option value="3">300%</option>
                        <option value="4">400%</option>
                    </select>
                </div>
                <div className='findTool'>
                    <input
                        type="text"
                        id="searchInput"
                        onChange={e => {
                            setSearcher({
                                ...searcher,
                                query: e.target.value,
                            });
                        }}
                    />
                    {matchesCount.total ? (
                        <span>{`第 ${matchesCount.current} 项, 共匹配 ${matchesCount.total} 项`}</span>
                    ) : null}
                </div>
            </div>
            <div
                id="viewerContainer"
                className="viewerContainer"
                ref={containerRef}
            >
                {/* a */}
                <div
                    className="pdfViewer"
                    id="innerContainer"
                    // onMouseMove={e=>{
                    //     console.log(e);
                    // }}
                />
            </div>

        </div>
    )
}

Index.displayName = "PDFViewer"

export default Index;