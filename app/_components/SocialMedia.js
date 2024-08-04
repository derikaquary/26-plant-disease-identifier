import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import Xicon from "./Xicon";
import { FaLinkedin } from "react-icons/fa";

function SocialMedia({ type }) {
  if (type === "derik")
    return (
      <div className="flex w-[300px] items-end justify-center gap-3 rounded-b-2xl bg-white pb-5">
        <a
          href="https://www.instagram.com/derik_aquary/"
          target="_blank"
          rel="noopener noreferrer">
          <FaInstagram size={29} />
        </a>
        <a
          href="https://www.facebook.com/derik.aquary/?paipv=0&eav=Afa2Q9eWE6-K4CnguLvCavyfW2ObFWK7DlG4rFzM3X_Q8uIFPiZKqrQ_dhfJn_TO2AY&_rdr"
          target="_blank"
          rel="noopener noreferrer">
          <FaFacebook size={29} />
        </a>

        <a
          href="https://x.com/Derik_Aquary"
          target="_blank"
          rel="noopener noreferrer">
          <Xicon />
        </a>

        <a
          href="https://id.linkedin.com/in/ikhsan-derik-aquary-094616b5"
          target="_blank"
          rel="noopener noreferrer">
          <FaLinkedin size={29} />
        </a>
      </div>
    );

  if (type === "wahyu")
    return (
      <div className="flex w-[300px] items-end justify-center gap-3 rounded-b-2xl bg-orange-400 pb-5">
        <a
          href="https://www.instagram.com/derik_aquary/"
          target="_blank"
          rel="noopener noreferrer">
          <FaInstagram size={29} />
        </a>
        <a
          href="https://www.instagram.com/derik_aquary/"
          target="_blank"
          rel="noopener noreferrer">
          <FaFacebook size={29} />
        </a>

        <a
          href="https://www.instagram.com/derik_aquary/"
          target="_blank"
          rel="noopener noreferrer">
          <Xicon />
        </a>

        <a
          href="https://www.instagram.com/derik_aquary/"
          rel="noopener noreferrer">
          <FaLinkedin size={29} />
        </a>
      </div>
    );
}

export default SocialMedia;
