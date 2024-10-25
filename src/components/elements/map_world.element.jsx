
import WorldMap from "react-svg-worldmap";

const MapWorldElement = ({ size, ipLocation, value, color }) => {

  //TODO: FInd out how I can calculate position on the map by lat, long
// const createTextLabels = (width) => {
//   const marker = [
//     {
//       label: `${ipLocation.country}`,
//       x: (Math.abs(ipLocation["latitude"]) / 100) * width,
//       y: (Math.abs(ipLocation["longitude"]) / 100) * width,
//       style: { fill: color || "red" },
//     },
//   ];
//   return marker;
// }

  const data = [{ country: ipLocation['country_code'], value }];
  return (
    <div className="map__element">
      <WorldMap
        color={color || "red"}
        size={size || "responsive"}
        data={data}
        richInteraction
      />
    </div>
  );
};

export default MapWorldElement;