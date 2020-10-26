export default function (board) {
    // board 二维数组
    // 记录数据
    const row = {};
    const column = {};
    const box = {};
    // 初始化数据
    for (let i = 0; i < 9; i++) {
        row[i] = {}
        column[i] = {}
        box[i] = {}
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const curentNum = board[r][c]
            // 计算第几个 3 * 3
            const box_index = parseInt(r / 3) * 3 + parseInt(c / 3)
            if (curentNum !== '.') {
                row[r][curentNum] = (row[r][curentNum] || 0) + 1
                column[c][curentNum] = (column[c][curentNum] || 0) + 1
                box[box_index][curentNum] = (box[box_index][curentNum] || 0) + 1
                // 判断
                if(row[r][curentNum]>1||column[c][curentNum]>1||box[box_index][curentNum]>1){
                    return false
                }
            }
        }
    }
    return true
}