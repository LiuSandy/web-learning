const moment = require('moment');

function currying(fn) {
  const args = [];
  const inner = function () {
    const _args = [].slice.apply(arguments);
    if (_args.length > 0) {
      args.push(..._args);
      return inner;
    } else {
      return fn.apply(null, args);
    }
  };
  return inner;
}

/**
 * 计算两个日期相差
 * @param begin 开始日期
 * @param end 结束日期，需要对比的时间
 */
const diffDate = (begin, end) => {
  // 是否过期
  let flag = false;
  const contrast = () => {
    if (moment(begin).isAfter(end)) {
      flag = true;
      return [end, begin];
    }
    return [begin, end];
  };
  // 对比日期，小日期在前面，大日期在后面
  let [from, to] = contrast();
  function computed() {
    const args = [].slice.apply(arguments);
    let diffObj = {};
    args.forEach((arg) => {
      const diff = Math.abs(moment(from).diff(moment(to), arg));
      // 更新 from 时间
      from = moment(from).add(diff, arg);
      diffObj = {
        ...diffObj,
        [arg]: diff,
      };
    });
    return diffObj;
  }
  const computedDate = currying(computed);
  const result = computedDate('Years')('Months')('Days')();
  console.log(flag, result);
};

diffDate(moment().format('YYYY-MM-DD HH:mm:ss'), '2021-03-03 14:25:26');
