import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTurno } from "../api/api"; // Asegúrate de importar la función deleteTurno
const useDeleteTurn = () => {
  const mutation = useMutation({
    mutationFn: (id) => deleteTurno(id),
  });

  return mutation; // Devuelve el objeto de la mutación
};

export default useDeleteTurn;
