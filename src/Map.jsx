import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ markers }) => {
   return (
      <MapContainer
         style={{ height: "500px", width: "100%", zIndex: 0 }}
         center={[43.895, -0.5]}
         zoom={16}
         scrollWheelZoom={false}
      >
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />

         {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position}>
               <Popup>{marker.title}</Popup>
            </Marker>
         ))}
      </MapContainer>
   );
};
export default Map;
