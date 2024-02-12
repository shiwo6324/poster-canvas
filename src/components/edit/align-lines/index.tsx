import React from 'react'
import Line from './line'

const AlignLines = ({ canvasStyle }: { canvasStyle: React.CSSProperties }) => {
  return (
    <>
      {/* 组件的中心 X 轴 */}
      {/* <Line id="lineX" style={{ left: 0, width: canvasStyle.width }} /> */}
      {/* 组件的中心 Y 轴 */}
      {/* <Line id="lineY" style={{ top: 0, width: canvasStyle.height }} /> */}
      {/* 中心 X 轴，对齐画布 */}
      <Line
        id="centerXLine"
        style={{
          top: (canvasStyle.height as number) / 2,
          left: 0,
          width: canvasStyle.width,
        }}
      />
      <Line
        id="centerYLine"
        style={{
          top: 0,
          left: (canvasStyle.width as number) / 2,
          height: canvasStyle.height,
          backgroundColor: 'red',
        }}
      />
      {/* 对齐画布 top */}
      <Line
        id="canvasLineTop"
        style={{
          top: 0,
          left: 0,
          width: canvasStyle.width,
          backgroundColor: 'red',
        }}
      />
      <Line
        id="canvasLineBottom"
        style={{
          left: 0,
          bottom: 0,
          width: canvasStyle.width,
          backgroundColor: 'red',
        }}
      />
      <Line
        id="canvasLineLeft"
        style={{
          top: 0,
          left: 0,
          height: canvasStyle.height,
          backgroundColor: 'red',
        }}
      />
      <Line
        id="canvasLineRight"
        style={{
          top: 0,
          right: 0,
          height: canvasStyle.height,
          backgroundColor: 'red',
        }}
      />
    </>
  )
}

export default AlignLines
