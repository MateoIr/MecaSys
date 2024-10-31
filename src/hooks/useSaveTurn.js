import { useMutation } from "@tanstack/react-query";

import { registerTurn } from "../api/api";
import { useNavigate } from "react-router-dom";

const useSaveTurn = () => {
  const navigate = useNavigate();
  const {
    isPending: isLoadingTrun,
    error: errorTrun,
    mutate: createTurn,
  } = useMutation({
    mutationFn: registerTurn,
    onSuccess: () => {
      navigate("/home"); // Navega a la página de inicio al completar con éxito
    },
  });
  return { isLoadingTrun, errorTrun, createTurn };
};

export default useSaveTurn;
