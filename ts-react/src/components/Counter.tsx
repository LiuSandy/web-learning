import React, { ReactNode } from 'react'

interface Props {
  number: number
}

export default class Counter extends React.Component<Props> {

  render() {
    const { number } = this.props
    return (
      <div>
        <span>{number}</span>
      </div>
    )
  }
}

// type PropsWithChildren<Props> = Readonly<Props> & Readonly<{
//   children?: ReactNode
// }>

// type ComponentProps = PropsWithChildren<Props>