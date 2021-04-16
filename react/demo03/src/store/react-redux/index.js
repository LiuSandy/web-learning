import React, { useEffect, useState, useContext, useRef, useMemo } from 'react';

const CustomContext = React.createContext()


export class Provider extends React.Component {

  render() {
    const { children, store } = this.props
    return (
      <CustomContext.Provider value={store}>
        {children}
      </CustomContext.Provider>
    )
  }

}


export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (Compoent) => {
    return class Customer extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.state = mapStateToProps(context.getState())
        this.dispatch = mapDispatchToProps(context.dispatch)
        this.listener = null
      }

      // store
      static contextType = CustomContext

      // 注册监听
      componentDidMount() {
        this.listener = this.context.subscribe(() => {
          this.setState(
            mapStateToProps(this.context.getState())
          )
        })
      }
      componentWillUnmount(){
        this.listener()
      }
      render() {
        return (
          <Compoent {...this.props} {...this.state} {...this.dispatch} />
        )
      }
    }
  }
}


export const connectFun = (mapStateToProps, mapDispatchToProps) => {
  return (Compoent) => {
    return props => {
      console.log("1");
      const contextStore = useContext(CustomContext);
      const [state, setState] = useState(mapStateToProps(contextStore.getState()));
      const [dispatch] = useState(mapDispatchToProps(contextStore.dispatch));
      const listener = useRef()

      useEffect(() => {
        console.log("2");
        listener.current = contextStore.subscribe(() => {
          setState(mapStateToProps(contextStore.getState()))
        })
        return () => {
          listener.current()
        }
      }, [])
      return useMemo(() => {
        return (
          <Compoent {...props} {...state} {...dispatch} />
        )
      })
    }
  }
}