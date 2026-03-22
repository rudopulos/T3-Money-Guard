import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Container,
  ContainerHeader,
  TableHead,
  Data,
  TableRow,
  TableDataDate,
  TableDataType,
  TableData,
  TableDataCategory,
  TableDataComment,
  TableDataColor,
  PencilButton,
  CustomButton,
  AddButton,
  PlusIcon,
} from './Home.styled';
import { selectIsLoading } from 'redux/transactionsRedux/transactionsSelectors';
import Modal from '../../components/Modal/Modal';
import AddTransaction from '../../components/Add/Add';
import EditTransaction from '../../components/Edit/Edit';
import Logout from '../../components/Logout/Logout';
import { toggleAddModal, toggleEditModal } from 'redux/modal/ModalSlice';
import { selectModalState, selectModalTypeState } from 'redux/modal/selectors';
import { BiPencil } from 'react-icons/bi';
import { RotatingLines } from 'react-loader-spinner';
import { TransactionCard } from './TransactionCard/TransactionCard';
import { transactionSlice } from '../../redux/transactionsRedux/transactionsSlice';
import { ScrollToTopButton } from './ScrollToTopButton/ScrollToTopButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, deleteItem } from 'redux/transactionsRedux/transactionsOperations';

const Home = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const modalType = useSelector(selectModalTypeState);
  const isModalOpen = useSelector(selectModalState);
  const isMobile = useMediaQuery({ minWidth: 240, maxWidth: 767 });
  const isLoading = useSelector(selectIsLoading);

  const deleteTransactions = id => {
    dispatch(deleteItem(id)).then(() => {
      dispatch(fetchTransactions());
    });
  };

  const handleEditClick = id => {
    setId(id);
    dispatch(toggleEditModal());
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const allTransactions = useSelector(
    state => state[transactionSlice.name].transactions
  );
  
  const sortedTransactions = allTransactions
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt);
      const dateB = new Date(b.date || b.createdAt);
      return dateB - dateA;
    });

  return (
    <Container>
      {!isMobile ? (
        <ContainerHeader>
          <TableHead>
            <div>Date</div>
            <div>Type</div>
            <div>Category</div>
            <div>Comment</div>
            <div>Sum</div>
          </TableHead>
          <Data>
            {isLoading ? (
              <TableRow>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <RotatingLines visible={true} height="40" width="40" />
                </div>
              </TableRow>
            ) : (
              sortedTransactions.map(
                ({ createdAt, date: transactionDate, type, category, comment, value, _id }) => {
                  let dateStr = new Date(transactionDate || createdAt).toLocaleDateString();
                  let numberSign = '+';
                  let colorClassName = 'colorIncome';
                  if (type === 'expense') {
                    numberSign = '-';
                    colorClassName = 'colorExpense';
                  }
                  
                  const formattedValue = Number(value).toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                  
                  return (
                    <TableRow key={_id} className="data">
                      <TableDataDate>{dateStr}</TableDataDate>
                      <TableDataType>{numberSign}</TableDataType>
                      {type === 'income' ? (
                        <TableData>Income</TableData>
                      ) : (
                        <TableDataCategory>{category}</TableDataCategory>
                      )}
                      <TableDataComment>{comment}</TableDataComment>

                      <TableDataColor type={type} className={colorClassName}>
                        {formattedValue}
                      </TableDataColor>
                      <PencilButton>
                        <BiPencil onClick={() => handleEditClick(_id)} cursor="pointer" />
                        <CustomButton
                          style={{ cursor: 'pointer' }}
                          className="deleteItem"
                          onClick={() => {
                            deleteTransactions(_id);
                          }}
                        >
                          Delete
                        </CustomButton>
                      </PencilButton>
                    </TableRow>
                  );
                }
              )
            )}
          </Data>
        </ContainerHeader>
      ) : (
        // Render Cards
        <>
          <ScrollToTopButton />
          <TransactionCard
            transactions={sortedTransactions}
            handleEditClick={handleEditClick}
            deleteTransactions={deleteTransactions}
          />
        </>
      )}

      <AddButton
        className="addItem"
        type="button"
        onClick={() => dispatch(toggleAddModal())}
      >
        <PlusIcon />
      </AddButton>

      {modalType === 'modal/toggleAddModal' && isModalOpen && (
        <Modal>
          <AddTransaction />
        </Modal>
      )}
      {modalType === 'modal/toggleEditModal' && isModalOpen && (
        <Modal>
          <EditTransaction id={id} />
        </Modal>
      )}
      {modalType === 'modal/toggleLogOutModal' && isModalOpen && (
        <Modal showCloseIcon={false}>
          <Logout />
        </Modal>
      )}
    </Container>

  );
};

export default Home;
