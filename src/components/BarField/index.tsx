import React, { useState } from 'react';
import './BarField.scss';
// import { KeyCodes } from '../../types';

interface Props {
  value: number;
  updateValue(newValue: number): void;
}

// TODO: rename because all I can think of is Garfield when I read it
const BarField: React.FC<Props> = (props: Props) => {

  const [isFocused, setIsFocused] = useState(false);
  const [tempValue, setTempValue] = useState<number | undefined>(props.value);

  const getDisplayValue = (): string | undefined => {
    if (isFocused) {
      if (tempValue === undefined) {
        return '';
      }
      return tempValue.toString();
    }
    return props.value.toString();
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setTempValue(props.value);
    setIsFocused(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (newText === '') {
      setTempValue(undefined);
      return;
    }
    const newValue = parseInt(newText, 10);
    if (isNaN(newValue)) {
      return;
    }
    setTempValue(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tempValue === undefined || tempValue <= 0) {
      return;
    }
    // TODO: use KeyCodes enum
    if (e.charCode === 13) {
      props.updateValue(tempValue);
    }
  };

  return (
    <div className='barField'>
      <input
        type='text'
        value={getDisplayValue()}
        onChange={handleTextChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default BarField;