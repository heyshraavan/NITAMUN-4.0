import React, { useState, useRef, useEffect, useId } from 'react';
import { Search, X, Check } from 'lucide-react';

interface PortfolioAutocompleteProps {
  id: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
  suggestions: string[];
  otherSelectedPortfolios?: string[];
  label: string;
}

export const PortfolioAutocomplete: React.FC<PortfolioAutocompleteProps> = ({
  id,
  value,
  onChange,
  disabled = false,
  placeholder = 'Type portfolio name...',
  suggestions,
  otherSelectedPortfolios = [],
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  // Normalize and filter suggestions based on current input text
  const trimmedValue = value.trim().toLowerCase();
  const filteredSuggestions = trimmedValue
    ? suggestions.filter((item) => item.toLowerCase().includes(trimmedValue))
    : [];

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen && trimmedValue) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else if (filteredSuggestions.length > 0) {
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen && filteredSuggestions.length > 0) {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
      }
    } else if (e.key === 'Enter') {
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
        e.preventDefault();
        const selected = filteredSuggestions[highlightedIndex];
        onChange(selected);
        setIsOpen(false);
        setHighlightedIndex(-1);
      } else {
        // Allow user to keep their manual input
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    } else if (e.key === 'Tab') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    onChange(newVal);
    // Show suggestions only when there is text
    if (newVal.trim().length > 0) {
      setIsOpen(true);
      setHighlightedIndex(-1);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelectSuggestion = (portfolio: string) => {
    onChange(portfolio);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-label={label}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (trimmedValue.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Select committee first' : placeholder}
          autoComplete="off"
          className="w-full px-3.5 py-2.5 pr-14 bg-[#F6F4EB] text-[#25231F] border border-[#25231F]/20 rounded-xs font-body text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB1B29] disabled:bg-[#EBE9D8] disabled:text-[#25231F]/40 disabled:cursor-not-allowed placeholder:text-[#25231F]/40"
        />

        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-[#25231F]/50 hover:text-[#CB1B29] transition-colors cursor-pointer rounded-xs"
              aria-label="Clear portfolio"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <Search className="w-3.5 h-3.5 text-[#25231F]/40 pointer-events-none" />
        </div>
      </div>

      {/* Suggestion Dropdown */}
      {isOpen && !disabled && trimmedValue.length > 0 && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1 max-h-56 overflow-y-auto bg-[#F6F4EB] border border-[#25231F]/20 rounded-xs shadow-xl z-30 overscroll-contain animate-in fade-in-50 duration-150"
        >
          {filteredSuggestions.length > 0 ? (
            <div className="py-1">
              <div className="px-3 py-1 text-[10px] font-mono-tech uppercase text-[#CB1B29] tracking-wider border-b border-[#25231F]/10 flex items-center justify-between">
                <span>Matching Portfolios</span>
                <span>{filteredSuggestions.length} found</span>
              </div>

              {filteredSuggestions.map((portfolio, index) => {
                const isSelected = value.trim().toLowerCase() === portfolio.toLowerCase();
                const isTaken = otherSelectedPortfolios.includes(portfolio);
                const isHighlighted = highlightedIndex === index;

                return (
                  <button
                    key={portfolio}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={isTaken}
                    onClick={() => !isTaken && handleSelectSuggestion(portfolio)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full text-left px-3.5 py-2 text-xs font-body flex items-center justify-between transition-colors cursor-pointer ${
                      isHighlighted
                        ? 'bg-[#25231F] text-[#EBE9D8]'
                        : isSelected
                        ? 'bg-[#CB1B29]/10 text-[#CB1B29] font-medium'
                        : 'text-[#25231F] hover:bg-[#25231F]/5'
                    } ${isTaken ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <span className="truncate pr-2">{portfolio}</span>
                    {isTaken ? (
                      <span className="text-[10px] font-mono-tech text-[#CB1B29] shrink-0">
                        (Chosen)
                      </span>
                    ) : isSelected ? (
                      <Check className="w-3.5 h-3.5 text-[#CB1B29] shrink-0" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-3 text-xs font-mono-tech text-[#25231F]/70 space-y-1">
              <div className="text-[#CB1B29] font-semibold text-[11px]">
                No official portfolio matching "{value}"
              </div>
              <p className="text-[10px] text-[#25231F]/60">
                You can keep typing to submit this as a custom portfolio choice.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
