const ShowStars = ({ stars }: { stars: number }) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <div
      key={index}
      className="inline-block pl-1 align-middle transition-all"
      aria-label={`Set rating to ${index + 1} stars`}
    >
      <svg
        viewBox="0 0 51 48"
        className="h-5 w-5"
        aria-label={`Star ${index + 1}`}
      >
        <path
          className={`${stars >= index + 1 ? 'fill-[#ffb621]' : 'fill-gray-300'} shadow-[#ffb621]`}
          d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        />
      </svg>
    </div>
  ));
};
export default ShowStars;
