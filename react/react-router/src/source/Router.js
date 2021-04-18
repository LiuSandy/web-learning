/**
 * Router 的作用就是监听路由的变化
 * 1. 使用全局的history
 * 2. 设置 location 监听变化
 */
import React, { useState, useEffect } from 'react'
import RouteContext from './routeContext'

const globalHistory = window.history
class Router extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: window.location
    }
    window.addEventListener("popstate", () => {
      this.push()
    })
  }

  push = () => {
    this.setState({
      location: window.location
    })
  }

  render() {
    const { children } = this.props
    const { location } = this.state
    return (
      <RouteContext.Provider value={{
        history: globalHistory,
        location,
        push: this.push,
      }}>
        {
          React.cloneElement(children, {
            history: globalHistory,
            location,
            push: this.push,
          })
        }
      </RouteContext.Provider>
    )
  }
}

export default Router