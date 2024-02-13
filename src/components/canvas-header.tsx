import { AppShell, Tooltip } from '@mantine/core'
import { BsFileEarmarkText } from 'react-icons/bs'
import { MdOutlinePreview } from 'react-icons/md'
import { TbArrowBack, TbArrowForward } from 'react-icons/tb'
import { unstable_usePrompt, useNavigate } from 'react-router-dom'
import { useCanvasId, useCanvasType } from 'src/hooks/useCanvasIdAndType'
import { FaTrashCan } from 'react-icons/fa6'

import { saveCanvas } from 'src/request/canvas'
import {
  clearCanvas,
  getNextCanvasHistory,
  getPrevCanvasHistory,
  setSaveCanvas,
  updateCanvasId,
  useEditStore,
} from 'src/store/editStore'
import { toast } from 'sonner'
import { useZoomStore } from 'src/store/zoom-store'

const CanvasHeader = () => {
  const { canvas, hasSaved } = useEditStore()
  const { resetZoom } = useZoomStore()
  const navigate = useNavigate()
  const id = useCanvasId()
  const type = useCanvasType()
  unstable_usePrompt({
    when: !hasSaved,
    message: '离开后数据将不会被保存，确认要离开吗？',
  })

  const handleSaveCanvas = async () => {
    const isNew = canvas.id == null
    await saveCanvas(
      {
        id,
        content: JSON.stringify(canvas),
        type: type,
        title: canvas.title,
      },
      (_id) => {
        if (isNew) {
          updateCanvasId(_id)
          navigate(`/edit?id=${_id}`)
        }
        toast.success('保存成功')
        setSaveCanvas(true)
      },
    )
  }

  const handleSaveAndPreview = async () => {
    await saveCanvas(
      {
        id,
        content: JSON.stringify(canvas),
        type: type,
        title: canvas.title,
      },
      (_id) => {
        if (id === null) {
          navigate(`/?id=${_id}`)
          toast.success('保存成功')
        }
      },
    )
  }

  const handleClearCanvas = () => {
    clearCanvas()
    resetZoom()
  }
  return (
    <AppShell.Header px={20} className="bg-primary-black">
      <ul className="flex h-full w-full  items-center justify-center  gap-3 text-primary-grey-300">
        {/* <li className=" cursor-pointer" onClick={() => navigate('/list')}>
          查看列表
        </li> */}
        <Tooltip label="保存" openDelay={200}>
          <li
            onClick={handleSaveCanvas}
            className="group flex h-full cursor-pointer  items-center gap-1 px-2.5 py-5 transition-all hover:cursor-pointer hover:bg-primary-grey-200 "
          >
            <BsFileEarmarkText size={25} className=" " />
          </li>
        </Tooltip>
        <Tooltip label="保存并预览" openDelay={200}>
          <li
            onClick={handleSaveAndPreview}
            className="group flex h-full cursor-pointer  items-center gap-1 px-2.5 py-5 transition-all hover:cursor-pointer hover:bg-primary-grey-200 "
          >
            <MdOutlinePreview size={25} />
          </li>
        </Tooltip>
        <Tooltip label="上一步" openDelay={200}>
          <li
            onClick={getPrevCanvasHistory}
            className="group flex h-full cursor-pointer  items-center gap-1 px-2.5 py-5 transition-all hover:cursor-pointer hover:bg-primary-grey-200 "
          >
            <TbArrowBack size={25} />
          </li>
        </Tooltip>
        <Tooltip label="下一步" openDelay={200}>
          <li
            onClick={getNextCanvasHistory}
            className="group flex h-full cursor-pointer  items-center gap-1 px-2.5 py-5 transition-all hover:cursor-pointer hover:bg-primary-grey-200 "
          >
            <TbArrowForward size={25} />
          </li>
        </Tooltip>
        <Tooltip label="清空画布" openDelay={200}>
          <li
            onClick={handleClearCanvas}
            className="group flex h-full cursor-pointer  items-center gap-1 px-2.5 py-5 transition-all hover:cursor-pointer hover:bg-primary-grey-200 "
          >
            <FaTrashCan size={20} />
          </li>
        </Tooltip>
      </ul>
    </AppShell.Header>
  )
}

export default CanvasHeader
