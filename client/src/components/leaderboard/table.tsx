// import React from 'react';
import { useState } from 'react';

import { Button } from '../ui/button';
import useGetUsers from '@/hooks/useGetUsers';
import { DataTable } from '../dataTable';
import { LeaderboardColumns } from './columns';
import { useAppSelector } from '@/redux/hooks';
import { Spinner } from '../loading';
import { ErrorComponent } from '../error';

export function LeaderBoard() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError } = useGetUsers({
    page,
    pageSize: 10,
  });

  const prevRecord = useAppSelector((state) => state.rank);
  console.log(prevRecord);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => setPage(page + 1);

  if (isLoading) return <Spinner />;

  if (isError) return <ErrorComponent />;

  // if (!newR) return <p>Loading new rank data...</p>;

  return (
    <div className=''>
      <DataTable
        columns={LeaderboardColumns({
          newRank: prevRecord.newRank,
          prevRank: prevRecord.rank,
          userId: prevRecord.id,
        })}
        data={data?.list}
      />

      <div className='items-center space-x-2 flex justify-end mt-3'>
        <Button
          size={'sm'}
          className='w-[100px]'
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          size={'sm'}
          className='w-[100px]'
          onClick={handleNext}
          disabled={page === data?.pageCount}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
