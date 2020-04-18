import React from 'react';

import './SelectInput.scss';

interface Props {
  selectedValue: string;
  values: string[];
  style?: React.CSSProperties;
  updateValue(newValue: string): void;
}

const SelectInput: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelection = event.target.value;
    // TODO: this says x is a string, so shouldn't TS get mad about this function? what if FormFields is a number?
    props.updateValue(newSelection);
  };

  const getSelectOptions = (values: string[]): JSX.Element[] => {
    const options = values.map(val => (<option key={val} value={val}>{val}</option>
    ));
    return options;
  };

  return (
    <select
      className='selectInput'
      style={props.style}
      value={props.selectedValue}
      onChange={handleChange}
    >
      {getSelectOptions(props.values)}
    </select>
  );
};

export default SelectInput;