import React from 'react'

let defaultProps = {
  setting: {
    length: 6,
    placeholder: "Please Input"
  }
}

export type DefaultProps = Partial<typeof defaultProps>

export const withDefaultProps = <P extends DefaultProps>(
  OldComponent: React.ComponentType<P>
) => {
  type OwnProps = Omit<P, keyof DefaultProps>
  class NewComponent extends React.Component<OwnProps> {

    render() {
      const props = { ...defaultProps, ...this.props } as P
      return (
        <OldComponent {...props} />
      )
    }
  }
  return NewComponent
}