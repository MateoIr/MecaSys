import { useQuery } from "@tanstack/react-query";
import { getAllClients } from "../api/api";

const useGetClients = () => {
  const {
    data: cleints,
    isLoading: loadingClients,
    error: errorClients,
  } = useQuery({
    queryKey: ["clientes"],
    queryFn: () => getAllClients(),
  });

  return {
    cleints,
    loadingClients,
    errorClients,
  };
};

export default useGetClients;
