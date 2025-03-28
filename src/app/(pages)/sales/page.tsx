import React from 'react'

const SalesPage = () => {
  return (
    <>
      <div className='p-10'>
        <div className="block w-full">
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-600 w-full">Country</label>
          <select id="countries" className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none">
            <option selected>Choose a country</option>
            <option value="US">India</option>
            <option value="CA">Bharat</option>
            <option value="FR">Hindustan</option>
            <option value="DE">Aryavarta</option>
          </select>
        </div>

      </div>
      <div className="relative">
        <button className="flex items-center h-8 pl-3 pr-2 border border-black focus:outline-none">
          <span className="text-sm leading-none">
            Dropdown
          </span>
          <svg className="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <div className="absolute flex flex-col w-40 mt-1 border border-black shadow-lg">
          <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" href="#">Item 1</a>
          <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" href="#">Item 2</a>
          <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" href="#">Item 3</a>
          <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" href="#">Item 4</a>
        </div>
      </div>
    </>
  )
}

export default SalesPage