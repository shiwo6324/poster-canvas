import { useZoomStore } from 'src/store/zoom-store'

const Zoom = () => {
  const { zoomIn, zoomOut, setZoom, zoom } = useZoomStore()

  return (
    <div className="absolute bottom-6 flex items-center space-x-4">
      <button
        style={{ cursor: 'zoom-out' }}
        className="rounded bg-blue-500 px-2 py-1 text-white"
        onClick={zoomOut}
      >
        -
      </button>

      <input
        type="text"
        className="w-16 rounded border px-2 py-1 text-center"
        value={zoom}
        id="counterInput"
        onChange={(e) => {
          setZoom(parseInt(e.target.value))
        }}
      />
      <button
        style={{ cursor: 'zoom-in' }}
        className="rounded bg-green-500 px-2 py-1 text-white"
        onClick={zoomIn}
      >
        +
      </button>
    </div>
  )
}

export default Zoom
