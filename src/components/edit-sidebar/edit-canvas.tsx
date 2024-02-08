import { useEditStore } from '@/src/store/editStore'
import { ICanvas } from '@/src/types/editStoreTypes'
import { ColorInput, DEFAULT_THEME, FileInput, TextInput } from '@mantine/core'
import CNumberInput from '../input/number-input'

const EditCanvas = ({ canvas }: { canvas: ICanvas }) => {
  const { updateCanvasStyle, updateCanvasTitle } = useEditStore()

  const { title } = canvas
  const { width, height, backgroundColor } = canvas.content.style

  const handleCanvasPropsChange = ({ name, value }: { name: string; value: string | number }) => {
    updateCanvasStyle({ [name]: value })
  }
  return (
    <>
      <h3 className=" px-5 pt-4 text-xs uppercase">画布设计</h3>
      <span className="mt-3 border-b border-primary-grey-200 px-5 pb-4 text-xs text-primary-grey-300">
        根据您的喜好对画布进行更改
      </span>
      {/* 画布宽高 */}
      <section className="flex flex-col border-b border-primary-grey-200">
        <div className="flex flex-col gap-4 px-6 py-3">
          <CNumberInput
            defaultValue={width as string}
            onChange={handleCanvasPropsChange}
            id="w"
            event="width"
          />
          <CNumberInput
            defaultValue={height as string}
            onChange={handleCanvasPropsChange}
            id="h"
            event="height"
          />
        </div>
      </section>
      <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
        <div className="flex flex-col gap-3  border-primary-grey-200 ">
          <div className="flex flex-col gap-3">
            <label htmlFor="canvasTitle" className="text-[10px] font-bold">
              画布标题
            </label>
            <TextInput
              id="canvasTitle"
              className="no-ring w-full rounded-sm border border-primary-grey-200"
              description="  "
              onChange={(e) => {
                updateCanvasTitle(e.target.value)
              }}
              defaultValue={title}
              classNames={{
                input: 'text-primary-grey-300 input-ring px-4',
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
        <div className="flex flex-col gap-3  border-primary-grey-200 ">
          <div className="flex flex-col gap-3">
            <label htmlFor="canvasColor" className="text-[10px] font-bold">
              颜色
            </label>
            <ColorInput
              id="canvasColor"
              disallowInput
              description=" "
              withPicker={false}
              defaultValue={backgroundColor}
              onChange={(color) => {
                handleCanvasPropsChange({ name: 'backgroundColor', value: color })
              }}
              className="no-ring w-full rounded-sm border border-primary-grey-200"
              classNames={{
                input: 'text-primary-grey-300 input-ring px-12',
              }}
              swatches={[
                ...DEFAULT_THEME.colors.red,
                ...DEFAULT_THEME.colors.green,
                ...DEFAULT_THEME.colors.blue,
              ]}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
        <div className="flex flex-col gap-3">
          <label htmlFor="canvasBgImage" className="text-[10px] font-bold">
            背景图片
          </label>
          <FileInput
            id="canvasBgImage"
            className="no-ring w-full rounded-sm border border-primary-grey-200"
            classNames={{
              input: 'text-primary-grey-300 input-ring px-12',
            }}
            accept="image/png,image/jpeg"
            placeholder="点击上传图片"
          />
        </div>
      </div>
    </>
  )
}

export default EditCanvas
