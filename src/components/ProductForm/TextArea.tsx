"use client"


interface inputProps {
    name: string,
    value: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent) => void,
    rows: number
}

const TextArea = ({ name, value, onChange, placeholder, rows }: inputProps) => {
    return (
        <textarea name={name} required value={value} rows={rows} onChange={onChange} placeholder={placeholder} className='block w-full border border-lightBorder dark:border-darkBorder outline-none focus:outline-0 px-4 py-2 mt-2 rounded' />
    )
}

export default TextArea
