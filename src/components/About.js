import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-orange-500 mb-4 text-center">About Us</h1>
        <p className="text-lg text-gray-700 text-center">
          Welcome to <span className="font-semibold text-orange-500">TastyBites</span>, your go-to destination for delicious and quick food deliveries. We bring a variety of cuisines from the best restaurants straight to your doorstep!
        </p>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>🍕 Wide range of restaurants & cuisines</li>
            <li>🚀 Fast & reliable delivery</li>
            <li>💰 Affordable prices & great discounts</li>
            <li>🛡️ Secure & easy payment options</li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-700">
            We strive to make food ordering effortless, ensuring that every meal you crave is just a click away. Your satisfaction is our top priority!
          </p>
        </div>
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-orange-500 text-white text-lg rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 cursor-pointer" onClick={()=>{navigate("/")}}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
