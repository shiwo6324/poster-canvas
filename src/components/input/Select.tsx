import { Select } from '@mantine/core'

interface CSelectProps {
  onChange: (value: number | string) => void
  data: { label: string; value: string }[]
  defaultValue: string
}

const CSelect = ({ onChange, data, defaultValue }: CSelectProps) => {
  return (
    <div className="">
      <Select
        defaultValue={defaultValue}
        data={data}
        onChange={onChange}
        className="  rounded-none border   border-primary-grey-200    bg-transparent outline-none  ring-offset-0 focus:ring-1  focus:ring-primary-green focus:ring-offset-0 focus-visible:ring-offset-0"
        classNames={{
          input: 'text-primary-grey-300 input-ring px-4',
          dropdown: 'bg-primary-black border-none text-primary-grey-300 ',
          option: 'hover:bg-primary-green hover:text-primary-black',
        }}
        // hover:text-primary-green
        variant="unstyled"
      />
    </div>
  )
}

export default CSelect
