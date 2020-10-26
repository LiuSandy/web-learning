export default function(s){
    let stack = []
    const mapping = {
        "}":"{",
        "]":"[",
        ")":"("
    }

    const keys = Object.keys(mapping)
    for (let char of s){
        if(keys.includes(char)){
            let topElm = "#"
            if(stack.length>0){
                topElm = stack.pop()
            }
            if (mapping[char] !== topElm){
                return false
            }
        }else{
            stack.push(char)
        }
    }
    return !stack.length
}