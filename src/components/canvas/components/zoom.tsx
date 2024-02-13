import { useZoomStore } from 'src/store/zoom-store'
import { GoZoomIn, GoZoomOut } from 'react-icons/go'
import { Tooltip } from '@mantine/core'

const Zoom = () => {
  const { zoomIn, zoomOut, setZoom, zoom } = useZoomStore()

  return (
    <div className="absolute right-96  top-20 flex items-center space-x-2">
      <Tooltip label="缩小" position="bottom" openDelay={200}>
        <button
          style={{ cursor: 'zoom-out' }}
          className="rounded bg-primary-grey-200 px-2 py-1 text-white transition-all hover:bg-primary-green hover:text-primary-black"
          onClick={zoomOut}
        >
          <GoZoomOut />
        </button>
      </Tooltip>

      <input
        type="text"
        className="w-16 rounded border px-2 py-1 text-center"
        value={zoom}
        id="counterInput"
        onChange={(e) => {
          setZoom(parseInt(e.target.value))
        }}
      />
      <Tooltip label="放大" position="bottom" openDelay={200}>
        <button
          style={{ cursor: 'zoom-in' }}
          className="rounded bg-primary-black px-2 py-1 text-white transition-all hover:bg-primary-green hover:text-primary-black"
          onClick={zoomIn}
        >
          <GoZoomIn />
        </button>
      </Tooltip>
    </div>
  )
}

export default Zoom
