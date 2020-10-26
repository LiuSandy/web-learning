const backspaceCompare = (S, T) => {
  const build_stack = (s)=>{
    const stack = []
    for (const str of s) {
      if(str !== '#'){
        stack.push(str)
      }else{
        stack.pop()
      }
    }
    return stack.join("")
  }
  return build_stack(S) === build_stack(T);
}