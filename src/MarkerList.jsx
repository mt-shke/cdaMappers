const MarkerList = ({ markers, setModal, handleDelete, setSelected }) => {
   return (
      <div className="fixed inset-0 z-50 grid place-items-center">
         <div className="absolute flex flex-col w-[800px] z-50 bg-white rounded-xl">
            <h2 className="p-4 text-2xl">Liste des marqueurs</h2>
            <hr className="opacity-20" />
            <table className="w-full text-left">
               <thead>
                  <tr>
                     <th className="p-2 border-b">ID</th>
                     <th className="p-2 border-b">Titre</th>
                     <th className="p-2 border-b">Position</th>
                     <th className="p-2 border-b text-center">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {markers
                     .sort((a, b) => a.id - b.id)
                     .map((marker) => (
                        <tr key={marker.id}>
                           <td className="p-2 border-b">{marker.id}</td>
                           <td className="p-2 border-b">{marker.title}</td>
                           <td className="p-2 border-b">
                              ({marker.position[0]}, {marker.position[1]})
                           </td>
                           <td className="p-2 border-b text-center">
                              <button
                                 onClick={() => [
                                    setModal("update"),
                                    setSelected(marker.id),
                                 ]}
                                 className="p-1 mx-1 bg-yellow-400 rounded cursor-pointer"
                              >
                                 Modifier
                              </button>
                              <button
                                 onClick={() => handleDelete(marker.id)}
                                 className="p-1 mx-1 bg-red-400 rounded cursor-pointer"
                              >
                                 Supprimer
                              </button>
                           </td>
                        </tr>
                     ))}
               </tbody>
            </table>
            <hr className="opacity-20" />
            <div className="flex w-full justify-end">
               <button
                  onClick={() => setModal(false)}
                  className="w-fit p-1 m-4 bg-gray-400 rounded cursor-pointer"
               >
                  Fermer
               </button>
            </div>
         </div>
      </div>
   );
};

export default MarkerList;
