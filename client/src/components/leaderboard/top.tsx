import Avatar from '../avatar';
import useGetUsers from '@/hooks/useGetUsers';
import { Spinner } from '../loading';
import { getPosition } from '@/lib/utils';

// interface TopProps {
//   users: IUser[];
// }

export function Top() {
  const {
    data: topUsers,
    isLoading,
    isError,
  } = useGetUsers({ page: 1, pageSize: 3 });

  if (isLoading) return <Spinner />;

  if (isError) return <p>Error component</p>;

  const topWithPosition = topUsers?.list?.map((user, i) => {
    return { position: i + 1, ...user };
  });
  const rearrangedUsers = [
    topWithPosition[1],
    topWithPosition[0],
    topWithPosition[2],
  ];

  // const maxPoints = Math.max(...rearrangedUsers.map((user) => user.points));
  // const maxHeight = 200;

  // const getHeight = (points) => (points / maxPoints) * maxHeight;

  return (
    <>
      <h1 className='text-xl font-bold uppercase underline'>Top 3 Users</h1>
      <div className='flex justify-center items-center bg-gray-100'>
        <div className='bg-white shadow-lg rounded-lg p-2 w-full max-w-2xl'>
          <div className='grid grid-cols-3 gap-1 items-end'>
            {rearrangedUsers?.map((person, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-1 rounded-lg space-y-3`}
              >
                <Avatar seed={person.name.split(' ')[0]} size={64} />
                <div className='text-xl font-semibold mb-3'>
                  {person.name.split(' ')[0]}
                </div>
                <div
                  className={`flex flex-col w-[120px] items-center justify-end space-y-2 p-4 ${
                    person.position === 1
                      ? 'bg-yellow-200 h-[200px]'
                      : person.position === 2
                      ? '#ffffb3 h-[150px]'
                      : 'bg-[#b3cce6] h-[100px]'
                  } rounded-lg`}
                  // style={{
                  //   height: `${getHeight(person.points)}px`,
                  //   backgroundColor:
                  //     person.position === 1
                  //       ? '#ffffb3'
                  //       : person.position === 2
                  //       ? '##e5e7eb'
                  //       : '#8cb3d9',
                  // }}
                >
                  <div className='text-lg font-semibold'>
                    {getPosition(person.rank).place}
                  </div>
                  <div className='flex items-center text-xs space-x-2 bg-slate-100 p-2 px-3 rounded-full'>
                    <div className=''>{person.points}PTS</div>
                    <div className=''>{getPosition(person.rank).price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
