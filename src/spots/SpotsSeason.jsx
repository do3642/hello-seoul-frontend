import './css/SpotsSeason.css';
import SeasonBox from './SeasonBox';

function SpotsSeason() {
  return (
    <div className="spots-season">
    <SeasonBox
      seasonName="spring"
      seasonNameKR="봄"
      />
    <SeasonBox
      seasonName="summer"
      seasonNameKR="여름"
    />
    <SeasonBox
      seasonName="fall"
      seasonNameKR="가을"
    />
    <SeasonBox
      seasonName="winter"
      seasonNameKR="겨울"
    />

  </div>
  );
}

export default SpotsSeason;