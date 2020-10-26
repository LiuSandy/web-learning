export default root => {
    if (!root) return [];
    const quence = [root];
    const res = [];
    while(quence.length){
        const temp = [];
        const next = [];
        for (let i = 0; i < quence.length; i++) {
            const item = quence[i];
            temp.push(item.val);
            if (item.left){
                next.push(item.left)
            }
            if (item.right){
                next.push(item.right)
            }
        }
        quence = next;
        res.push(temp)
    }
    return res
}