import { useEditStore } from '@/src/store/editStore'
import { CompType } from '@/src/types/const'
import { IComponent } from '@/src/types/editStoreTypes'
import {
  Button,
  ColorInput,
  DEFAULT_THEME,
  NativeSelect,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core'
import React from 'react'
import CTextInput from '../input/text-input'
import CNumberInput from '../input/number-input'
import {
  fontSizeOptions,
  fontWeightOptions,
  pageAlignOptions,
  textAlignOptions,
  textDecorationOptions,
} from '@/src/constants'
import CSelect from '../input/Select'

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
    textDecoration,
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
  const handleUpdateStyleProps = (item: {
    name: string
    value: string | number | { name: string; value: string | number }[]
  }) => {
    const attrs = Array.isArray(item) ? item : [item]

    const newStyle: React.CSSProperties = {}
    attrs.forEach((attr) => {
      const { name, value } = attr
      newStyle[name] = value
    })
    updateSelectedComponentStyle(newStyle)
  }
  const handleUpdateAttrProps = ({ name, value }: { name: string; value: string | number }) => {
    updateSelectedComponentAttr(name, value)
  }
  const handleAnimationChange = ({ name, value }: { name: string; value: string }) => {
    const newStyle = {
      animationName: value,
      animationIterationCount:
        style.animationIterationCount == undefined ? 1 : style.animationIterationCount,
      animationDuration: style.animationDuration == undefined ? '1s' : style.animationDuration,
      animationDelay: style.animationDelay == undefined ? 0 : style.animationDelay,
      animationPlayState: 'running',
    }

    updateSelectedComponentStyle(newStyle)
  }
  return (
    <>
      <h3 className=" px-5 pt-4 text-xs uppercase">组件设计</h3>
      <span className="mt-3 border-b border-primary-grey-200 px-5 pb-4 text-xs text-primary-grey-300">
        根据您的喜好对组件进行更改
      </span>

      {component.type === CompType.IMAGE && (
        <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
          <h3 className="text-[10px] uppercase">图片</h3>
          <div className="flex flex-col gap-3">
            <CTextInput
              defaultValue={component.value as string}
              id="desc"
              onChange={handleUpdateValueProps}
            />
          </div>
        </div>
      )}
      {fontSize !== undefined && (
        <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
          <h3 className="text-[10px] uppercase">字体</h3>
          <div className="flex flex-col gap-3">
            <CSelect
              defaultValue={fontSize + ''}
              data={fontSizeOptions}
              onChange={handleUpdateStyleProps}
              event="fontSize"
              type="number"
            />
          </div>
          {fontWeight !== undefined && (
            <CSelect
              onChange={handleUpdateStyleProps}
              data={fontWeightOptions}
              event="fontWeight"
              type="text"
              defaultValue={fontWeight as string}
            />
          )}
        </div>
      )}
      {lineHeight !== undefined && (
        <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
          <h3 className="text-[10px] uppercase">行高</h3>
          <CNumberInput
            onChange={handleUpdateStyleProps}
            event="lineHeight"
            defaultValue={lineHeight as string}
            valueSuffix="px"
          />
        </div>
      )}

      {component.type === CompType.TEXT && (
        <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
          <h3 className="text-[10px] uppercase">装饰</h3>

          <CSelect
            defaultValue={textDecoration as string}
            onChange={handleUpdateStyleProps}
            type="text"
            event="textDecoration"
            data={textDecorationOptions}
          />
        </div>
      )}

      {textAlign !== undefined && (
        <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
          <h3 className="text-[10px] uppercase">文字对齐</h3>
          <CSelect
            onChange={handleUpdateStyleProps}
            event="textAlign"
            defaultValue={textAlign}
            data={textAlignOptions}
            type="text"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
        <h3 className="text-[10px] uppercase">页面对齐</h3>

        <Select
          defaultValue={'none'}
          description=" "
          className=" rounded-none border-none   bg-transparent  outline-none ring-offset-0 focus:ring-1  focus:ring-primary-green focus:ring-offset-0 focus-visible:ring-offset-0"
          classNames={{
            input: 'text-primary-grey-300 input-ring px-4',
          }}
          variant="unstyled"
          onChange={(value) => {
            const newStyle: {
              left?: number | string
              right?: number | string
              top?: number | string
              bottom?: number | string
            } = {}
            switch (value) {
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
          data={pageAlignOptions}
        />
      </div>
      {/* 
    
  
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
        <Select
          label="边框样式"
          value={borderStyle}
          defaultValue={borderStyle}
          onChange={(value) => {
            handleUpdateStyleProps({ name: 'borderStyle', value: value })
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
        <Select
          label="动画"
          defaultValue={style.animationName || ''}
          data={[
            { label: '无动画', value: '' },
            { label: '闪烁', value: 'flash' },
            { label: '果冻', value: 'jelly' },
            { label: '抖动', value: 'shake' },
            { label: '左右摇摆', value: 'swing' },
          ]}
          onChange={(value) => {
            handleAnimationChange({
              name: 'animationName',
              value: value,
            })
          }}
        />
        {style.animationName && (
          <>
            <NumberInput
              defaultValue={style.animationDuration || 0}
              label="动画持续时长(s)"
              onChange={(value) => {
                handleUpdateStyleProps({
                  name: 'animationDuration',
                  value: `${value}s`,
                })
              }}
            />
            <NumberInput
              defaultValue={style.animationDelay}
              label="动画延迟时间(s)"
              onChange={(value) => {
                handleUpdateStyleProps({
                  name: 'animationDelay',
                  value: `${value}s`,
                })
              }}
            />
            <NumberInput
              defaultValue={
                style.animationIterationCount === 'infinite' ? 999 : style.animationIterationCount
              }
              label="动画循环次数(次)"
              onChange={(value) => {
                handleUpdateStyleProps({
                  name: 'animationIterationCount',
                  value: value === '999' ? 'infinite' : value,
                })
              }}
            />
            <div>
              <Button
                onClick={() => {
                  const value = style.animationName
                  handleUpdateStyleProps({
                    name: 'animationName',
                    value: '',
                  })
                  setTimeout(() => {
                    handleUpdateStyleProps([
                      { name: 'animationName', value },
                      { name: 'animationPlayState', value: 'running' },
                    ])
                  })
                }}
              >
                重新演示动画
              </Button>
            </div>
          </>
        )}
      </div> */}
    </>
  )
}

export default EditComponent
