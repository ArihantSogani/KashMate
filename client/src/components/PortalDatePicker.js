import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const PortalDatePicker = ({ value, onChange, placeholder = "Select Date" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customDateInput, setCustomDateInput] = useState('');
  const pickerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the picker button and the dropdown
      const isOutsidePicker = pickerRef.current && !pickerRef.current.contains(event.target);
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target);
      
      if (isOutsidePicker && isOutsideDropdown) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  const updateDropdownPosition = () => {
    if (pickerRef.current) {
      const rect = pickerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      });
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      updateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  const getQuickDateOptions = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    // Fix: Last 3 Months should be 90 days ago, not 3 months ago
    const last3Months = new Date(today);
    last3Months.setDate(last3Months.getDate() - 90);

    return [
      { label: 'Today', date: today, value: today.toISOString().split('T')[0] },
      { label: 'Yesterday', date: yesterday, value: yesterday.toISOString().split('T')[0] },
      { label: 'Last Week', date: lastWeek, value: lastWeek.toISOString().split('T')[0] },
      { label: 'Last Month', date: lastMonth, value: lastMonth.toISOString().split('T')[0] },
      { label: 'Last 3 Months', date: last3Months, value: `range:${last3Months.toISOString().split('T')[0]}:${today.toISOString().split('T')[0]}` },
      { label: 'Custom Date', date: null, value: 'custom' }
    ];
  };

  const handleDateSelect = (option) => {
    console.log('Date option selected:', option); // Debug log
    
    if (option.value === 'custom') {
      setShowCustomInput(true);
      setIsOpen(false);
    } else {
      console.log('Setting date:', option.value); // Debug log
      setSelectedDate(option.date);
      onChange(option.value);
      setIsOpen(false);
    }
  };

  const handleCustomDateSubmit = () => {
    if (customDateInput) {
      console.log('Custom date submitted:', customDateInput); // Debug log
      const customDate = new Date(customDateInput);
      setSelectedDate(customDate);
      onChange(customDateInput);
      setCustomDateInput('');
      setShowCustomInput(false);
    }
  };

  const handleCustomDateCancel = () => {
    setCustomDateInput('');
    setShowCustomInput(false);
  };

  const clearDate = () => {
    console.log('Clearing date'); // Debug log
    setSelectedDate(null);
    onChange('');
    setIsOpen(false);
  };

  const formatDisplayDate = (date) => {
    if (!date) return placeholder;
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderDropdown = () => {
    if (!isOpen) return null;

    return createPortal(
      <div 
        ref={dropdownRef}
        className="fixed z-[99999]"
        style={{
          top: dropdownPosition.top,
          left: dropdownPosition.left
        }}
      >
        <div className="bg-surface/95 backdrop-blur-md border border-surface/30 rounded-xl shadow-2xl p-2 w-48">
          {getQuickDateOptions().map((option, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDateSelect(option);
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface/50 transition-colors text-on-surface hover:text-primary"
            >
              {option.label}
            </button>
          ))}
          
          {selectedDate && (
            <div className="border-t border-surface/30 mt-2 pt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Clear filter clicked'); // Debug log
                  clearDate();
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  };

  const renderCustomDateModal = () => {
    if (!showCustomInput) return null;

    return createPortal(
      <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center">
        <div className="bg-surface/95 backdrop-blur-md border border-surface/30 rounded-xl shadow-2xl p-6 w-80">
          <h3 className="text-lg font-semibold text-on-surface mb-4">Enter Custom Date</h3>
          
          <div className="mb-4">
            <label className="block text-sm text-on-surface-secondary mb-2">
              Date (YYYY-MM-DD)
            </label>
            <input
              type="date"
              value={customDateInput}
              onChange={(e) => setCustomDateInput(e.target.value)}
              className="w-full px-4 py-2 bg-surface/50 border border-surface/30 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCustomDateCancel}
              className="px-4 py-2 text-on-surface-secondary hover:text-on-surface transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCustomDateSubmit}
              disabled={!customDateInput}
              className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="relative" ref={pickerRef}>
        {/* Date Input Button */}
        <button
          onClick={handleToggle}
          className="px-4 py-2 bg-surface/50 border border-surface/30 rounded-lg text-on-surface hover:bg-surface/70 transition-colors flex items-center space-x-2 min-w-[140px]"
        >
          <span className="text-on-surface-secondary">📅</span>
          <span className={selectedDate ? 'text-on-surface' : 'text-on-surface-secondary'}>
            {formatDisplayDate(selectedDate)}
          </span>
        </button>
      </div>
      {renderDropdown()}
      {renderCustomDateModal()}
    </>
  );
};

export default PortalDatePicker; 