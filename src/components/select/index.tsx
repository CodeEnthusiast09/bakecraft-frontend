// import { forwardRef, useId } from "react";
// import { Option, SelectProps } from "./Select.type";
// import { FaCaretDown } from "react-icons/fa";

// export const Select = forwardRef<HTMLSelectElement, SelectProps>(
//   (
//     {
//       error,
//       label,
//       labelClassName,
//       className,
//       placeholder,
//       defaultValue,
//       onChange,
//       showRequiredAsterik = false,
//       options,
//       ...rest
//     },
//     ref
//   ) => {
//     const id = useId();
//     return (
//       <div className="py-3">
//         {label && (
//           <label
//             htmlFor={id}
//             className={`flex items-center gap-1 text-base font-light  ${
//               labelClassName ? labelClassName : "text-primary-300"
//             }`}
//           >
//             {label}

//             {showRequiredAsterik && <span className="text-red-500">*</span>}
//           </label>
//         )}

//         <div className="relative mt-1 rounded-md">
//           <select
//             id={id}
//             aria-invalid={error ? "true" : "false"}
//             onChange={onChange ? onChange : undefined}
//             defaultValue={defaultValue}
//             className={`mt-2 outline-0 font-light text-primary-500 block w-full h-12  text-base rounded p-2 border border-primary-500 focus:outline-1 focus:outline-primary-500 appearance-none pr-10  ${className}`}
//             ref={ref}
//             {...rest}
//           >
//             <option value="">{placeholder ? placeholder : "Select"}</option>

//             {options &&
//               options.map((option: Option, index: number) => {
//                 return (
//                   <option key={index} value={option.value}>
//                     {option.label}
//                   </option>
//                 );
//               })}
//           </select>

//           <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-black">
//             <FaCaretDown size={20} />
//           </span>
//         </div>
//         <p className="text-red-500 text-xs">{error?.message}</p>
//       </div>
//     );
//   }
// );

// Select.displayName = "Select";

import React, { forwardRef, useId, useState, useRef, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Option, SelectProps } from "./Select.type";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      error,
      label,
      labelClassName,
      className,
      placeholder,
      defaultValue,
      onChange,
      showRequiredAsterik = false,
      options = [],
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const id = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue || "");
    const [selectedLabel, setSelectedLabel] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const hiddenSelectRef = useRef<HTMLSelectElement>(null);

    // Set initial selected label
    useEffect(() => {
      if (defaultValue) {
        const option = options.find((opt) => opt.value === defaultValue);
        if (option) {
          setSelectedLabel(option.label);
        }
      }
    }, [defaultValue, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleSelect = (option: Option) => {
      setSelectedValue(option.value);
      setSelectedLabel(option.label);
      setIsOpen(false);

      // Update the hidden select and trigger onChange
      if (hiddenSelectRef.current && onChange) {
        hiddenSelectRef.current.value = option.value.toString();
        const syntheticEvent = {
          target: hiddenSelectRef.current,
          currentTarget: hiddenSelectRef.current,
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }
    };

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div className="py-3">
        {label && (
          <label
            htmlFor={id}
            className={`flex items-center gap-1 text-base font-light ${
              labelClassName ? labelClassName : "text-primary-300"
            }`}
          >
            {label}
            {showRequiredAsterik && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative mt-1 rounded-md" ref={dropdownRef}>
          {/* Hidden select for form compatibility */}
          <select
            ref={(node) => {
              hiddenSelectRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            id={id}
            value={selectedValue}
            disabled={disabled}
            onChange={onChange ? onChange : undefined}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
            {...rest}
          >
            <option value="">{placeholder || "Select"}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom Select Button */}
          <button
            ref={buttonRef}
            type="button"
            onClick={toggleDropdown}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className={`mt-2 outline-0 font-light text-primary-500 block w-full h-12 text-base rounded p-2 border border-primary-500 focus:outline-1 focus:outline-primary-500 appearance-none pr-10 text-left bg-white ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${className || ""}`}
          >
            <span
              className={selectedLabel ? "text-primary-500" : "text-gray-400"}
            >
              {selectedLabel || placeholder || "Select"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-black">
              <FaCaretDown
                size={20}
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>

          {/* Custom Dropdown */}
          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              <ul role="listbox" className="py-1">
                {options.length === 0 ? (
                  <li className="px-3 py-2 text-gray-500 text-sm">
                    No options available
                  </li>
                ) : (
                  options.map((option, index) => {
                    const isSelected = option.value === selectedValue;
                    return (
                      <li
                        key={index}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(option)}
                        className={`relative px-3 py-2 cursor-pointer select-none text-base transition-colors duration-150 ${
                          isSelected
                            ? "bg-primary-100/40 text-primary-100"
                            : "text-primary-100 hover:bg-primary-100/40"
                        }`}
                      >
                        <span className="block truncate">{option.label}</span>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>

        {error?.message && (
          <p className="text-red-500 text-xs">{error.message}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
