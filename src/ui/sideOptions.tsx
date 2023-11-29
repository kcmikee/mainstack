import {
  ProductIcon,
  ProductIcon2,
  ProductIcon3,
  ProductIcon4,
} from "@/constants";
import Image from "next/image";
import React from "react";

function SideOptions() {
  const icons = [ProductIcon, ProductIcon2, ProductIcon3, ProductIcon4];
  return (
    <div
      data-testid="testId"
      className="fixed left-4 top-3/7 inline-block h-min items-start rounded-full bg-white p-1 shadow-AppBar"
    >
      {icons.map((icon, i) => (
        <div key={i} className="cursor-pointer p-2 grayscale hover:grayscale-0">
          <Image src={icon} alt="side-nav" width={24} height={24} />
        </div>
      ))}
    </div>
  );
}

export default SideOptions;
