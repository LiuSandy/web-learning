/**
 * 54. Spiral Matrix
 */
export default function (matrix) {
	if (!matrix.length) {
		return []
	}
	if (matrix.length === 1) {
		return matrix[0]
	}
	// 定义行 列
	let row = matrix.length - 1, columns = matrix[0].length - 1, r = 0, c = 0
	let result = []
	while (r <= row && c <= columns) {
		// 第一行
		for (let i = c; i <= columns; i++) {
			result.push(matrix[r][i])
		}
		// 行 添加行末尾 下一行
		for (let i = r + 1; i <= row; i++) {
			result.push(matrix[i][columns])
		}
		if (r < row && c < columns) {
			for (let i = columns - 1; i > c; i--) {
				result.push(matrix[row][i])
			}
			for (let i = row; i > r; i--) {
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
/**
 * 20210315
 */
const spiralOrder = (matrix) => {
	const result = []
	if (!matrix.length) {
		return []
	}
	if (matrix.length === 1) {
		return matrix[0]
	}
	// 定义相关属性
	let row = matrix.length - 1,
		column = matrix[0].length - 1,
		r = 0, c = 0; /** 遍历到行和列的索引 */
	while (r <= row && c <= column) {
		// 遍历行数据
		for (let i = c; i <= column; i++) {
			result.push(matrix[r][i])
		}
		// 遍历列数据
		for (let i = r + 1; i <= row; i++) {
			result.push(matrix[i][column])
		}
		if (r < row && c < column) {
			for (let i = column - 1; i > c; i--) {
				result.push(matrix[row][i])
			}
			for (let i = row; i > r; i--) {
				result.push(matrix[i][r])
			}
		}
		r++;
		row--;
		c++;
		column--;

	}

	return result
}