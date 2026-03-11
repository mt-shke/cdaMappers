import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useRef } from "react";

const defaultPosition = [43.895, -0.5];

const Map = ({ markers, setSelected }) => {
   const [addressInput, setAddressInput] = useState("");
   const [suggestions, setSuggestions] = useState([]);

   const [isFetching, setIsFetching] = useState(false);

   const mapRef = useRef();
   const { current: map } = mapRef;

   const handleSearch = async () => {
      if (isFetching === true) return;
      setIsFetching(true);
      await searchAddress(addressInput);
      setIsFetching(false);
   };

   const searchAddress = async (address) => {
      try {
         const res = await fetch(
            "https://data.geopf.fr/geocodage/search?q=" + address,
         );

         if (!res.ok) {
            throw new Error(`Erreur HTTP : ${res.status}`);
         }
         const data = await res.json();
         console.log(data);
         if (data.features) {
            setSuggestions(data.features.map((elem) => elem));
         }
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <>
         <MapContainer
            ref={mapRef}
            style={{ height: "500px", width: "100%", zIndex: 0 }}
            center={defaultPosition}
            zoom={16}
            scrollWheelZoom={false}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers.map((marker) => (
               <Marker
                  eventHandlers={{
                     click: (e) => {
                        setSelected(marker.id);
                     },
                  }}
                  key={marker.id}
                  position={marker.position}
               >
                  <Popup>{marker.title}</Popup>
               </Marker>
            ))}
         </MapContainer>
         <div className="p-4">
            <input
               className="border border-gray-500 p-2 rounded w-full"
               placeholder="Rechercher un lieu"
               value={addressInput}
               onChange={(e) => [
                  setAddressInput(e.target.value),
                  handleSearch(),
               ]}
            />
            <ul className="bg-white border border-gray-300 rounded max-h-60 overflow-y-auto">
               {suggestions.map((suggestion) => (
                  <li
                     key={suggestion.properties.id}
                     className="p-2 hover:bg-gray-200 cursor-pointer"
                     onClick={() => {
                        setAddressInput(suggestion.properties.name);
                        setSuggestions([]);
                        map.flyTo(
                           [
                              suggestion.geometry.coordinates[1],
                              suggestion.geometry.coordinates[0],
                           ],
                           16,
                           { duration: 2 },
                        );
                     }}
                  >
                     {`${suggestion.properties.name}, ${suggestion.properties.city}`}
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
};

export default Map;
