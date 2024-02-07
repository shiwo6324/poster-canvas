import ImageSidebar from './left-sidebar/image-sidebar'
import TextSidebar from './left-sidebar/text-sidebar'
import GraphSidebar from './left-sidebar/graph-sidebar'
import TemplateSidebar from './left-sidebar/template-sidebar'

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
