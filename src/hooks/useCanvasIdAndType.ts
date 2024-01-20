import { useSearchParams } from 'react-router-dom'

export function useCanvasId() {
  const [params] = useSearchParams()
  const id = params.get('id')

  return id ? parseInt(id) : null // 确保在转换前检查 id 是否为 null
}

export function useCanvasType() {
  const [params] = useSearchParams()
  const type = params.get('type')
  return type || 'content'
}
