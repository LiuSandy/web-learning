/** 事件委托 */

/**
 * 
 * @param {String} el 事件源元素，
 * @param {String} type 事件类型
 * @param {Function} fn  事件回调
 * @param {String} selector 响应事件元素
 */
function addEventListener(el, type, fn, selector) {
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }
  // 判断是否有委托
  if (!selector) {
    el.addEventListener(type, fn)
  } else {
    el.addEventListener(type, function (e) {
      const target = e.target
      // 所点击元素是否与相应元素相同
      if (target.matches(selector)) {
        fn.call(target, e)
      }
    })
  }
}