import { NumberInput } from '@mantine/core'

interface CNumberInputProps {
  onChange: (props: { name: string; value: number | string }) => void
  id?: string
  defaultValue: string
  event: string
  valueSuffix?: string
}

const CNumberInput = ({ id, event, valueSuffix, defaultValue, onChange }: CNumberInputProps) => {
  return (
    <div className="flex flex-1 items-center gap-6 rounded-sm">
      {id && (
        <label htmlFor={id} className="text-[14px] font-bold">
          {id}
        </label>
      )}
      <NumberInput
        id={id}
        variant="unstyled"
        className=" rounded-none border-none   bg-transparent  outline-none ring-offset-0 focus:ring-1  focus:ring-primary-green focus:ring-offset-0 focus-visible:ring-offset-0"
        onChange={(value) => {
          onChange({ name: event, value: valueSuffix ? value + valueSuffix : (value as number) })
        }}
        defaultValue={defaultValue}
        min={10}
        classNames={{
          input: 'text-primary-grey-300 input-ring px-4',
        }}
      />
    </div>
  )
}

export default CNumberInput
