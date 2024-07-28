import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { IUser } from '@/models/User.model';
import Avatar from '../avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { UpdateDialog } from './update';
import { Rank } from '../rank';
import { isInBetween } from '@/lib/utils';

interface LeaderBardColProps {
  newRank: number;
  prevRank: number;
  userId: number;
}

export const LeaderboardColumns = ({
  newRank,
  prevRank,
  userId,
}: LeaderBardColProps): ColumnDef<IUser>[] => [
  {
    id: 'rank',
    header: 'Place',
    cell: ({ row }) => {
      const rank = row.original.rank;
      // console.log(row.original.id);
      // console.log(rank);
      // console.log(prevRank);
      // console.log(newRank);
      const isSameUser = userId === row.original.id;
      const cType =
        isSameUser && prevRank > newRank
          ? 'DOWN'
          : isSameUser && newRank > prevRank
          ? 'UP'
          : !isSameUser && isInBetween(prevRank, newRank, rank)
          ? 'DOWN'
          : 'SAME';

      return (
        <div className='flex items-center justify-center space-x-2'>
          <Rank cType={cType} />
          <p>{rank}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.original.name;
      const firstname = name.split(' ')[0];
      return (
        <div className='flex items-center space-x-2'>
          <Avatar seed={firstname} />
          <p className='font-semibold'>{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'points',
    header: 'Points',
    cell: ({ getValue }) => {
      return <div className='flex justify-center'>{`${getValue()} PTS`}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem>Update Points</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <UpdateDialog user={user} />
        </Dialog>
      );
    },
  },
];
