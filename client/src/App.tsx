import { LeaderBoard } from './components/leaderboard/table';
import { Top } from './components/leaderboard/top';

function App() {
  return (
    <div className='w-[100vw] flex items-center flex-col  py-10 space-y-16'>
      <LeaderBoard />
      <Top />
    </div>
  );
}

export default App;
