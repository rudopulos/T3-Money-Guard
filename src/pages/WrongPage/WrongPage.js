import React from 'react';
import wrongPageImage from '../../images/wrong-page-image/wrong-page-image.jpg';
import wrongPageImageWebp from '../../images/wrong-page-image/wrong-page-image.webp'; 
import { DivStyle, Img } from './WrongPage.styled';
import { CustomButton } from 'components/CustomElements/CustomButton';

const WrongPage = () => {
  return (
    <DivStyle>
      <picture>
        <source srcSet={wrongPageImageWebp} type="image/webp" />
        <Img src={wrongPageImage} alt="Oops, wrong page" />
      </picture>

      <CustomButton
        type="button"
        onClick={() => (window.location.href = '/T3-Money-Guard/home')}
      >
        GO HOME{' '}
      </CustomButton>
    </DivStyle>
  );
};

export default WrongPage;
