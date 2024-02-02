import ImageSidebar from './sidebar/image-sidebar'
import TextSidebar from './sidebar/text-sidebar'
import GraphSidebar from './sidebar/graph-sidebar'
import TemplateSidebar from './sidebar/template-sidebar'

const SidebarList = () => {
  return (
    <div className="h-full ">
      <TextSidebar />
      <ImageSidebar />
      <GraphSidebar />
      <TemplateSidebar />
    </div>
  )
}

export default SidebarList
