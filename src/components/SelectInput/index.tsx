import React from 'react';

interface Props {
  selectedValue: string;
  values: string[];
  className?: string;
  style?: React.CSSProperties;
  updateValue(newValue: string): void;
}

// TODO: lag on handleChange being called?
const SelectInput: React.FC<Props> = (props) => {
  const DEFAULT_CLASSNAME = 'w-full';

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelection = event.target.value;
    props.updateValue(newSelection);
  };

  const getSelectOptions = (values: string[]): JSX.Element[] => {
    const options = values.map(val => (<option key={val} value={val}>{val}</option>
    ));
    return options;
  };

  const className = props.className ? props.className : DEFAULT_CLASSNAME;

  return (
    <select
      className={className}
      style={props.style}
      value={props.selectedValue}
      onChange={handleChange}
    >
      {getSelectOptions(props.values)}
    </select>
  );
};

export default SelectInput;