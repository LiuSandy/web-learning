// 官方实例
export default function (dividend, divisor) {
    var INT_MAX = 0x7FFFFFFF;
    var INT_MIN = 1 << 31;

    //先判断符号
    var symbol = (dividend ^ divisor) >> 31;
    //由于Math.abs(INT_MIN)存在溢出问题
    //因此被除数与除数全部转为负数处理
    var _dividend = dividend > 0 ? -dividend : dividend;
    var _divisor = divisor > 0 ? -divisor : divisor;

    var times = divided_negtive(_dividend, _divisor);

    var output = 0;
    for (var i = 0; i < times.length; i++) {
        if (times[i] === 31) {
            //i=31表示INT_MIN，times无第二个元素，直接短路处理
            if (symbol === 0) {
                //符号为正，此时存在INT_MIN转为正数溢出,返回INT_MAX
                return INT_MAX;
            }
            return INT_MIN;
        }
        output += (1 << times[i]);
    }
    return symbol ? -output : output;

};


function divided_negtive(dividend, divisor) {
    //两负数相除
    //如-10/-20当除数小于被除数时，商为0
    if (divisor < dividend) {
        return [];
    }

    var timesMax = 32;
    var timesMin = 0;
    while (timesMax !== timesMin + 1) {
        //二分查找
        var mid = (timesMax + timesMin) >> 1;
        //divisor<<mid后有可能超过-1<<31的范围
        //因此要判断divisor是否大于等于-1<<(31-mid)，一旦小于这个值，则必定溢出
        if (divisor < (-1 << (31 - mid))) {
            //符合溢出条件，说明mid过大，将mid赋给timesMax，供下次折半查找使用
            timesMax = mid;
            continue;
        }

        var testVal = divisor << mid;
        if (testVal < dividend) {
            timesMax = mid;
        } else {
            timesMin = mid;
        }
    }
    return [timesMin].concat(divided_negtive(dividend - (divisor << timesMin), divisor));
}