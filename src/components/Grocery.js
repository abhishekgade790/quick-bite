const Grocery = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-green-600 mb-4 text-center">
            🛒 Online Grocery Store
          </h1>
          <p className="text-lg text-gray-700 text-center mb-6">
            Get fresh groceries delivered to your doorstep at the best prices!  
            Explore a wide range of fruits, vegetables, dairy, snacks, and more.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold text-green-700">🍏 Fresh Fruits</h2>
              <p className="text-gray-600">Apples, Bananas, Oranges, Mangoes...</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold text-green-700">🥦 Vegetables</h2>
              <p className="text-gray-600">Tomatoes, Potatoes, Spinach, Carrots...</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold text-green-700">🥛 Dairy Products</h2>
              <p className="text-gray-600">Milk, Cheese, Butter, Yogurt...</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold text-green-700">🍞 Bakery & Snacks</h2>
              <p className="text-gray-600">Bread, Biscuits, Cakes, Chips...</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold text-green-700">🥫 Pantry Essentials</h2>
              <p className="text-gray-600">Rice, Pulses, Oil, Spices...</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold text-green-700">🍫 Beverages</h2>
              <p className="text-gray-600">Juices, Tea, Coffee, Cold Drinks...</p>
            </div>
          </div>
  
          <div className="mt-8 flex justify-center">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
              Shop Now 🛍️
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Grocery;
  