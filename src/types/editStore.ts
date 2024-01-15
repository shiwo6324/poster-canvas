import React from 'react'

export type Style = React.CSSProperties

export interface ICanvas {
  title: string
  style: Style
  components: IComponentWithKey[]
}

export interface IComponent {
  type: number
  style: Style
  value: string //
  onClick?: string
}

export interface IComponentWithKey extends IComponent {
  key: string
}
