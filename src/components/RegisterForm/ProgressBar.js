import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import { Progress, ProgressBarWrapper } from './ProgressBar.styled';

export const ProgressBar = ({ password }) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const passwordStrength = calculatePasswordStrength(password);
    const limitedStrength = Math.min(passwordStrength.score, 12);
    setStrength(limitedStrength);
  }, [password]);

  const calculatePasswordStrength = currentPassword => {
    const result = zxcvbn(currentPassword);
    return result;
  };

  const getBackgroundColor = currentStrength => {
    switch (currentStrength) {
      case 0:
        return 'red';
      case 1:
        return 'orange';
      case 2:
        return 'yellow';
      case 3:
        return 'green';
      case 4:
        return 'darkgreen';
      default:
        return 'red';
    }
  };

  return (
    <ProgressBarWrapper>
      <Progress strength={strength} background={getBackgroundColor(strength)} />
    </ProgressBarWrapper>
  );
};

ProgressBar.propTypes = {
  password: PropTypes.string.isRequired,
};
