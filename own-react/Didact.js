/**
 * 定义相关常量
 */
const UPDATE = "UPDATE"; /** 更新 */
const PLACEMENT = "PLACEMENT"; /** 增加 */
const DELETION = "DELETION"; /** 删除 */

const isEvent = key => key.startsWith("on");

const isProperty = (key) => key !== 'children' && !isEvent(keyÍ);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof children === 'object' ? child : createTextElement(child))),
    },
  };
}

// 每个元素都是一个fiber，每个fiber都是一个工作单元
function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(fiber.type);

  // 赋值属性
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });
  return dom
}

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = null;
let wipFiber = null;
let hookIndex = null


function updateDom(dom, prevProps, nextProps) {
  // remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })
  // remove old event linsteners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventLinsteners(eventType, prevProps[name])
    })
  // set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
  // add new or changed event linsteners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventLinsteners(eventType, nextProps[name])
    })
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.parent, domParent)
  }
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParentFiber = fiber.parent
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom
  if (fiber.effectTag === PLACEMENT && fiber.dom !== null) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === UPDATE && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if (fiber.effectTag === DELETION) {
    commitDeletion()

  }

  commitWork(fiber.child)
  commitWork(fiber.sbiling)
}

function commitRoot() {
  deletions.forEach(commitWork)
  // add node to dom
  commitWork(wipRoot.child);
  currentRoot = wipRoot
  wipRoot = null
}

function render(element, container) {
  // set next unit of work 设置下一个工作单元
  // 把将要工作的element转化为fiber节点
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot,
    deletions: []
  }
  nextUnitOfWork = wipRoot
}

function reconcileChildren(wipFiber, elements) {
  let index = 0, prevSbiling = null,
    oldFiber = wipFiber.alternate && wipFiber.alternate.child
  while (index < elements.length || oldFiber !== null) {
    const element = elements[index];
    let newFiber = null
    // 比较更改
    // 1. 判断类型 div p 如果类型相同使用 props 更新
    // 2. 如果类型不同需要创建一个新的节点
    // 3. 如果类型不同，并且有一个旧的几点，需要删除节点
    const sameType = oldFiber && element && oldFiber.type === element.type
    if (sameType) {
      // update props
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: UPDATE
      }
    }
    if (element && !sameType) {
      // 新节点创建 
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: PLACEMENT
      }
    }
    if (oldFiber && !sameType) {
      // 旧结点删除
      oldFiber.effectTag = DELETION;
      deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sbiling
    }

    // 如果是第一个节点放入child
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSbiling.sbiling = newFiber
    }
    prevSbiling = newFiber;
    i++
  }
}

function useState(initial) {
  const oldHook = wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }
  const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    hook.state = action(hook.state)
  })

  const setState = action => {
    hook.queue.push(action)
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }
  wipFiber.hooks.push(hook)
  hookIndex++

  return [hook.state, setState]
}

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

function updateHostComponent(fiber) {
  // TODO add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  // TODO create new fibers
  const elements = fiber.props.children
  reconcileChildren(fiber, elements)
}

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function
  if (!isFunctionComponent) {
    updateHostComponent(fiber)
  } else {
    updateFunctionComponent()
  }
  // TODO return next unit of work
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sbiling) {
      return nextFiber.sbiling
    }
    nextFiber = nextFiber.parent
  }
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

const Didact = {
  createElement,
  render,
  useState,
};

/** @jsx Didact.createElement */
function Counter() {
  const [state, setState] = Didact.useState(1);
  return (
    <h1 onClick={() => setState(c => c + 1)} style="user-select: none">
      Count: {state}
    </h1>
  );
}
const element = <Counter />;
const container = document.getElementById("root");
Didact.render(element, container);

