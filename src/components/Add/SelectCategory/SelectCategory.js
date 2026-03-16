import { components } from 'react-select';
import PropTypes from 'prop-types';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import { StyledSelect } from '../Add.styled';

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

export const CustomSelect = ({ onChange, options, value, className }) => {
  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : '';
  };

  return (
    <div className={className}>
      <StyledSelect
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

CustomSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
};
