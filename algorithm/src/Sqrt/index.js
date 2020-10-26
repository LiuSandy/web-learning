export default function (x) {
	// body...
	if (x===0) {
		return 0
	}else if (x<4) {
		return 1
	}
	// 二分查找
	let temp = x
	let mid = parseInt(x / 2)
	while(true){
		let result = mid * mid
		if (result===x) {
			return mid
		}else if(result > x){
			// 
			temp = mid
			mid = parseInt(mid / 2)
		}else if (result < x) {
			// 
			const newMid = parseInt((mid + temp) / 2)
			if(newMid === mid){
				return mid
			}
			mid = newMid
		}
	}
}

