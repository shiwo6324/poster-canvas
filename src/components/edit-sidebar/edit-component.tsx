import { useEditStore } from '@/src/store/editStore'
import { CompType } from '@/src/types/const'
import { IComponent } from '@/src/types/editStoreTypes'
import {
  ColorInput,
  DEFAULT_THEME,
  NativeSelect,
  NumberInput,
  TextInput,
  Textarea,
} from '@mantine/core'
import React from 'react'

const EditComponent = ({ component }: { component: IComponent }) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const { style, onClick = '' } = component
  const {
    updateSelectedComponentValue,
    updateSelectedComponentStyle,
    updateSelectedComponentAttr,
    editSelectedComponentsStyle,
  } = useEditStore()
  const {
    fontSize,
    fontWeight,
    lineHeight,
    textDecorationLine,
    transform,
    textAlign,

    borderRadius,
    borderStyle,
    borderWidth,
    borderColor,
    color,
    backgroundColor,
  } = style

  const handleUpdateValueProps = (value: string) => {
    updateSelectedComponentValue(value)
  }
  const handleUpdateStyleProps = ({ name, value }: { name: string; value: string | number }) => {
    updateSelectedComponentStyle({ [name]: value })
  }
  const handleUpdateAttrProps = ({ name, value }: { name: string; value: string | number }) => {
    updateSelectedComponentAttr(name, value)
  }
  return (
    <div className="flex   h-[calc(100vh-100px)] flex-col gap-3 overflow-scroll px-3 py-3">
      {/* {component.type === CompType.TEXT && (
        <Textarea
          ref={textareaRef}
          label="内容"
          description=" "
          defaultValue={component.value}
          onBlur={(e) => {
            updateSelectedComponentAttr('value', e.target.value)
            const textHeight = textareaRef?.current?.scrollHeight
            updateSelectedComponentStyle({ height: textHeight })
          }}
        />
      )} */}
      {component.type === CompType.IMAGE && (
        <TextInput
          label="描述"
          description="  "
          onChange={(e) => {
            handleUpdateValueProps(e.target.value)
          }}
          defaultValue={component.value}
        />
      )}
      {fontSize !== undefined && (
        <NumberInput
          label="字体大小(px)"
          onChange={(number) => {
            handleUpdateStyleProps({ name: 'fontSize', value: number })
          }}
          defaultValue={fontSize}
          description=" "
        />
      )}

      {fontWeight !== undefined && (
        <NativeSelect
          label="字体粗细"
          onChange={(e) => {
            handleUpdateStyleProps({
              name: 'fontWeight',
              value: e.target.value,
            })
          }}
          data={[
            { label: '正常', value: 'normal' },
            { label: '加粗', value: 'bold' },
            { label: '减粗', value: 'lighter' },
          ]}
        />
      )}
      {lineHeight !== undefined && (
        <NumberInput
          label="行高(px)"
          onChange={(number) => {
            handleUpdateStyleProps({
              name: 'lineHeight',
              value: number + 'px',
            })
          }}
          defaultValue={lineHeight}
          description=" "
        />
      )}
      {component.type === CompType.TEXT && (
        <NativeSelect
          label="装饰线"
          value={textDecorationLine}
          onChange={(e) => {
            handleUpdateStyleProps({
              name: 'textDecoration',
              value: e.target.value,
            })
          }}
          data={[
            { label: '无', value: 'none' },
            { label: '上划线', value: 'overline' },
            { label: '下划线', value: 'underline' },
            { label: '删除线', value: 'line-through' },
          ]}
        />
      )}
      {textAlign !== undefined && (
        <NativeSelect
          label="字体对齐"
          onChange={(e) => {
            handleUpdateStyleProps({
              name: 'textAlign',
              value: e.target.value,
            })
          }}
          value={textAlign}
          data={[
            { label: '居左', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '居右', value: 'right' },
          ]}
        />
      )}

      <NativeSelect
        label="对齐页面"
        description=" "
        onChange={(e) => {
          const newStyle: {
            left?: number | string
            right?: number | string
            top?: number | string
            bottom?: number | string
          } = {}
          switch (e.target.value) {
            case 'left':
              newStyle.left = 0
              break
            case 'right':
              newStyle.right = 0
              break

            case 'x-center':
              newStyle.left = 'center'
              break
            case 'top':
              newStyle.top = 0
              break
            case 'bottom':
              newStyle.bottom = 0
              break

            case 'y-center':
              newStyle.top = 'center'
              break
          }

          editSelectedComponentsStyle(newStyle)
        }}
        data={[
          { label: '左对齐', value: 'left' },
          { label: '右对齐', value: 'right' },
          { label: '垂直居中', value: 'y-center' },
          { label: '水平对齐', value: 'x-center' },
          { label: '上对齐', value: 'top' },
          { label: '下对齐', value: 'bottom' },
        ]}
      />
      {transform !== undefined && (
        <NumberInput
          label="旋转"
          onChange={(number) => {
            handleUpdateStyleProps({ name: 'transform', value: `rotate(${number}deg)` })
          }}
          defaultValue={transform?.rotate}
          description=" "
        />
      )}
      {borderRadius !== undefined && (
        <NumberInput
          label="圆角"
          onChange={(number) => {
            handleUpdateStyleProps({ name: 'borderRadius', value: number })
          }}
          defaultValue={borderRadius}
          description=" "
        />
      )}
      <NativeSelect
        label="边框样式"
        value={borderStyle}
        defaultValue={borderStyle}
        onChange={(e) => {
          handleUpdateStyleProps({ name: 'borderStyle', value: e.target.value })
        }}
        data={[
          { label: '无', value: 'none' },
          { label: '虚线', value: 'dashed' },
          { label: '点状', value: 'dotted' },
          { label: '双线', value: 'double' },
          { label: '凹槽', value: 'groove' },
          { label: '隐藏', value: 'hidden' },
          { label: '实线', value: 'solid' },
        ]}
      />
      <NumberInput
        label="边框宽度"
        onChange={(number) => {
          handleUpdateStyleProps({ name: 'borderWidth', value: number })
        }}
        defaultValue={borderWidth}
        description=" "
      />
      <ColorInput
        label="边框颜色"
        disallowInput
        description=" "
        withPicker={false}
        defaultValue={borderColor}
        onChange={(color) => {
          handleUpdateStyleProps({ name: 'backgroundColor', value: color })
        }}
        swatches={[
          ...DEFAULT_THEME.colors.red,
          ...DEFAULT_THEME.colors.green,
          ...DEFAULT_THEME.colors.blue,
        ]}
      />
      {color !== undefined && (
        <ColorInput
          label="字体颜色"
          disallowInput
          description=" "
          withPicker={false}
          defaultValue={color}
          onChange={(color) => {
            handleUpdateStyleProps({ name: 'color', value: color })
          }}
          swatches={[
            ...DEFAULT_THEME.colors.red,
            ...DEFAULT_THEME.colors.green,
            ...DEFAULT_THEME.colors.blue,
          ]}
        />
      )}
      {backgroundColor !== undefined && (
        <ColorInput
          label="背景颜色"
          disallowInput
          description=" "
          withPicker={false}
          defaultValue={backgroundColor}
          onChange={(color) => {
            handleUpdateStyleProps({ name: 'backgroundColor', value: color })
          }}
          swatches={[
            ...DEFAULT_THEME.colors.red,
            ...DEFAULT_THEME.colors.green,
            ...DEFAULT_THEME.colors.blue,
          ]}
        />
      )}
      <TextInput
        label="点击跳转"
        description="  "
        onChange={(e) => {
          handleUpdateAttrProps({
            name: 'onClick',
            value: e.target.value,
          })
        }}
        defaultValue={onClick}
      />
    </div>
  )
}

export default EditComponent
