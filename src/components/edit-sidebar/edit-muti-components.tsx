import {
  cancelGroupSelectedComponents,
  editSelectedComponentsStyle,
  groupSelectedComponents,
} from '@/src/store/editStore'
import { Button, Select } from '@mantine/core'

const EditMutiComponents = ({ isGroup }: { isGroup: boolean }) => {
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
        <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
          <h3 className="text-[10px] uppercase">页面对齐</h3>
          <Select
            className="  rounded-none border   border-primary-grey-200    bg-transparent outline-none  ring-offset-0 focus:ring-1  focus:ring-primary-green focus:ring-offset-0 focus-visible:ring-offset-0"
            classNames={{
              input: 'text-primary-grey-300 input-ring px-4',
              dropdown: 'bg-primary-black border-none text-primary-grey-300 ',
              option: 'hover:bg-primary-green hover:text-primary-black',
            }}
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
            data={[
              { label: '无', value: 'none' },
              { label: '左对齐', value: 'left' },
              { label: '右对齐', value: 'right' },
              { label: '垂直居中', value: 'y-center' },
              { label: '水平对齐', value: 'x-center' },
              { label: '上对齐', value: 'top' },
              { label: '下对齐', value: 'bottom' },
            ]}
          />
          {isGroup ? (
            <Button
              onClick={handleCancelGroupcomponents}
              variant="outline"
              className="w-full border border-primary-grey-100 text-primary-grey-300 transition-all hover:bg-primary-green hover:text-primary-black"
            >
              取消组合
            </Button>
          ) : (
            <Button
              onClick={handleGroupComponents}
              variant="outline"
              className="w-full border border-primary-grey-100 text-primary-grey-300 transition-all hover:bg-primary-green hover:text-primary-black"
            >
              组合
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default EditMutiComponents
