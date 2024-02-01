import React from 'react'

// 根据 width、height 决定线的方向
const Line = ({ id, style }: { id?: string; style: React.CSSProperties }) => {
  return (
    <div
      className="alignLine"
      id={id}
      style={{
        display: 'none',
        zIndex: 999,
        width: 1,
        height: 1,
        position: 'absolute',
        backgroundColor: 'rgba(0,87,255,0.8)',
        ...style,
      }}
    ></div>
  )
}

export default Line
