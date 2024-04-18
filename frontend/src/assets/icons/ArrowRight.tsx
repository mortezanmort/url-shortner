const ArrowRight = props => {
  const { stroke } = props;
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
export default ArrowRight;
