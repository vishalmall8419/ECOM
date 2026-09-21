
import { Link } from "react-router-dom";
import NewArival from "../../assists/img.png";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#F1E8DF] sm:flex-row pt-17">

      <div className="flex flex-col self-center mb-6 sm:self-end sm:mb-20">

        <small className="text-[#9b8670]">
          New Arival
        </small>

        <h1 className="text-3xl font-extrabold text-[#E56B42] sm:text-4xl md:text-5xl">
          The Boxy Cross
        </h1>

        <Link
          to="/#HomeProduct"
          className="text-[#c1ab93] hover:text-[#22a3a5]"
        >
          --Explore All Now
        </Link>

      </div>

      <div className="flex justify-center">

        <img
          src={NewArival}
          className="h-auto max-h-[360px] w-auto object-contain sm:max-h-[480px] md:h-143 md:max-h-none"
          alt="NewArival"
        />

      </div>

    </div>
  );
};

export default Hero;