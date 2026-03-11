import { useState } from "react";

const UpdateMarker = ({
   setModal,
   markers,
   setMarkers,
   selected,
   setSelected,
}) => {
   const [title, setTitle] = useState(
      markers.find((marker) => marker.id === selected).title,
   );
   const [position, setPosition] = useState(
      markers.find((marker) => marker.id === selected).position.join(","),
   );

   const handleSubmit = () => {
      const [lat, long] = position
         .split(",")
         .map((coord) => parseFloat(coord.trim()));
      const newMarker = {
         id: markers.find((marker) => marker.id === selected).id,
         title,
         position: [lat, long],
      };

      setMarkers((prev) => [
         ...prev.filter((marker) => marker.id !== selected),
         newMarker,
      ]);
      setModal(false);
   };

   return (
      <div className="fixed inset-0 z-50 grid place-items-center">
         <div className="absolute flex flex-col w-90 z-70 bg-white rounded-xl">
            <h2 className="p-4 text-2xl">Modifier un marqueur</h2>
            <hr className="opacity-20" />
            <div className="flex flex-col gap-4 p-4">
               <h3 className="text-center">Titre du POI</h3>
               <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Nom du marqueur"
               />
               <h3 className="text-center">Position du POI</h3>
               <input
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="lat, long"
               />
               <div className="flex w-full justify-center">
                  <button
                     onClick={() => [handleSubmit(), setSelected(false)]}
                     className="p-2 w-fit bg-blue-500 rounded cursor-pointer"
                  >
                     Valider
                  </button>
               </div>
            </div>
            <hr className="opacity-20" />
            <div className="flex w-full justify-end">
               <button
                  onClick={() => [setModal(false), setSelected(false)]}
                  className="w-fit p-1 m-4 bg-gray-400 rounded cursor-pointer"
               >
                  Fermer
               </button>
            </div>
         </div>
      </div>
   );
};
export default UpdateMarker;
