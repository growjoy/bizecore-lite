import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

function parseYmd(value) {
    if (!value || typeof value !== 'string') return null;
    const [y, m, d] = value.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
}

function toYmd(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function toDisplay(value) {
    const date = parseYmd(value);
    if (!date) return 'Pick a date';
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function startOfMonthGrid(monthDate) {
    const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const dayOfWeek = first.getDay();
    return new Date(first.getFullYear(), first.getMonth(), 1 - dayOfWeek);
}

export default function StyledDatePicker({
    value,
    onChange,
    className = '',
}) {
    const selectedDate = parseYmd(value);
    const today = new Date();
    const [month, setMonth] = useState(
        selectedDate
            ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
            : new Date(today.getFullYear(), today.getMonth(), 1)
    );

    useEffect(() => {
        if (selectedDate) {
            setMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
        }
    }, [value]);

    const days = useMemo(() => {
        const start = startOfMonthGrid(month);
        return Array.from({ length: 42 }, (_, i) => {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            return date;
        });
    }, [month]);

    const goPrevMonth = () => {
        setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goNextMonth = () => {
        setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    return (
        <Popover className={`relative ${className}`}>
            {({ close }) => (
                <>
                    <Popover.Button className="relative w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 pl-11 text-left text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500">
                        <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
                        <span className={selectedDate ? 'text-slate-800' : 'text-slate-400'}>
                            {toDisplay(value)}
                        </span>
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-150"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel className="absolute left-0 top-full z-[420] mt-2 w-[290px] rounded-3xl border border-slate-100 bg-white p-4 shadow-2xl shadow-slate-200/70">
                            <div className="mb-3 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={goPrevMonth}
                                    className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <p className="text-sm font-black text-slate-800">
                                    {MONTHS[month.getMonth()]} {month.getFullYear()}
                                </p>
                                <button
                                    type="button"
                                    onClick={goNextMonth}
                                    className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="mb-2 grid grid-cols-7 gap-1">
                                {WEEKDAYS.map((day) => (
                                    <div key={day} className="py-1 text-center text-[10px] font-black uppercase tracking-wider text-slate-400">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {days.map((date) => {
                                    const isCurrentMonth = date.getMonth() === month.getMonth();
                                    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                                    const isToday = isSameDay(date, today);

                                    return (
                                        <button
                                            key={toYmd(date)}
                                            type="button"
                                            onClick={() => {
                                                onChange(toYmd(date));
                                                close();
                                            }}
                                            className={`h-9 rounded-xl text-xs font-black transition-all ${isSelected
                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                                    : isCurrentMonth
                                                        ? 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
                                                        : 'text-slate-300 hover:bg-slate-100'
                                                } ${isToday && !isSelected ? 'ring-2 ring-indigo-200' : ''}`}
                                        >
                                            {date.getDate()}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                                <button
                                    type="button"
                                    onClick={() => onChange('')}
                                    className="rounded-lg px-2 py-1 text-[11px] font-black text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                >
                                    Clear
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange(toYmd(today));
                                        close();
                                    }}
                                    className="rounded-lg px-2 py-1 text-[11px] font-black text-indigo-600 hover:bg-indigo-50"
                                >
                                    Today
                                </button>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
