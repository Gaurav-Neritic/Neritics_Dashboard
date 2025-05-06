"use client"


interface inputProps {
    name: string,
    value: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent) => void,
}
const Input = ({ name, value, onChange, placeholder }: inputProps) => {
    return (
        <input type="text" required name={name} value={value} onChange={onChange} placeholder={placeholder} className='block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0' />
    )
}

export default Input
