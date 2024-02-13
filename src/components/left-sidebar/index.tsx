import { AppShell, Button, Menu } from '@mantine/core'
import { PiTextTBold } from 'react-icons/pi'
import { FaImage } from 'react-icons/fa6'
import { RiRectangleLine } from 'react-icons/ri'

import classNames from 'classnames'

import { setSidebarType, useSidebarTypeStore } from 'src/store/sidebarStore'
import { CompType } from 'src/types/const'
import TextSidebar from './text-sidebar'
import ImageSidebar from './image-sidebar'
import GraphSidebar from './graph-sidebar'

const Sidebar = () => {
  const { type } = useSidebarTypeStore()
  return (
    <AppShell.Navbar
      w={'auto'}
      pos={'fixed'}
      className="sticky left-0 h-full min-w-[227px] border-t border-primary-grey-200 bg-primary-black text-primary-grey-300"
    >
      <div className="flex flex-col gap-3 ">
        {/* <Button
          className={classNames(type === CompType.TEMPLATE ? '' : 'text-slate-500')}
          onClick={() => setType(CompType.TEMPLATE)}
          variant="transparent"
        >
          模板
        </Button> */}
        <Menu withArrow position="right-start" offset={10} key={'text'}>
          <Menu.Target>
            <Button
              className={classNames(
                'flex  w-full rounded-none bg-primary-black transition-all  hover:cursor-pointer   hover:bg-primary-green hover:text-primary-black',
                type === CompType.TEXT
                  ? 'bg-primary-green text-primary-black'
                  : 'text-primary-grey-300',
              )}
              onClick={() => setSidebarType(CompType.TEXT)}
              variant="transparent"
              leftSection={<PiTextTBold size={30} />}
            >
              <span className="">文本</span>
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="border-none bg-primary-black py-4  ">
            <TextSidebar />
          </Menu.Dropdown>
        </Menu>

        <Menu withArrow position="right-start" offset={10} key={'image'}>
          <Menu.Target>
            <Button
              className={classNames(
                'flex w-full  rounded-none  bg-primary-black transition-all  hover:cursor-pointer   hover:bg-primary-green hover:text-primary-black',
                type === CompType.IMAGE
                  ? 'bg-primary-green text-primary-black'
                  : 'text-primary-grey-300',
              )}
              onClick={() => setSidebarType(CompType.IMAGE)}
              variant="transparent"
              leftSection={<FaImage size={30} />}
            >
              <span className="">图片</span>
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="border-none bg-primary-black py-4  ">
            <ImageSidebar />
          </Menu.Dropdown>
        </Menu>

        <Menu withArrow position="right-start" offset={10} key={'graph'}>
          <Menu.Target>
            <Button
              className={classNames(
                'flex w-full rounded-none  bg-primary-black transition-all  hover:cursor-pointer   hover:bg-primary-green hover:text-primary-black',
                type === CompType.GRAPH
                  ? 'bg-primary-green text-primary-black'
                  : 'text-primary-grey-300',
              )}
              onClick={() => setSidebarType(CompType.GRAPH)}
              variant="transparent"
              leftSection={<RiRectangleLine size={30} />}
            >
              <span className="">图形</span>
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="border-none bg-primary-black py-4  ">
            <GraphSidebar />
          </Menu.Dropdown>
        </Menu>
        {/* <Button
          className={classNames(
            'w-full rounded-none  bg-primary-black transition-all  hover:cursor-pointer   hover:bg-primary-green hover:text-primary-black',
            type === CompType.TEXT
              ? 'bg-primary-green text-primary-black'
              : 'text-primary-grey-300',
          )}
          onClick={() => setType(CompType.TEXT)}
          variant="transparent"
          leftSection={<PiTextTBold size={20} />}
        >
          <span className="">文本</span>
        </Button> */}
        {/* <Button
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
        </Button> */}
      </div>
    </AppShell.Navbar>
  )
}

export default Sidebar
