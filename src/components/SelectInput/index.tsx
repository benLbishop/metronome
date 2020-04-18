import React from 'react';

import './SelectInput.scss';

interface Props {
  selectedValue: string;
  values: string[];
  updateValue(newValue: string): void;
}

const SelectInput: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const x = event.target.value;
    // TODO: this says x is a string, so shouldn't TS get mad about this function? what if FormFields is a number?
    props.updateValue(x);
  };

  const getSelectOptions = (values: string[]): JSX.Element[] => {
    return values.map(val => (<option key={val} value={val}>{val}</option>
    ));
  };

  return (
    <select
      className='selectInput'
      value={props.selectedValue}
      onChange={handleChange}
    >
      {getSelectOptions(props.values)}
    </select>
  );
};

export default SelectInput;