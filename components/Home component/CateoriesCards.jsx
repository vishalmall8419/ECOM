
import { Link } from "react-router-dom";

import img from "../../assists/gar.png";

const CateoriesCards = ({ data }) => {
  // Only 3 cards
  const categories = data.slice(0, 3);

  return (
    <div className="mx-auto mt-2 grid w-full max-w-7xl grid-cols-1 gap-1 px-0 sm:grid-cols-2 sm:gap-1 lg:grid-cols-3 lg:gap-1">

      {categories.map((item) => (
        <div
          key={item.id}
          className="relative mx-auto h-64 w-full max-w-[414px] overflow-hidden bg-[#F1E8DF] sm:h-72 lg:h-80"
        >

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${item.imgUrl || img})`,
              mixBlendMode: "multiply",
            }}
          ></div>

          {/* Shop Now */}
          <Link
            className="absolute bottom-5 left-5 z-10 text-sm font-semibold text-[#624e3c] underline transition hover:text-[#22a3a5]"
            to={item.link || "/"}
          >
            Shop Now
          </Link>

          {/* Category Title */}
          <Link
            className="absolute right-[-32px] top-15 z-10 rotate-90 text-sm font-semibold text-[#624e3c] transition hover:text-[#22a3a5]"
            to={item.link || "/"}
          >
            {item.title}
          </Link>

        </div>
      ))}

    </div>
  );
};

export default CateoriesCards;