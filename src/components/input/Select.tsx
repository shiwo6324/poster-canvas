import { Select } from '@mantine/core'

interface CSelectProps {
  onChange: (props: { name: string; value: number | string }) => void
  data: { label: string; value: string }[]
  defaultValue: string
  event: string
  type: 'number' | 'text'
}

const CSelect = ({ type, onChange, data, defaultValue, event }: CSelectProps) => {
  return (
    <div className="">
      <Select
        defaultValue={defaultValue}
        data={data}
        onChange={(value) => {
          onChange({
            name: event,
            value: type === 'number' ? parseInt(value as string) : (value as string),
          })
        }}
        className=" rounded-none border-none   bg-transparent  outline-none ring-offset-0 focus:ring-1  focus:ring-primary-green focus:ring-offset-0 focus-visible:ring-offset-0"
        classNames={{
          input: 'text-primary-grey-300 input-ring px-4',
        }}
        variant="unstyled"
      />
    </div>
  )
}

export default CSelect
