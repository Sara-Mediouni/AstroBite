import Lottie from "lottie-react";
import food from '../assets/food.json'
const Loader = () => (
    <div className="w-full h-full bg-white absolute">
  <div className="flex h-full w-full items-center justify-center ">
    <Lottie animationData={food} loop={true} />
  </div>
  </div>
);

export default Loader