import React, { useState } from 'react';
import './TextInput.scss';
import { KeyCodes } from '../../types/htmlTypes';

interface Props {
  value: number;
  style?: React.CSSProperties;
  updateValue(newValue: number): void;
}

// TODO: make component generic? Right now this can only be a text input for numbers,
// and that isn't clear at all by the component name
const TextInput: React.FC<Props> = (props: Props) => {

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
    if (e.charCode === KeyCodes.ENTER) {
      props.updateValue(tempValue);
    }
  };

  return (
      <input
        className='textInput'
        style={props.style}
        type='text'
        value={getDisplayValue()}
        onChange={handleTextChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={handleKeyPress}
      />
  );
};

export default TextInput;