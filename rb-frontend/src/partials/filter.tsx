import { useState, useRef } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useClickAway } from "react-use";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const DateFilter = ({
  onFilter,
}: {
  onFilter: (range: Range) => void;
}) => {
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);
  const [focusedRange, setFocusedRange] = useState<[number, 0 | 1]>([0, 0]);
  const [showCalendar, setShowCalendar] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickAway(wrapperRef, () => setShowCalendar(false));

  const handleFilter = () => {
    setShowCalendar(false);
    if (dateRange[0].startDate && dateRange[0].endDate) {
      onFilter(dateRange[0]);
    } else {
      alert("Please select both check-in and checkout dates.");
    }
  };

  const handleDateChange = (item: RangeKeyDict) => {
    const { startDate, endDate } = item.selection;

    setDateRange((prevRange) => {
      const newStartDate = startDate || prevRange[0].startDate;
      let newEndDate = endDate || prevRange[0].endDate;

      // Ensure that endDate is always after or equal to startDate
      if (newEndDate && newStartDate && newEndDate < newStartDate) {
        newEndDate = newStartDate;
      }

      return [
        {
          startDate: newStartDate,
          endDate: newEndDate,
          key: "selection",
        },
      ];
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center space-x-8 py-2 px-3 bg-white shadow-lg rounded-full border border-divider-color max-w-lg mx-auto"
    >
      {/* Date selection area */}
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setShowCalendar(!showCalendar)}
        className="flex items-center space-x-4 cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <CalendarDaysIcon className="h-5 w-5 text-primary-text" />
        <div
          className="hover:bg-gray-100 focus:bg-gray-100 transition px-4 py-1 rounded-full"
          tabIndex={0}
        >
          <p className="text-sm font-medium text-gray-500">Check-in/Acquire</p>
          <p className="font-semibold text-gray-800">
            {dateRange[0].startDate
              ? dateRange[0].startDate.toLocaleDateString()
              : "Select a date"}
          </p>
        </div>
        <div className="border-l h-6 mx-2"></div>
        <div
          className="hover:bg-gray-100 focus:bg-gray-100 transition px-4 py-1 rounded-full"
          tabIndex={0}
        >
          <p className="text-sm font-medium text-gray-500">Check-out/Release</p>
          <p className="font-semibold text-gray-800">
            {dateRange[0].endDate
              ? dateRange[0].endDate.toLocaleDateString()
              : "Select a date"}
          </p>
        </div>
      </div>

      {/* Filter button */}
      <button
        role="button"
        onClick={handleFilter}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-b from-indigo-600 to-purple-700 text-white font-bold focus:outline-none"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>

      {/* Calendar */}
      {showCalendar && (
        <div className="absolute top-16 left-0 right-0 z-10 bg-white shadow-lg rounded-xl p-4 overflow-auto max-h-96">
          <DateRange
            editableDateInputs
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={["#EC4899"]}
            minDate={new Date()}
            focusedRange={focusedRange}
            onRangeFocusChange={(range) => setFocusedRange(range)}
          />
        </div>
      )}
    </div>
  );
};
