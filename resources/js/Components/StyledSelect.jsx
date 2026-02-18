import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

function toKey(value) {
    if (value === null || value === undefined) return '';
    return String(value);
}

export default function StyledSelect({
    value,
    onChange,
    options = [],
    placeholder = 'Select option',
    className = '',
}) {
    const normalizedValue = toKey(value);
    const normalizedOptions = options.map((opt) => ({
        ...opt,
        value: toKey(opt.value),
    }));

    const selected = normalizedOptions.find((opt) => opt.value === normalizedValue);

    return (
        <Listbox value={normalizedValue} onChange={onChange}>
            <div className={`relative ${className}`}>
                <Listbox.Button className="relative w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 pr-12 text-left text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500">
                    <span className={`block truncate ${selected ? 'text-slate-800' : 'text-slate-400'}`}>
                        {selected ? selected.label : placeholder}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    </span>
                </Listbox.Button>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute left-0 top-full z-[420] mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-200/70 focus:outline-none">
                        {normalizedOptions.map((opt) => (
                            <Listbox.Option
                                key={opt.value}
                                value={opt.value}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none rounded-xl px-4 py-2.5 pr-10 text-sm font-bold transition-all ${active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'
                                    }`
                                }
                            >
                                {({ selected: isSelected }) => (
                                    <>
                                        <span className={`block truncate ${isSelected ? 'text-indigo-700' : ''}`}>
                                            {opt.label}
                                        </span>
                                        {isSelected && (
                                            <span className="absolute inset-y-0 right-3 flex items-center text-indigo-600">
                                                <Check className="h-4 w-4" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
}
