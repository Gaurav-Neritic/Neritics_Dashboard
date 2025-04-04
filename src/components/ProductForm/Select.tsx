import React from 'react'

type Label = {
    label: string;
};

interface selectProps {
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent) => void,
    options: Array<Label>,
    defaultOption: string
}

const Select = ({ name, value, onChange, options, defaultOption }: selectProps) => {
    return (
        <select
            className='w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode'
            name={name} value={value} onChange={onChange}>
            <option >{defaultOption}</option>
            {
                options.map((option, index) => {
                    return (
                        <option key={index} >{option.label}</option>
                    )
                })
            }
        </select>
    )
}

export default Select
