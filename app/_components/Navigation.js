import Link from "next/link";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdHome } from "react-icons/md";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="absolute bottom-5 right-5 flex flex-col items-end">
      {isOpen && (
        <div className="rounded-xl bg-white/20 backdrop-blur-md w-[50px] flex flex-col items-center justify-center px-3 py-3">
          <Link href="/">
            <MdHome color="white" size={40} />
          </Link>
        </div>
      )}
      <BsThreeDotsVertical
        onClick={() => setIsOpen(!isOpen)}
        size={30}
        color="white"
      />
    </div>
  );
}

export default Navigation;
