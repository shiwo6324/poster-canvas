import { AppShell, Button } from '@mantine/core'
import { PiTextTBold } from 'react-icons/pi'
import { FaImage } from 'react-icons/fa6'
import { RiRectangleLine } from 'react-icons/ri'

import classNames from 'classnames'

import { useSidebarTypeStore } from 'src/store/sidebarStore'
import { CompType } from 'src/types/const'

const Sidebar = () => {
  const { setType, type } = useSidebarTypeStore()
  return (
    <AppShell.Navbar
      w={'auto'}
      pos={'fixed'}
      className="bg-primary-black text-primary-grey-300 border-primary-grey-200 sticky left-0 h-full min-w-[227px] border-t"
    >
      <div className="flex flex-col gap-3 ">
        {/* <Button
          className={classNames(type === CompType.TEMPLATE ? '' : 'text-slate-500')}
          onClick={() => setType(CompType.TEMPLATE)}
          variant="transparent"
        >
          模板
        </Button> */}

        <Button
          className={classNames(
            'bg-primary-black hover:bg-primary-green  hover:text-primary-black w-full  rounded-none   transition-all hover:cursor-pointer',
            type === CompType.TEXT
              ? 'bg-primary-green text-primary-black'
              : 'text-primary-grey-300',
          )}
          onClick={() => setType(CompType.TEXT)}
          variant="transparent"
          leftSection={<PiTextTBold size={20} />}
        >
          <span className="">文本</span>
        </Button>
        <Button
          className={classNames(
            'bg-primary-black hover:bg-primary-green  hover:text-primary-black w-full rounded-none transition-all hover:cursor-pointer',
            type === CompType.IMAGE
              ? 'bg-primary-green text-primary-black'
              : 'text-primary-grey-300',
          )}
          onClick={() => setType(CompType.IMAGE)}
          variant="transparent"
          leftSection={<FaImage size={20} />}
        >
          图片
        </Button>
        <Button
          className={classNames(
            'bg-primary-black hover:bg-primary-green hover:text-primary-black w-full rounded-none transition-all hover:cursor-pointer',
            type === CompType.GRAPH
              ? 'bg-primary-green text-primary-black'
              : 'text-primary-grey-300',
          )}
          onClick={() => setType(CompType.GRAPH)}
          variant="transparent"
          leftSection={<RiRectangleLine size={20} />}
        >
          图形
        </Button>
      </div>
    </AppShell.Navbar>
  )
}

export default Sidebar
