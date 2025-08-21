"use client";
import { useEscapeKeyListener, useOnClickOutside } from "hooks/common";
import { useEffect, useMemo, useRef, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value?: string[];
  defaultValue?: string[];
  onChange: (selectedOptions: string[]) => void;
  label?: string;
  labelClassName?: string;
  className?: string;
  showRequiredAsterik?: boolean;
  closeInModal?: boolean;
  error?: {
    message?: string;
  };
  placeholder?: string
};

export const DropdownCheckbox = ({
  options,
  value,
  defaultValue,
  onChange,
  label,
  labelClassName,
  className,
  showRequiredAsterik = false,
  closeInModal = false,
  error,
  placeholder
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    defaultValue || []
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false), closeInModal);
  useEscapeKeyListener(() => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    const selected = [...selectedOptions];
    if (selected.includes(optionValue)) {
      selected.splice(selected.indexOf(optionValue), 1);
    } else {
      selected.push(optionValue);
    }

    setSelectedOptions(selected);
    onChange(selected);
  };

  useEffect(() => {
    if (defaultValue && onChange) {
      onChange(defaultValue);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useMemo(() => {
    if (value && value.length > 0) setSelectedOptions(value);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const getSelectionText = (selectedOptions: string[]) => {
    const selectedLabels = options
      .filter((option) => selectedOptions.includes(option.value))
      .map((option) => option.label);

    // show max 3 selected labels, if more than 3 show "x more"
    if (selectedLabels.length > 3) {
      return `${selectedLabels.slice(0, 3).join(", ")} + ${selectedLabels.length - 3
        } more`;
    }
    return selectedLabels.join(", ");
  };

  return (
    <div className="py-3">
      {label && (
        <label
          htmlFor={label}
          className={`block text-xs font-medium  ${labelClassName}`}
        >
          {label}{" "}
          {showRequiredAsterik && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative mt-1 rounded-md" ref={dropdownRef}>
        <button
          type="button"
          className="inline-flex items-center justify-between mt-2 outline-0 placeholder-[#515151] text-gray-600 block w-full h-11  text-sm rounded p-2  border border-slate-300 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
        >
          {selectedOptions.length === 0
            ? placeholder ?? "Select an option"
            : getSelectionText(selectedOptions)}
          <svg
            className="-mr-1 ml-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l4 4 4-4" />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"
            } z-10 ${className} absolute  w-full py-1 mt-1 bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <input
                type="checkbox"
                className="mr-2 leading-tight"
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionClick(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
      <p className="capitalize text-red-500 text-xs">{error?.message}</p>
    </div>
  );
};
