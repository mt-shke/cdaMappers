import Map from "./Map";
import { useEffect, useState } from "react";
import AddMarker from "./AddMarker";
import MarkerList from "./MarkerList";
import UpdateMarker from "./UpdateMarker";

const defaultMarkers = [
   {
      id: 1,
      title: "Candau",
      position: [43.8915, -0.50505],
   },
   {
      id: 2,
      title: "Bosquet",
      position: [43.8971, -0.4922],
   },
];

const App = () => {
   const [modal, setModal] = useState(false);
   const [markers, setMarkers] = useState(defaultMarkers ?? []);
   const [selected, setSelected] = useState(false);

   const handleDelete = (id) => {
      setMarkers((prev) => prev.filter((marker) => marker.id !== id));
      setSelected(false);
   };

   return (
      <main className="min-w-[900px]">
         {/* {!!modal && (
            <div
               onClick={() => setModal(false)}
               className="fixed z-30 inset-0 bg-black opacity-60"
            ></div>
         )} */}
         {modal === "add" && (
            <AddMarker
               setModal={setModal}
               markers={markers}
               setMarkers={setMarkers}
            />
         )}
         {modal === "update" && (
            <UpdateMarker
               setModal={setModal}
               markers={markers}
               setMarkers={setMarkers}
               selected={selected}
               setSelected={setSelected}
            />
         )}

         {modal === "list" && (
            <MarkerList
               markers={markers}
               setModal={setModal}
               handleDelete={handleDelete}
               setSelected={setSelected}
            />
         )}
         <h1 className="text-center text-5xl">Carte</h1>
         <div className="w-full flex align-center justify-center gap-4 mt-8">
            <button
               onClick={() => setModal("list")}
               className="p-2 bg-blue-400 rounded cursor-pointer"
            >
               Liste des marqueurs
            </button>
            <button
               onClick={() => setModal("add")}
               className="p-2 bg-green-400 rounded cursor-pointer"
            >
               Ajouter un marqueur
            </button>
            <button
               onClick={() => {
                  if (selected) {
                     setModal("update");
                  }
               }}
               className="p-2 bg-yellow-400 rounded cursor-pointer"
            >
               Modifier un marqueur
            </button>
            <button
               onClick={() => {
                  if (selected) {
                     handleDelete(selected);
                  }
               }}
               className="p-2 bg-red-400 rounded cursor-pointer"
            >
               Supprimer un marqueur
            </button>
         </div>
         <div className="p-4 relative z-10">
            <Map markers={markers} setSelected={setSelected} />
         </div>
      </main>
   );
};

export default App;
