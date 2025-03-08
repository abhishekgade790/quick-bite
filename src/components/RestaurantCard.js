import { CDN_URL } from "../utils/constants";

 
 const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla,
    areaName,
  } = resData.info;
  const { slaString } = sla;
  return (
    <div className="card">
      <div className="card-img">
        <img
          src={CDN_URL
             +
            cloudinaryImageId
          }
          alt="Food"
        />
      </div>
      <div className="card-details">
        <h2>{name}</h2>
        <span>⭐{avgRating}</span>
        <span>• {slaString}</span>
        <p>{costForTwo}</p>
        <p>{cuisines.join(", ")}</p>
        <p>{areaName}</p>
      </div>
    </div>
  );
};
export { RestaurantCard };