import { useState, useMemo } from 'react';
import React from 'react';

const getFillColor = ({ hoverPosition, stars, position }: StarSvgPropsType) => {
  if ((hoverPosition === 0 && stars >= position) || hoverPosition >= position) {
    return 'fill-[#ffb621]';
  }
  return 'fill-gray-300';
};

interface StarSvgPropsType {
  hoverPosition: number;
  stars: number;
  position: number;
}

const StarSvg = ({ hoverPosition, stars, position }: StarSvgPropsType) => {
  const fillColor = useMemo(
    () => getFillColor({ hoverPosition, stars, position }),
    [hoverPosition, stars, position],
  );

  return (
    <svg
      viewBox="0 0 51 48"
      className="h-6 w-6 transition-transform duration-200 ease-in-out"
      aria-label={`Star ${position}`}
    >
      <path
        className={`${fillColor} shadow-[#ffb621] transition-colors duration-200 ease-in-out hover:shadow-sm`}
        d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
      />
    </svg>
  );
};

interface StarsPropsType {
  setStars: React.Dispatch<React.SetStateAction<number>>;
  stars: number;
}

let Stars: React.FC<StarsPropsType> = ({ stars, setStars }: StarsPropsType) => {
  const [hoverPosition, setHoverPosition] = useState<number>(0);

  return Array.from({ length: 5 }).map((_, index) => (
    <div
      key={index}
      className="relative inline-block cursor-pointer pl-1 align-middle duration-200 ease-in-out hover:scale-125"
      onClick={() => setStars(index + 1)}
      onMouseEnter={() => setHoverPosition(index + 1)}
      onMouseLeave={() => setHoverPosition(0)}
      role="button"
      aria-label={`Set rating to ${index + 1} stars`}
    >
      <StarSvg
        hoverPosition={hoverPosition}
        position={index + 1}
        stars={stars}
      />
    </div>
  ));
};

Stars = React.memo(Stars);

export default Stars;
