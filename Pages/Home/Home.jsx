import Nav from "../../components/Home component/Nav";
import Hero from "../../components/Home component/Hero";
import CateoriesCards from "../../components/Home component/CateoriesCards";
import WhyToChoose from "../../components/whyToChoose/WhyToChoose";
import Testimonial from "../../components/Testimonial/Testimonial";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const data = [
    {
      id: 1,
      title: "The Garments",
      imgUrl:
        "https://i.pinimg.com/736x/80/97/fa/8097fa422909d11b47abde8a52a28e4b.jpg",
    },
    {
      id: 2,
      title: "The Cosmetics",
      imgUrl:
        "https://i.pinimg.com/736x/3b/cf/4a/3bcf4a9fdd6f632f995825a71721e883.jpg",
    },
    {
      id: 3,
      title: "The Grocery",
      imgUrl:
        "https://i.pinimg.com/1200x/dc/9c/5c/dc9c5c2dba06cc36bb5463aebebf257d.jpg",
    },
  ];
  return (
    <>
   
      <Hero />
      <CateoriesCards data={data} />
      <WhyToChoose/>
      <Testimonial/>

    </>
  );
};

export default Home;
