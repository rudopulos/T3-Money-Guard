import { components } from 'react-select';
import PropTypes from 'prop-types';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import { StyledDateSelector } from './dateSelector.styled';

const DropdownIndicator = props => {
  if (props.isFocused) {
    return (
      <components.DropdownIndicator {...props}>
        <VscChevronUp />
      </components.DropdownIndicator>
    );
  }
  return (
    <components.DropdownIndicator {...props}>
      <VscChevronDown />
    </components.DropdownIndicator>
  );
};

DropdownIndicator.propTypes = {
  isFocused: PropTypes.bool,
};

const customScrollbarStyles = {
  menuList: provided => ({
    ...provided,
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#BFB4DD',
      borderRadius: '12px',
    },
  }),
};

export const DateSelector = ({ onChange, options, value, className }) => {
  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : '';
  };

  return (
    <div className={className}>
      <StyledDateSelector
        value={defaultValue(options, value)}
        placeholder="Select a category"
        components={{ DropdownIndicator }}
        onChange={value => onChange(value)}
        options={options}
        classNamePrefix="Select"
        styles={customScrollbarStyles}
      />
    </div>
  );
};

DateSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
