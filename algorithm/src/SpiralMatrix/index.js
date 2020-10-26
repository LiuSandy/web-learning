export default function(matrix){
	if(!matrix.length){
		return []
	}
	if(matrix.length === 1){
		return matrix[0]
	}
	// 定义行 列
	let row = matrix.length-1,columns=matrix[0].length-1,r=0,c=0
	let result = []
	while(r<=row&&c<=columns){
		// 第一行
		for(let i = c;i<=columns;i++){
			result.push(matrix[r][i])
		}
		// 行 添加行末尾 下一行
		for(let i=r+1;i<=row;i++){
			result.push(matrix[i][columns])
		}
		if(r<row&&c<columns){
			for(let i=columns-1;i>c;i--){
				result.push(matrix[row][i])
			}
			for(let i=row;i>r;i--){
				result.push(matrix[i][r])
			}
		}
		r++;
		row--;
		c++;
		columns--;
	}
	return result
}