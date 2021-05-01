/**
 * 690. Employee Importance
 * 690. 员工的重要性
 */

// 数组方式
const GetImportance1 = function (employees, id) {
  const map = {};
  const importance = {}
  for (const employee of employees) {
    map[employee[0]] = employee
    importance[employee[0]] = employee[1]||0
  }
  let result = 0
  const recursive = (id) => {
    const child = map[id];
    result += importance[id];
    if (child[2].length > 0) {
      for (const childId of child[2]) {
        recursive(childId)
      }
    }else{
      return
    }
  }
  recursive(id)

  return result
};

// 数据结构
const GetImportance = function (employees, id) {
  const map = {};
  for (const employee of employees) {
    map[employee.id] = employee
  }
  const recursive = (id) => {
    const employee = map[id];
    let {importance,subordinates} = employee
    for (const subId of subordinates) {
      importance += recursive(subId)
    }
    return importance
  }

  return recursive(id)
};

const result = GetImportance([[1, 5, [2, 3]], [2, 3, []], [3, 3, []]], 1)
console.log(result)