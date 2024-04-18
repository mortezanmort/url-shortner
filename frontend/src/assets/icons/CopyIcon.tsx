import { SVGProps } from "react";
const copyIcon = (props: SVGProps<SVGSVGElement>) => {
  const { stroke } = props;
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.33301 9.99967H2.66634C2.31272 9.99967 1.97358 9.8592 1.72353 9.60915C1.47348 9.3591 1.33301 9.01996 1.33301 8.66634V2.66634C1.33301 2.31272 1.47348 1.97358 1.72353 1.72353C1.97358 1.47348 2.31272 1.33301 2.66634 1.33301H8.66634C9.01996 1.33301 9.3591 1.47348 9.60915 1.72353C9.8592 1.97358 9.99967 2.31272 9.99967 2.66634V3.33301M7.33301 5.99967H13.333C14.0694 5.99967 14.6663 6.59663 14.6663 7.33301V13.333C14.6663 14.0694 14.0694 14.6663 13.333 14.6663H7.33301C6.59663 14.6663 5.99967 14.0694 5.99967 13.333V7.33301C5.99967 6.59663 6.59663 5.99967 7.33301 5.99967Z"
        stroke={stroke ? stroke : "#667085"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default copyIcon;
