import Image from "next/image";
import SocialMedia from "./SocialMedia";
import avatar from "@/public/avatar.png";
import background from "@/public/background.jpg";

const derik = avatar;
const wahyu = background;

function ProfileCard({ type, name, role }) {
  let imageSrc;

  if (name === "Derik Aquary") {
    imageSrc = derik;
  } else if (name === "Wahyu Ivan") {
    imageSrc = wahyu;
  }

  return (
    <div className="relative grid h-[400px] w-[300px] grid-rows-[3fr_1fr] rounded-xl">
      <div className="absolute bottom-[70px] left-[15px] right-[15px] z-[4] flex flex-col items-center justify-center gap-2 rounded-[3rem] border-r border-t border-orange-200/40 bg-orange-200/30 py-3 backdrop-blur-md">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-xl">{role}</p>
      </div>
      <div className="relative z-[3]">
        <Image
          src={imageSrc}
          alt="avatar"
          fill
          placeholder="blur"
          className="rounded-t-xl object-cover"
        />
      </div>
      <SocialMedia type={type} />
    </div>
  );
}

export default ProfileCard;
