import ImageSidebar from './sidebar/image-sidebar'
import TextSidebar from './sidebar/text-sidebar'
import GraphSidebar from './sidebar/graph-sidebar'

const SidebarList = () => {
  return (
    <div className="h-full ">
      <TextSidebar />
      <ImageSidebar />
      <GraphSidebar />
    </div>
  )
}

export default SidebarList
