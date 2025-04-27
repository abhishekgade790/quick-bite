import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaStar,
  FaLeaf,
  FaTruck,
  FaRupeeSign,
} from "react-icons/fa";

import { RestaurantCard } from "./RestaurantCard";
import ShimmerUI from "./shimmerUI";
import useFetch from "../utils/useFetch";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [restaurantsList, setRestaurants] = useState([]);
  const [originalRestaurantsList, setOriginalRestaurants] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    topRated: false,
    fastDelivery: false,
    pureVeg: false,
  });

  // Fetch data from custom hook
  const { resInfo, loading, error } = useFetch(); 
  const isOnline = useOnlineStatus();

  useEffect(() => {
    // On successful data fetch, update the restaurant list
    if (Array.isArray(resInfo)) {
      setRestaurants(resInfo);
      setOriginalRestaurants(resInfo);
    }
  }, [resInfo]);

  console.log("Restaurants List:", restaurantsList); // Debugging line to check restaurant list

  const toggleFilter = (key) => {
    const newFilters = { ...filters, [key]: !filters[key] };
    setFilters(newFilters);

    let updated = [...originalRestaurantsList];

    // Apply filter conditions
    if (newFilters.topRated) {
      updated = updated.filter((res) => res.info.avgRating > 4.2);
    }
    if (newFilters.fastDelivery) {
      updated = updated.filter((res) => res.info.sla?.deliveryTime <= 30);
    }
    if (newFilters.pureVeg) {
      updated = updated.filter((res) => res.info.veg === true);
    }

    // Search functionality within filters
    if (searchValue.trim() !== "") {
      updated = updated.filter((res) =>
        res.info.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setRestaurants(updated);
  };

  const resetFilters = () => {
    setFilters({
      topRated: false,
      fastDelivery: false,
      pureVeg: false,
    });
    setRestaurants(originalRestaurantsList);
  };

  const sortByCost = (order = "asc") => {
    const sorted = [...restaurantsList].sort((a, b) => {
      const getCostValue = (str) => {
        const match = str.match(/\₹?(\d+)/);
        return match ? parseInt(match[1]) : 0;
      };

      const costA = getCostValue(a.info.costForTwo);
      const costB = getCostValue(b.info.costForTwo);

      return order === "asc" ? costA - costB : costB - costA;
    });

    setRestaurants(sorted);
  };

  // If offline, display offline message
  if (!isOnline) {
    return (
      <h1 className="text-center text-xl font-bold text-red-500 mt-10">
        Looks like you are offline! Check your internet connection.
      </h1>
    );
  }

  // If still loading, show shimmer UI
  if (loading) {
    return <ShimmerUI />;
  }

  // If error, show error message
  if (error) {
    return (
      <h1 className="text-center text-xl font-bold text-red-500 mt-10">
        {error}
      </h1>
    );
  }

  return (
    <div className="flex flex-col px-4 py-5 min-h-screen items-center bg-gray-50">
      {/* Search Bar */}
      <div className="flex items-center bg-white w-full max-w-xl justify-between rounded-lg shadow-md border">
        <input
          className="w-full text-lg p-3 border-none rounded-lg outline-none"
          type="text"
          placeholder="Search for restaurants..."
          value={searchValue}
          onChange={(e) => {
            const text = e.target.value;
            setSearchValue(text);
            let filtered = [...originalRestaurantsList];

            // Apply filters while typing in search box
            if (filters.topRated) {
              filtered = filtered.filter((res) => res.info.avgRating > 4.2);
            }
            if (filters.fastDelivery) {
              filtered = filtered.filter(
                (res) => res.info.sla?.deliveryTime <= 30
              );
            }
            if (filters.pureVeg) {
              filtered = filtered.filter((res) => res.info.veg === true);
            }

            // Filter search results based on input value
            if (text.trim() !== "") {
              filtered = filtered.filter((res) =>
                res.info.name.toLowerCase().includes(text.toLowerCase())
              );
            }

            setRestaurants(filtered);
          }}
        />
        {searchValue ? (
          <button
            className="text-gray-500 hover:text-gray-700 px-3"
            onClick={() => {
              setSearchValue("");
              resetFilters();
            }}
          >
            <FaTimes />
          </button>
        ) : (
          <span className="text-gray-400 px-3">
            <FaSearch />
          </span>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => toggleFilter("topRated")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md shadow transition ${
            filters.topRated
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 hover:bg-yellow-400 hover:text-white"
          }`}
        >
          <FaStar /> Top Rated
        </button>

        <button
          onClick={() => toggleFilter("fastDelivery")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md shadow transition ${
            filters.fastDelivery
              ? "bg-green-500 text-white"
              : "bg-gray-100 hover:bg-green-400 hover:text-white"
          }`}
        >
          <FaTruck /> Fast Delivery
        </button>

        <button
          onClick={() => toggleFilter("pureVeg")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md shadow transition ${
            filters.pureVeg
              ? "bg-green-700 text-white"
              : "bg-gray-100 hover:bg-green-600 hover:text-white"
          }`}
        >
          <FaLeaf /> Pure Veg
        </button>

        <button
          onClick={() => sortByCost("asc")}
          className="flex items-center gap-2 px-4 py-2 rounded-md shadow bg-gray-100 hover:bg-blue-400 hover:text-white transition"
        >
          <FaRupeeSign /> Low to High
        </button>

        <button
          onClick={() => sortByCost("desc")}
          className="flex items-center gap-2 px-4 py-2 rounded-md shadow bg-gray-100 hover:bg-blue-600 hover:text-white transition"
        >
          <FaRupeeSign /> High to Low
        </button>

        {(filters.topRated || filters.fastDelivery || filters.pureVeg) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-md shadow bg-red-100 hover:bg-red-500 hover:text-white transition"
          >
            <FaTimes /> Reset
          </button>
        )}
      </div>

      {/* Restaurant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {Array.isArray(restaurantsList) &&
          restaurantsList.map((res) => (
            <Link key={res.info.id} to={"/restaurants/" + res.info.id}>
              <RestaurantCard resData={res} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Body;
