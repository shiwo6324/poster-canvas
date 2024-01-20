import React from 'react'
import { CompType } from './const'

export type Style = React.CSSProperties

export interface ICanvas {
  title: string
  style: Style
  components: IComponentWithKey[]
}

export interface IComponent {
  type: CompType
  style: Style
  value: string //
  onClick?: string
}

export interface IComponentWithKey extends IComponent {
  key: string
}
