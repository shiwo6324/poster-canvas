import { TextInput } from '@mantine/core'

interface TextInputProps {
  onChange: (value: string) => void
  id: string
  defaultValue: string
}

const CTextInput = ({ id, defaultValue, onChange }: TextInputProps) => {
  return (
    <div className="flex flex-1 items-center gap-6 rounded-sm">
      {/* <label htmlFor={id} className="text-[14px] font-bold">
        {id}
      </label> */}

      <TextInput
        id={id}
        className=" rounded-none border-none   bg-transparent  outline-none ring-offset-0 focus:ring-1  focus:ring-primary-green focus:ring-offset-0 focus-visible:ring-offset-0"
        classNames={{
          input: 'text-primary-grey-300 input-ring px-4',
        }}
        variant="unstyled"
        onChange={(e) => {
          onChange(e.target.value)
        }}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default CTextInput
