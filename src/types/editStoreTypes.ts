import React from 'react'
import { CompType } from './const'

export type Style = React.CSSProperties
export type contentType = 'content' | 'template'
export interface ICanvas {
  id: number | undefined
  type: 'content' | 'template'
  title: string
  content: IContent
}

export interface IContent {
  components: IComponentWithKey[]
  style: React.CSSProperties
}
export interface IComponent {
  type: CompType
  style: Style
  value?: string
  onClick?: string
  groupKey?: string
  groupComponentKeys?: string[]
}

export interface IComponentWithKey extends IComponent {
  key: string
}
