import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla,
    areaName,
    aggregatedDiscountInfoV3,
  } = resData.info;

  return (
    <div className="flex flex-col m-4 p-4 w-64 h-full bg-white shadow-lg rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      {/* Image Section */}
      <ImageSection
        imgId={cloudinaryImageId}
        name={name}
        disData={aggregatedDiscountInfoV3}
      />

      {/* Details Section */}
      <div className="card-details mt-4 text-gray-700">
        <h2 className="text-xl font-bold text-gray-900">{name}</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-green-500 font-semibold">
            {avgRating} Rating{" "}
          </span>
          <span className="text-gray-500">• {sla.slaString}</span>
        </div>
        <p className="text-md font-semibold text-gray-600">{costForTwo}</p>
        <p className="text-sm text-gray-500">{cuisines.join(", ")}</p>
        <p className="text-sm font-medium text-gray-500">{areaName}</p>
      </div>
    </div>
  );
};

const ImageSection = ({ imgId, name, disData }) => {
  return (
    <div className="relative w-full h-50 rounded-xl overflow-hidden">
      <label className="absolute bottom-0 left-0 p-2 w-full bg-gradient-to-t from-gray-950 to-0& text-white font-extrabold font">
        {disData?.header} {disData?.subHeader}
      </label>
      <img
        className="w-full h-full object-cover rounded-xl"
        src={CDN_URL + imgId}
        alt={name}
      />
    </div>
  );
};

export { RestaurantCard };
