"use client"
import { OptionProps } from '@/types';
import { FaChevronDown, FaRegCircle } from 'react-icons/fa';
import { FaCirclePlus, FaRegSquare, FaSquarePlus } from 'react-icons/fa6';

function DropdownFilter({options, title, multi = true, onChange, isActive, onToggle, selectedItems} : {options: OptionProps[], title: string, multi?: boolean, onChange: any, isActive: boolean, onToggle: any, selectedItems: string[]}) {
    const handleCheckboxChange = (option: OptionProps) => {
        let updatedItems;
        if (multi) {
          if (selectedItems.includes(option.id)) {
            updatedItems = selectedItems.filter((item) => item !== option.id);
          } else {
            updatedItems = [...selectedItems, option.id];
          }
        } else {
            updatedItems = [option.id];
        }
        onChange(updatedItems);
    };

    const selectedLabels = selectedItems
        .map((id) => options.find((option) => option.id === id)?.name)
        .filter(Boolean);

    const selectedText = selectedLabels.length > 0 ? selectedLabels.join(', ') : title;
    return (  
        <div className="relative">
            <button type="button" 
                onClick={onToggle}
                className="text-[#747c88] hover:text-white hover:border-[#3c8bc6] hover:shadow-[#3c8bc6] hover:shadow-sm duration-300 bg-btn flex justify-between w-full border border-btnHover whitespace-nowrap overflow-hidden text-ellipsis h-[2.6rem] items-center px-[.8rem] rounded-lg transition-all"
            >
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{selectedText}</span>
                <FaChevronDown />
            </button>
            {isActive && (
            <ul className={`min-w-[100px] ${options.length > 10 ? `md:grid md:grid-cols-${Math.ceil(options.length / 10)} w-[80vw] md:w-[500px] fixed md:absolute top-[20vh] md:top-full left-[10vw] md:left-0 max-h-[55vh] overscroll-contain overflow-auto` : 'w-full absolute top-full left-0'} mt-1 p-2 z-50 text-[1rem] text-[#8f96a0] bg-btn border border-[#1e2c43] rounded-lg shadow-lg`}>
                {options.map((option) => (
                <li key={option.id} className="w-full float-left p-[1.5px] overflow-hidden flex items-center justify-between cursor-pointer">
                    {multi ? <>
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedItems.includes(option.id)}
                        onChange={() => handleCheckboxChange(option)}
                    />
                    <label onClick={() => handleCheckboxChange(option)} className={`overflow-hidden w-full text-ellipsis whitespace-nowrap py-[.2rem] px-2 ${selectedItems.includes(option.id) ? 'text-[#8bbadd] bg-[#1e2c43]' : 'text-[#747c88]'} rounded-lg hover:bg-[#1e2c43] hover:text-white flex items-center cursor-pointer`}>
                        {selectedItems.includes(option.id) ? <FaSquarePlus className='mr-1' /> : <FaRegSquare className='mr-1' />}
                        {option.name}
                    </label></>: <>
                    <input
                        type="radio"
                        className="hidden"
                        checked={selectedItems.includes(option.id)}
                        onChange={() => handleCheckboxChange(option)}
                    />
                    <label onClick={() => handleCheckboxChange(option)} className={`overflow-hidden w-full text-ellipsis whitespace-nowrap py-[.2rem] px-2 ${selectedItems.includes(option.id) ? 'text-[#8bbadd] bg-[#1e2c43]' : 'text-[#747c88]'} rounded-lg hover:bg-[#1e2c43] hover:text-white flex items-center cursor-pointer`}>
                        {selectedItems.includes(option.id) ? <FaCirclePlus className='mr-1' /> : <FaRegCircle className='mr-1' />}
                        {option.name}
                    </label>
                    </>}
                </li>
                ))}
            </ul>
            )}
        </div>
    );
}

export default DropdownFilter;