import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; // Asegúrate de que estás usando react-router-dom

import { updateTurn } from "../api/api";

const useUpdateTurn = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const {
    isPending: isLoadingUpdateTurn,
    error: errorUpdateTurn,
    mutate: createUpdateTurn,
  } = useMutation({
    mutationFn: updateTurn,
    onSuccess: () => {
      navigate("/turnos"); // Redirige a la página de inicio
    },
  });

  return { isLoadingUpdateTurn, errorUpdateTurn, createUpdateTurn };
};

export default useUpdateTurn;
