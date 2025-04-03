"use client"

interface inputProps {
    name: string,
    value: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent) => void,
}

const InputNumber = ({ name, value, onChange, placeholder }: inputProps) => {
    return (
        <input type="number" min={0} name={name} value={value} onChange={onChange} placeholder={placeholder} className='block w-full border border-lightBorder dark:border-darkBorder outline-none focus:outline-0 px-4 py-2 mt-2 rounded' />
    )
}

export default InputNumber
