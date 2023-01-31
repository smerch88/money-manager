import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from 'redux/auth/auth-selector';
import { transactionSummary } from 'redux/transaction/transaction-operation';
import { selectStatistic } from 'redux/transaction/transaction-selector';
import Chart from 'components/DiagramTab/Chart/Chart';
import Table from 'components/DiagramTab/Table/Table';

import {
  Caption,
  FlexWrapper,
  WrappCart,
  WrappTable,
} from './StatisticsPage.styled';
import SelectSmall from 'components/DiagramTab/Select/Select';

export default function StatisticsPage() {
  const [month, setMonth] = useState(new Date());
  const [year, setYear] = useState(new Date());

  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const summaryItem = useSelector(selectStatistic);

  useEffect(() => {
    const dataOfTransaction = {
      month: moment(month).format('MM'),
      year: moment(year).format('YYYY'),
    };
    dispatch(transactionSummary(dataOfTransaction));
  }, [dispatch, token, month, year]);

  return (
    <>
      <FlexWrapper>
        <WrappCart>
          <Caption>Statistics</Caption>
          {summaryItem.categoriesSummary && <Chart />}
        </WrappCart>
        <WrappTable>
          <SelectSmall setMonth={setMonth} setYear={setYear} month={month} year={year}/>
          {summaryItem.categoriesSummary && <Table />}
        </WrappTable>
      </FlexWrapper>
    </>
  );
}
