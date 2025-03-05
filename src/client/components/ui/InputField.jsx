import React from 'react'

export default function InputField({ label, type, placeholder, logo, disable, onChange, value, name }) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value, e.target.name);
            console.log(e.target.value);
        }
    };
    return (
        <div>
            {label && <label htmlFor={type} className='text-sm font-semibol'>{label}</label>}
            <div className="mt-1">
                {type !== "phone" ?
                    <span className='relative'>
                        {logo && <img className='w-5 absolute inset-y-0 m-auto mx-2' src={logo} alt="" />}
                        <input id={type} name={name ? name : type} type={type} disabled={disable && disable} autocomplete={type} required placeholder={placeholder ? placeholder : `Enter ${type}`} onChange={handleChange} value={value} className={`block w-full rounded-lg border-0 ${logo ? "pl-9" : "pl-2.5"} pl-3 pr-3 py-[8px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-colorPrimary sm:text-sm sm:leading-6 focus:outline-none`} />
                    </span>
                    :
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                            <label for="currency" className="sr-only">Currency</label>
                            <select id="currency" value={value && value} disabled={disable && disable} name="currency" className="h-full rounded-md border-0 bg-transparent py-0 pr-2 pl-3 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-colorPrimary sm:text-sm">
                                <option>US</option>
                                <option>UK</option>
                                <option>PK</option>
                            </select>
                        </div>
                        <input type={type} name={type} id={type} onChange={handleChange} minLength={10} maxLength={11} value={value} disabled={disable && disable} className="block w-full rounded-md border-0 py-1.5 pr-7 pl-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-colorPrimary sm:text-sm sm:leading-6 outline-none" placeholder="+40" />
                    </div>
                }
            </div>
        </div >
    )
}
