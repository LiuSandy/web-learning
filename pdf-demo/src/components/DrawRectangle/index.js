import React from 'react';
import classNames from 'classnames';
import styles from './index.less'

/**
 * shape 数据结构 
 * {
 *  status: 'init' | 'down', 初始化 绘制结束
 *  data: {
 *    
 *  } 数据
 *  style:{} 样式
 * }
 */

const PREFIX = 'CUR-RECTANGE-';
let CURRENT_INDEX = 0;
const minimum = { with: 20, height: 10 }

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false, /* 是否可编辑 */
      shapes: {}, /* 所有图形 */
    }
    this.canDrawMove = false;
    this.curDropOrientation = '';
    this.curDropShape = ""; /* 当前移动的shape */
  }

  componentDidMount() {
    const { linkedList } = this.props
    if (linkedList) {
      // todo 设置缩放
      this.setState({ shapes: linkedList })
    }
  }

  changeEditable = () => {
    const { editable } = this.state
    this.removeNotConfirmRect()
    this.setState({
      editable: !editable
    })
    this.canDrawMove = false;
  }

  /**
   * 移除没有绘制确认的矩形
   */
  removeNotConfirmRect = () => {
    const { shapes } = this.state
    Object.keys(shapes).forEach(key => {
      if (key.startsWith(PREFIX)) {
        delete shapes[key]
      }
    })
    this.setState({ shapes })
  }

  /**
   * 绘制确认
   */
  onConfirm = () => {
    const { onInsert } = this.props
    const { shapes } = this.state
    const onSave = (key) => {
      const willSaveShape = shapes[key]
      onInsert(willSaveShape, (savedShapes) => {
        this.setState({
          shapes: savedShapes
        })
        this.canDrawMove = false;
        this.curDropOrientation = '';
        this.curDropShape = ""
      })
    }
    if (!this.curDropShape) {
      Object.keys(shapes).forEach(key => {
        if (shapes[key].status === 'unfocused') {
          onSave(key)
        }
      })
    } else {
      onSave(this.curDropShape)
    }
  }

  getStyle = (style) => {
    if (style) {
      return {
        left: `${style.x}px`,
        top: `${style.y}px`,
        width: `${style.width}px`,
        height: `${style.height}px`,
      }
    }
    return null
  }

  /**
   * 根据 x y 判断拖拽的方向
   * @param {*} x 移动x大小
   * @param {*} y 移动x大小
   * @returns 
   * 移动8个方位  east west north south northeast northwest southeast southwest
   *    位置方位  东  西  北  南  东北  西北  东南  西南
   *    对应方位  右  左  上  下  右上  左上  右下  左下
   */
  getDropOrientation = (x, y) => {
    if (x > 0 && y > 0) {
      // 东南 即 右下
      return "southeast"
    } else if (x === 0 && y > 0) {
      return 'south'
    } else if (x < 0 && y > 0) {
      return "southwest"
    } else if (x > 0 && y === 0) {
      return "east"
    } else if (x === 0 && y === 0) {
      return 'free'
    } else if (x < 0 && y === 0) {
      return "west"
    } else if (x > 0 && y < 0) {
      return "northeast"
    } else if (x === 0 && y < 0) {
      return 'north'
    } else if (x < 0 && y < 0) {
      return "northwest"
    } else {
      return null
    }
  }
  /**
   * 改变矩形大小
   */
  resizeRectangle = (distanceX, distanceY) => {
    let { x, y, width, height } = this.state.shapes[this.curDropShape].style
    switch (this.curDropOrientation) {
      case 'east': /* 东 */
        width += distanceX
        break;
      case 'west':/* 西 */
        width -= distanceX
        x += distanceX;
        break
      case "south":/* 南 */
        height += distanceY
        break
      case "north":/* 北 */
        height -= distanceY
        y += distanceY;
        break
      case 'northeast': /* 东北 */
        width += distanceX;
        height -= distanceY;
        y += distanceY;
        break;
      case 'northwest': /* 西北 */
        width -= distanceX;
        height -= distanceY;
        x += distanceX
        y += distanceY
        break;
      case 'southeast': /* 东南 */
        width += distanceX
        height += distanceY
        break;
      case 'southwest': /* 西南 */
        width -= distanceX
        height += distanceY
        x += distanceX
        break;
      default:
        break;
    }
    const { shapes } = this.state
    shapes[this.curDropShape].style = {
      x, y, width, height
    }
    this.setState({
      shapes
    })

  }

  /**
   * 移动矩形位置
   */
  moveRectangle = (x, y) => {
    if (!this.canDrawMove || !this.curDropShape) {
      return
    }
    const { shapes } = this.state
    const shape = shapes[this.curDropShape]
    if (shape && (x || y)) {
      shape.style = {
        ...shape.style,
        x: shape.style.x + x,
        y: shape.style.y + y
      }
      this.setState({ shapes })
    }
  }


  /**
   * 鼠标按下
   */
  onMouseDown = event => {
    event.stopPropagation()
    const { editable, shapes } = this.state
    if (!editable) {
      return
    }
    this.unFocusedAll();
    const key = `${PREFIX}${CURRENT_INDEX}`
    const { nativeEvent: { offsetX, offsetY } } = event
    const curShape = {
      style: {
        x: offsetX,
        y: offsetY,
        width: 0,
        height: 0,
      },
      status: 'init',
      data: {
        id: key
      }
    }
    shapes[key] = curShape
    this.canDrawMove = true
    this.curDropOrientation = 'free'
    this.curDropShape = key
    CURRENT_INDEX++;
    this.setState({
      shapes,
    })
  }
  /**
   * 鼠标移动
   */
  onMouseMove = event => {
    event.stopPropagation()
    const { editable } = this.state
    if (!editable || !this.canDrawMove) {
      return
    }
    const { movementX, movementY } = event
    if (!movementX || !movementY) {
      return
    }
    // 1. 判断状态
    if (this.curDropOrientation === 'free') {
      this.curDropOrientation = this.getDropOrientation(movementX, movementY)
    }
    // 2. 判断拖拽移动方向 改变形状
    if (this.curDropOrientation) {
      this.resizeRectangle(movementX, movementY)
    } else {
      // 3. 判断移动 改变位置
      this.moveRectangle(movementX, movementY)
    }
  }

  /**
   * 鼠标离开
   */
  onMouseUp = event => {
    event.stopPropagation()
    const { editable } = this.state

    if (!editable || !this.curDropShape) {
      return
    }
    // 1. 绘制结束聚焦到当前矩形
    const { shapes } = this.state;
    const curShape = shapes[this.curDropShape]
    if (curShape) {
      const { width, height } = curShape.style
      if (!this.curDropShape.startsWith(PREFIX)&&curShape.status === 'focused') {
        this.unFocusedAll()
        // 移动 修改
      } else if (width <= minimum.width || height <= minimum.height) {
        // 判断是否最小
        delete shapes[this.curDropShape]
        this.unFocusedAll()
      } else {
        shapes[this.curDropShape].status = 'focused'
        this.canDrawMove = true
        this.curDropOrientation = "";
      }
      this.setState({ shapes })
    } else {
      this.unFocusedAll()
    }
  }

  unFocusedAll = () => {
    const { shapes } = this.state
    Object.keys(shapes).forEach(key => {
      if (key.startsWith(PREFIX) && shapes[key].status === 'focused') {
        shapes[key].status = 'unfocused'
      } else if (!key.startsWith(PREFIX) && shapes[key].status === 'focused') {
        shapes[key].status = 'done'
      }
    })
    this.canDrawMove = false
    this.curDropOrientation = "";
    this.curDropShape = ""
    this.setState({ shapes })
  }

  onRectMove = event => {
    event.stopPropagation()
    const { editable, shapes } = this.state
    if (!editable) {
      return
    }
    const { target } = event
    const key = target.getAttribute("data-id")
    this.curDropOrientation = target.getAttribute("data-ord")
    if (shapes[key] && shapes[key].status !== 'focused') {
      // 设置点击对象 只能选中一个
      this.unFocusedAll()
      this.curDropShape = key
    }
  }

  onClose = (event) => {
    event.stopPropagation()
    const { editable, shapes } = this.state
    if (!editable) {
      return
    }
    const { target } = event
    const key = target.getAttribute("data-id");

    if (shapes[key]) {
      delete shapes[key]
      this.setState({ shapes })
      this.curDropShape = ""
    }
  }

  render() {
    const { editable, shapes } = this.state
    const canvasStyle = {
      cursor: editable ? 'crosshair' : 'default'
    }

    return (
      <div className={styles.wrapper}>
        <div className="tool">
          <button onClick={this.changeEditable}>{editable ? '取消编辑' : '编辑'}</button>
          <button onClick={this.onConfirm}>确定</button>
        </div>
        <div
          className={styles.canvas}
          style={canvasStyle}
          ref={ref => this.container = ref}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
        >
          Hello World
          {
            Object.keys(shapes).map(key => {
              const shape = shapes[key];
              const style = this.getStyle(shape.style)
              return (
                <div
                  // className={`rectangle ${shape.status}`}
                  className={classNames(styles.rectangle, styles[shape.status])}
                  onMouseDown={this.onRectMove}
                  key={key}
                  data-id={key}
                  data-status={shape.status}
                  style={style}
                >
                  <div className={styles.rectElement}>
                    <div className={classNames(styles.bar, styles.north)} data-ord="north"></div>
                    <div className={classNames(styles.bar, styles.south)} data-ord="south"></div>
                    <div className={classNames(styles.bar, styles.east)} data-ord="east"></div>
                    <div className={classNames(styles.bar, styles.west)} data-ord="west"></div>
                    <div className={classNames(styles.corner, styles.northeast)} data-ord="northeast"></div>
                    <div className={classNames(styles.corner, styles.northwest)} data-ord="northwest"></div>
                    <div className={classNames(styles.corner, styles.southeast)} data-ord="southeast"></div>
                    <div className={classNames(styles.corner, styles.southwest)} data-ord="southwest"></div>
                    <div data-id={key} className={styles.close} onClick={this.onClose}></div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

    )
  }
}

export default Index