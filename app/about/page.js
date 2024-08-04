import Navigation from "@/app/_components/Navigation.js";
import ProfileCard from "../_components/ProfileCard";
function page() {
  return (
    <div className="absolute bottom-[25px] left-[25px] right-[25px] top-[25px] rounded-2xl border-r-2 border-t-2 border-white/40 bg-white/20 shadow-2xl flex flex-col gap-3 justify-center items-center ">
      <ProfileCard type="derik" name="Derik Aquary" role="Creator" />
      <div className="bg-black/30 rounded-lg w-[300px] h-[190px] overflow-auto px-3 py-2">
        <p className="text-white text-2xl">
          Hello, my name is Derik. I am pleased to introduce my latest app,
          designed to assist you in identifying plant diseases and providing
          useful solutions. While I strive for accuracy, please note that the AI
          may occasionally make errors. Throughout my career, I have developed
          numerous websites, including a cabin room management system, a movie
          selection platform, and a glassmorphism website. These projects have
          significantly enhanced my expertise in Next.js, React.js, Tailwind
          CSS, React Native, JavaScript, HTML, and CSS. I hope you find my work
          beneficial and appreciate the effort that has gone into creating this
          app.
        </p>
      </div>
      <Navigation />
    </div>
  );
}

export default page;
