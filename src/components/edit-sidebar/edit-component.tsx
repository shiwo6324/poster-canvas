import {
  editSelectedComponentsStyle,
  updateSelectedComponentAttr,
  updateSelectedComponentStyle,
  updateSelectedComponentValue,
} from '@/src/store/editStore'
import { CompType } from '@/src/types/const'
import { IComponent } from '@/src/types/editStoreTypes'
import { Button, ColorInput, DEFAULT_THEME } from '@mantine/core'
import React from 'react'
import CTextInput from '../input/text-input'
import CNumberInput from '../input/number-input'
import {
  animationNameOptions,
  boarderStyleOptions,
  fontSizeOptions,
  fontWeightOptions,
  pageAlignOptions,
  textAlignOptions,
  textDecorationOptions,
} from '@/src/components/constants'
import CSelect from '../input/Select'
type StyleItem = { name: string; value: string | number }
type StyleInput = StyleItem | StyleItem[]
const EditComponent = ({ component }: { component: IComponent }) => {
  const { style, onClick = '' } = component
  const {
    fontSize,
    fontWeight,
    lineHeight,
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
  const handleUpdateStyleProps = (item: StyleInput) => {
    const attrs = Array.isArray(item) ? item : [item]

    const newStyle: { [key: string]: string } = {}
    attrs.forEach((attr) => {
      const { name, value } = attr
      newStyle[name] = value.toString()
    })
    updateSelectedComponentStyle(newStyle)
  }
  const handleUpdateAttrProps = ({
    name,
    value,
  }: {
    name: any
    value: string | number
  }) => {
    updateSelectedComponentAttr(name, value)
  }
  const handleAnimationChange = ({
    name,
    value,
  }: {
    name: string
    value: string
  }) => {
    const newStyle = {
      animationName: value,
      animationIterationCount:
        style.animationIterationCount == undefined
          ? 1
          : style.animationIterationCount,
      animationDuration:
        style.animationDuration == undefined ? '1s' : style.animationDuration,
      animationDelay:
        style.animationDelay == undefined ? 0 : style.animationDelay,
      animationPlayState: 'running',
    }

    updateSelectedComponentStyle(newStyle as React.CSSProperties)
  }
  return (
    <>
      <h3 className=" px-5 pt-4 text-xs uppercase">组件设计</h3>
      <span className="mt-3 border-b border-primary-grey-200 px-5 pb-4 text-xs text-primary-grey-300">
        根据您的喜好对组件进行更改
      </span>
      <div className="custom-scrollbar h-[calc(100vh-64px-65px)]  overflow-y-scroll py-5">
        {component.type === CompType.IMAGE && (
          <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
            <h3 className="text-[10px] uppercase">图片</h3>
            <div className="flex flex-col gap-3">
              <CTextInput
                defaultValue={component.value as string}
                id="desc"
                onChange={(e) => {
                  handleUpdateValueProps(e.target.value)
                }}
              />
            </div>
          </div>
        )}
        {fontSize !== undefined && (
          <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
            <h3 className="text-[10px] uppercase">字体</h3>
            {color !== undefined && (
              <ColorInput
                disallowInput
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
                variant="unstyled"
                className="rounded-none  border border-primary-grey-200 bg-transparent   outline-none ring-offset-0 focus:ring-1  focus:ring-primary-green focus:ring-offset-0 focus-visible:ring-offset-0"
                classNames={{
                  input: 'text-primary-grey-300 input-ring  px-12',
                }}
              />
            )}
            <div className="flex flex-col gap-3">
              <CSelect
                defaultValue={fontSize + ''}
                data={fontSizeOptions}
                onChange={(value: string | number) => {
                  handleUpdateStyleProps({
                    name: 'fontSize',
                    value: value + 'px',
                  })
                }}
              />
            </div>
            {fontWeight !== undefined && (
              <CSelect
                onChange={(value: string | number) => {
                  handleUpdateStyleProps({
                    name: 'fontWeight',
                    value: value,
                  })
                }}
                data={fontWeightOptions}
                defaultValue={fontWeight as string}
              />
            )}
          </div>
        )}
        {lineHeight !== undefined && (
          <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
            <h3 className="text-[10px] uppercase">行高</h3>
            <CNumberInput
              onChange={(value) => {
                handleUpdateStyleProps({
                  name: 'lineHeight',
                  value: value + 'px',
                })
              }}
              defaultValue={lineHeight as string}
            />
          </div>
        )}

        {component.type === CompType.TEXT && (
          <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
            <h3 className="text-[10px] uppercase">装饰</h3>

            <CSelect
              defaultValue={textDecoration as string}
              onChange={(value) => {
                handleUpdateStyleProps({
                  name: 'textDecoration',
                  value,
                })
              }}
              data={textDecorationOptions}
            />
          </div>
        )}

        {textAlign !== undefined && (
          <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
            <h3 className="text-[10px] uppercase">文字对齐</h3>
            <CSelect
              onChange={(value) => {
                handleUpdateStyleProps({
                  name: 'textAlign',
                  value,
                })
              }}
              defaultValue={textAlign}
              data={textAlignOptions}
            />
          </div>
        )}
        <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
          <h3 className="text-[10px] uppercase">页面对齐</h3>

          <CSelect
            defaultValue={'none'}
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
        {transform !== undefined && (
          <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
            <h3 className="text-[10px] uppercase">transform</h3>
            {/* <CNumberInput
              id="旋转"
              onChange={(number) => {
                handleUpdateStyleProps({ name: 'transform', value: `rotate(${number}deg)` })
              }}
              defaultValue={transform?.rotate ?? 0}
            /> */}

            {borderRadius !== undefined && (
              <CNumberInput
                id="圆角"
                onChange={(number) => {
                  handleUpdateStyleProps({
                    name: 'borderRadius',
                    value: number,
                  })
                }}
                defaultValue={borderRadius as string}
              />
            )}
          </div>
        )}
        <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
          <h3 className="text-[10px] uppercase">边框</h3>
          <ColorInput
            disallowInput
            variant="unstyled"
            className="rounded-none  border border-primary-grey-200 bg-transparent   outline-none ring-offset-0 focus:ring-1  focus:ring-primary-green focus:ring-offset-0 focus-visible:ring-offset-0"
            classNames={{
              input: 'text-primary-grey-300 input-ring px-12',
              dropdown:
                'bg-primary-black  text-primary-grey-300 border-primary-grey-200',
            }}
            withPicker={false}
            defaultValue={borderColor}
            onChange={(color) => {
              handleUpdateStyleProps({ name: 'borderColor', value: color })
            }}
            swatches={[
              ...DEFAULT_THEME.colors.red,
              ...DEFAULT_THEME.colors.green,
              ...DEFAULT_THEME.colors.blue,
            ]}
          />
          <div className="flex gap-3">
            <CNumberInput
              onChange={(number) => {
                handleUpdateStyleProps({
                  name: 'borderWidth',
                  value: `${number}px`,
                })
              }}
              defaultValue={borderWidth as string}
            />
            <CSelect
              defaultValue={borderStyle as string}
              onChange={(value) => {
                handleUpdateStyleProps({
                  name: 'borderStyle',
                  value: value as string,
                })
              }}
              data={boarderStyleOptions}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
          <h3 className="text-[10px] uppercase">背景颜色</h3>
          {backgroundColor !== undefined && (
            <ColorInput
              disallowInput
              variant="unstyled"
              className="rounded-none  border border-primary-grey-200 bg-transparent   outline-none ring-offset-0 focus:ring-1  focus:ring-primary-green focus:ring-offset-0 focus-visible:ring-offset-0"
              classNames={{
                input: 'text-primary-grey-300 input-ring px-12',
                dropdown:
                  'bg-primary-black  text-primary-grey-300 border-primary-grey-200',
              }}
              withPicker={false}
              defaultValue={backgroundColor}
              onChange={(color) => {
                handleUpdateStyleProps({
                  name: 'backgroundColor',
                  value: color,
                })
              }}
              swatches={[
                ...DEFAULT_THEME.colors.red,
                ...DEFAULT_THEME.colors.green,
                ...DEFAULT_THEME.colors.blue,
              ]}
            />
          )}
        </div>
        <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
          <h3 className="text-[10px] uppercase">动画</h3>
          <CSelect
            defaultValue={style.animationName || ''}
            data={animationNameOptions}
            onChange={(value) => {
              handleAnimationChange({
                name: 'animationName',
                value: value as string,
              })
            }}
          />
          {style.animationName && (
            <>
              <CNumberInput
                defaultValue={(style.animationDuration as any) || 0}
                onChange={(value) => {
                  handleUpdateStyleProps({
                    name: 'animationDuration',
                    value: `${value}s`,
                  })
                }}
              />
              <CNumberInput
                defaultValue={style.animationDelay as string}
                // label="动画延迟时间(s)"
                onChange={(value) => {
                  handleUpdateStyleProps({
                    name: 'animationDelay',
                    value: `${value}s`,
                  })
                }}
              />
              <CNumberInput
                defaultValue={
                  style.animationIterationCount === 'infinite'
                    ? (999 as number)
                    : (style.animationIterationCount as number)
                }
                // label="动画循环次数(次)"
                onChange={(value) => {
                  handleUpdateStyleProps({
                    name: 'animationIterationCount',
                    value: value === '999' ? 'infinite' : value,
                  })
                }}
              />
              <div>
                <Button
                  variant="outline"
                  className="w-full border border-primary-grey-100 text-primary-grey-300 transition-all hover:bg-primary-green hover:text-primary-black"
                  onClick={() => {
                    const value = style.animationName
                    handleUpdateStyleProps({
                      name: 'animationName',
                      value: '',
                    })
                    setTimeout(() => {
                      handleUpdateStyleProps([
                        { name: 'animationName', value: value as string },
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
        </div>
      </div>
    </>
  )
}

export default EditComponent
