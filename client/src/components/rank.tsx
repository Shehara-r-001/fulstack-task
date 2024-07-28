import { Minus, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

type StyleProps = {
  rotationClass: string;
  rankColor: string;
  same: boolean;
};

export function Rank({ cType }: { cType: 'UP' | 'DOWN' | 'SAME' }) {
  const [styles, setStyles] = useState<StyleProps>({
    rotationClass: '',
    rankColor: '',
    same: false,
  });
  useEffect(() => {
    switch (cType) {
      case 'UP':
        setStyles({
          rotationClass: '-rotate-90',
          rankColor: '#00ff00',
          same: false,
        });
        break;
      case 'DOWN':
        setStyles({
          rotationClass: 'rotate-90',
          rankColor: '#ff0000',
          same: false,
        });
        break;
      default:
        setStyles({
          rotationClass: '',
          rankColor: '',
          same: true,
        });
        break;
    }
  }, [cType]);

  const { same, rotationClass, rankColor } = styles;

  return (
    <>
      {!same ? (
        <Play
          size={10}
          className={rotationClass}
          color={rankColor}
          fill={rankColor}
        />
      ) : (
        <Minus size={10} />
      )}
    </>
  );
}
