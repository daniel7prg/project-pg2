import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export const Dropdown = ({listOptions, onView}) => {
    const [items, setItems] = useState(listOptions[0])

    const customAction = (e, item) => onView(item)

    return (
        <Listbox value={items} onChange={setItems}>
            <ListboxButton className="items-center justify-between flex ps-2 pe-1 py-2 border-2 border-mirage-200 rounded-lg shadow-sm bg-mirage-50 focus:outline-none focus:ring-minsk-500 focus:border-minsk-500 sm:text-sm">
                {items.name}
                <ChevronUpDownIcon className="ms-1 h-4 w-4 text-minsk-900" />
            </ListboxButton>
            <ListboxOptions anchor="bottom" className="bg-mirage-50">
                {listOptions.map((option) => (
                    <ListboxOption onClick={(e) => customAction(e, option) } key={option.id} value={option} className="cursor-pointer rounded-md border-b-2 border-mirage-200 group flex px-2 py-1.5 gap-2 data-[focus]:bg-minsk-500 data-[focus]:text-mirage-50 data-[focus]:rounded-lg data-[selected]:bg-bull-shot-500 data-[selected]:text-mirage-50 data-[selected]:rounded-lg"> 
                        <CheckIcon className="invisible size-5 group-data-[selected]:visible" />
                        {option.name}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    )
}