import { pixelArt } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useMemo } from 'react';

interface AvatarProps {
  seed: string;
  //   style?: 'pixel-arts' | 'lorelei';
  size?: number;
}

const Avatar = ({ seed, size = 32 }: AvatarProps) => {
  const avatar = useMemo(() => {
    return createAvatar(pixelArt, {
      size,
      seed,
    }).toDataUri();
  }, [seed]);
  return (
    <div>
      <img
        src={avatar}
        alt={`avatar of ${seed}`}
        className={` rounded-full bg-blue-200 p-1`}
      />
    </div>
  );
};

export default Avatar;
