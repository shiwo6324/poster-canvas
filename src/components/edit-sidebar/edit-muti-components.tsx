import {
  cancelGroupSelectedComponents,
  groupSelectedComponents,
  useEditStore,
} from '@/src/store/editStore'
import { Button, NativeSelect } from '@mantine/core'

const EditMutiComponents = ({ isGroup }: { isGroup: boolean }) => {
  const { editSelectedComponentsStyle } = useEditStore()
  const handleGroupComponents = () => {
    groupSelectedComponents()
  }
  const handleCancelGroupcomponents = () => {
    cancelGroupSelectedComponents()
  }
  return (
    <>
      <h3 className=" px-5 pt-4 text-xs uppercase">组件设计</h3>
      <span className="mt-3 border-b border-primary-grey-200 px-5 pb-4 text-xs text-primary-grey-300">
        根据您的喜好对组件进行更改
      </span>
      <div className="px-3 py-3">
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
        {isGroup ? (
          <Button onClick={handleCancelGroupcomponents}>取消组合</Button>
        ) : (
          <Button onClick={handleGroupComponents}>组合</Button>
        )}
      </div>
    </>
  )
}

export default EditMutiComponents
