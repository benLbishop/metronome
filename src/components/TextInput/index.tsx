import React, { useState, useRef } from 'react';
import { KeyCodes } from '../../types/htmlTypes';

interface Props {
  value: number;
  className?: string;
  updateValue(newValue: number): void;
}

// TODO: make component generic? Right now this can only be a text input for numbers,
// and that isn't clear at all by the component name
// TODO: try out Formik?
const TextInput: React.FC<Props> = (props: Props) => {

  const DEFAULT_CLASSNAME = 'w-full text-center text-xl rounded border border-gray-800';

  const inputRef: React.MutableRefObject<HTMLInputElement> = useRef(null);
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
    // NOTE: setTempValue is called here because prop.value
    // might have changed while the input was not focused.
    // TODO: Would it be better to call setTempValue every time prop.value updates?
    // not sure where I'd call that
    setTempValue(props.value);
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
    if (tempValue === undefined || tempValue < 0) {
      return;
    }
    if (e.charCode === KeyCodes.ENTER) {
      props.updateValue(tempValue);
      inputRef.current.blur();
    }
  };

  const className = props.className ? props.className : DEFAULT_CLASSNAME;

  return (
      <input
        ref={inputRef}
        className={className}
        type='text'
        maxLength={3}
        value={getDisplayValue()}
        onChange={handleTextChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={handleKeyPress}
      />
  );
};

export default TextInput;