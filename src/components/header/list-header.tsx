import { AppShell, Image } from '@mantine/core'

const ListHeader = () => {
  return (
    <AppShell.Header
      px={20}
      className="border-primary-grey-200 bg-primary-black"
    >
      <div className="flex h-full select-none items-center justify-between gap-4 bg-primary-black px-5 text-white">
        <Image className="h-5 w-14" src={'../../../public/fig.svg'} />
      </div>
    </AppShell.Header>
  )
}

export default ListHeader
