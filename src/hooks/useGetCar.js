import { useQuery } from "@tanstack/react-query";
import { getCar } from "../api/api";
const useGetCar = (id) => {
  const {
    data: car,
    isLoading: loadinCar,
    error: errorCar,
    refetch,
  } = useQuery({
    queryKey: ["car", id],
    enabled: !!id, // Solo ejecuta la consulta si id tiene un valor
    queryFn: () => getCar(id),
  });

  return {
    refetch,
    car,
    loadinCar,
    errorCar,
  };
};

export default useGetCar;
