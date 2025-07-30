import React, { useState } from 'react';
import { PRICE_PRESETS, formatPrice } from '../../../utils/searchUtils';
import styles from './PriceRangeFilter.module.css';

const PriceRangeFilter = ({ value, onChange }) => {
  const [customRange, setCustomRange] = useState({
    min: '',
    max: ''
  });
  const [showCustom, setShowCustom] = useState(false);

  const handlePresetSelect = (preset) => {
    if (preset.id === 'custom') {
      setShowCustom(true);
      return;
    }
    
    setShowCustom(false);
    const newValue = value?.min === preset.min && value?.max === preset.max 
      ? null 
      : { min: preset.min, max: preset.max };
    onChange(newValue);
  };

  const handleCustomRangeChange = (field, val) => {
    const newCustomRange = {
      ...customRange,
      [field]: val
    };
    setCustomRange(newCustomRange);
    
    // Only update parent if both values are valid
    const min = parseInt(newCustomRange.min) || 0;
    const max = parseInt(newCustomRange.max) || Infinity;
    
    if (newCustomRange.min || newCustomRange.max) {
      onChange({ min, max });
    } else {
      onChange(null);
    }
  };

  const getSelectedPresetId = () => {
    if (!value) return null;
    
    const preset = PRICE_PRESETS.find(p => 
      p.min === value.min && p.max === value.max
    );
    return preset?.id || 'custom';
  };

  const selectedPresetId = getSelectedPresetId();

  return (
    <div className={styles.container}>
      {/* Preset buttons */}
      <div className={styles.presetGrid}>
        {PRICE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            className={`${styles.presetButton} ${
              selectedPresetId === preset.id ? styles.selected : ''
            }`}
            onClick={() => handlePresetSelect(preset)}
            type="button"
          >
            <span className={styles.priceLabel}>{preset.label}</span>
            {preset.id !== 'custom' && (
              <span className={styles.priceRange}>
                {preset.max === Infinity 
                  ? `${formatPrice(preset.min)}+`
                  : `${formatPrice(preset.min)} - ${formatPrice(preset.max)}`
                }
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Custom range inputs */}
      {showCustom && (
        <div className={styles.customRange}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Min Price</label>
            <input
              type="number"
              placeholder="0"
              value={customRange.min}
              onChange={(e) => handleCustomRangeChange('min', e.target.value)}
              className={styles.priceInput}
            />
          </div>
          <div className={styles.inputSeparator}>to</div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Max Price</label>
            <input
              type="number"
              placeholder="Any"
              value={customRange.max}
              onChange={(e) => handleCustomRangeChange('max', e.target.value)}
              className={styles.priceInput}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRangeFilter;