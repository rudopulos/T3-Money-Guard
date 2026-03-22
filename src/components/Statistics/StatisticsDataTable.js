import PropTypes from 'prop-types';
import {
  Body,
  ColorBox,
  Container,
  Expenses,
  Footer,
  Head,
  HeadText,
  Income,
  RowText,
  StyledTdCat,
  StyledTdSum,
  StyledTdTotal,
  StyledTr,
} from './statisticsDataTable.styled';
import { colors } from './statiscticsColors';

export const DataTable = ({ reduxData }) => {
  return (
    <Container>
      <Head>
        <HeadText>
          <span>Category</span>
        </HeadText>
        <HeadText>
          <span>Sum</span>
        </HeadText>
      </Head>
      <Body>
        {reduxData.categoryExpenses
          .filter(category => category.total !== '0.00')
          .map(category => {
            const boxColor = colors.find(color => color.name === category.name);
            return (
              <StyledTr key={category.name}>
                <StyledTdCat>
                  <ColorBox color={boxColor.color} />
                  <RowText>
                    <span>{category.name}</span>
                    <StyledTdSum>{Number(category.total).toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</StyledTdSum>
                  </RowText>
                </StyledTdCat>
              </StyledTr>
            );
          })}
      </Body>
      <Footer>
        <Expenses>
          <span>Expenses:</span>
          <StyledTdTotal className="expenses">
            {Number(reduxData.totalExpenses).toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </StyledTdTotal>
        </Expenses>
        <Income>
          <span>Income:</span>
          <StyledTdTotal className="income">
            {Number(reduxData.totalIncome).toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </StyledTdTotal>
        </Income>
      </Footer>
    </Container>
  );
};

DataTable.propTypes = {
  reduxData: PropTypes.shape({
    categoryExpenses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        total: PropTypes.string.isRequired,
      })
    ).isRequired,
    totalExpenses: PropTypes.number.isRequired,
    totalIncome: PropTypes.number.isRequired,
  }).isRequired,
};
