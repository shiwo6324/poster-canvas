import { useEditStore } from '@/src/store/editStore'
import { ICanvas } from '@/src/types/editStoreTypes'
import { ColorInput, DEFAULT_THEME, FileInput, NumberInput, TextInput } from '@mantine/core'

const EditCanvas = ({ canvas }: { canvas: ICanvas }) => {
  const { updateCanvasStyle, updateCanvasTitle } = useEditStore()

  const {
    title,
    style: { width, height, backgroundColor },
  } = canvas

  const handleCanvasPropsChange = (
    // e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string | number },
  ) => {
    updateCanvasStyle({ [name]: value })
  }
  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      <TextInput
        label="标题"
        description="  "
        onChange={(e) => {
          updateCanvasTitle(e.target.value)
        }}
        defaultValue={title}
      />
      <NumberInput
        label="画布宽度(px)"
        onChange={(number) => {
          handleCanvasPropsChange({ name: 'width', value: number })
        }}
        defaultValue={width}
        description=" "
      />
      <NumberInput
        label="画布高度(px)"
        onChange={(number) => {
          handleCanvasPropsChange({ name: 'height', value: number })
        }}
        defaultValue={height}
        description=" "
      />
      <ColorInput
        label="背景颜色"
        disallowInput
        description=" "
        withPicker={false}
        defaultValue={backgroundColor}
        onChange={(color) => {
          handleCanvasPropsChange({ name: 'backgroundColor', value: color })
        }}
        swatches={[
          ...DEFAULT_THEME.colors.red,
          ...DEFAULT_THEME.colors.green,
          ...DEFAULT_THEME.colors.blue,
        ]}
      />
      <FileInput
        accept="image/png,image/jpeg"
        placeholder="点击上传图片"
        label="背景图片"
        description=" "
      />

      {/* <div className="flex items-center gap-3">
        <label htmlFor="" className="w-16">
          标题
        </label>
        <TextInput size="md" />
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="" className="w-16">
          画布大小(px)
        </label>
        <TextInput size="md" />
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="" className="w-16">
          画布高度(px)
        </label>
        <TextInput size="md" />
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor="" className="w-16">
          背景颜色
        </label>
        <ColorInput
          className=" pl-2"
          size="md"
          placeholder="Pick color"
          disallowInput
          withEyeDropper={false}
          swatches={[
            ...DEFAULT_THEME.colors.red,
            ...DEFAULT_THEME.colors.green,
            ...DEFAULT_THEME.colors.blue,
          ]}
        />
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor="" className="w-16">
          背景图片
        </label>
        <TextInput size="md" />
      </div> */}
    </div>
  )
}

export default EditCanvas
