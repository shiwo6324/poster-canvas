import { AppShell } from '@mantine/core'
import { BsFileEarmarkText } from 'react-icons/bs'
import { GiBroom } from 'react-icons/gi'
import { MdOutlinePreview } from 'react-icons/md'
import { TbArrowBack, TbArrowForward } from 'react-icons/tb'
import { unstable_usePrompt, useNavigate } from 'react-router-dom'
import { useCanvasId, useCanvasType } from 'src/hooks/useCanvasIdAndType'
import { saveCanvas } from 'src/request/canvas'
import { useEditStore } from 'src/store/editStore'
import { toast } from 'sonner'
import { useZoomStore } from 'src/store/zoom-store'

const CanvasHeader = () => {
  const {
    canvas,
    clearCanvas,
    getNextCanvasHistory,
    getPrevCanvasHistory,
    updateCanvasId,
    setSaveCanvas,
    hasSaved,
  } = useEditStore()
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
    <AppShell.Header px={20}>
      <ul className="flex h-full items-center justify-between gap-3">
        <li className="cursor-pointer hover:text-sky-500" onClick={() => navigate('/list')}>
          查看列表
        </li>
        <li className="group flex cursor-pointer items-center gap-1">
          <BsFileEarmarkText size={20} className="group-hover:text-sky-500" />
          <p className="group-hover:text-sky-500" onClick={handleSaveCanvas}>
            保存
          </p>
        </li>
        <li className="group flex cursor-pointer items-center gap-1">
          <MdOutlinePreview size={20} className="group-hover:text-sky-500" />
          <p className="group-hover:text-sky-500" onClick={handleSaveAndPreview}>
            保存并预览
          </p>
        </li>
        <li className="group flex cursor-pointer items-center gap-1" onClick={getPrevCanvasHistory}>
          <TbArrowBack size={20} className="group-hover:text-sky-500" />
          <p className="group-hover:text-sky-500">上一步</p>
        </li>
        <li className="group flex cursor-pointer items-center gap-1" onClick={getNextCanvasHistory}>
          <TbArrowForward size={20} className="group-hover:text-sky-500" />
          <p className="group-hover:text-sky-500">下一步</p>
        </li>
        <li className="group flex cursor-pointer items-center gap-1">
          <GiBroom size={20} className="group-hover:text-red-500" />
          <p className="group-hover:text-red-500" onClick={handleClearCanvas}>
            清空
          </p>
        </li>
      </ul>
    </AppShell.Header>
  )
}

export default CanvasHeader
