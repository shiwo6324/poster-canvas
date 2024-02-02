import { useEditStore } from '@/src/store/editStore'
import { ICanvas } from '@/src/types/editStoreTypes'
import { ColorInput, DEFAULT_THEME, FileInput, NumberInput, TextInput } from '@mantine/core'

const EditCanvas = ({ canvas }: { canvas: ICanvas }) => {
  const { updateCanvasStyle, updateCanvasTitle } = useEditStore()

  const { title } = canvas
  const { width, height, backgroundColor } = canvas.content.style

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
    </div>
  )
}

export default EditCanvas
