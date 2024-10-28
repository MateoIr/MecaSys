import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../api/api";
const useGetAllServices = () => {
  const {
    data: services,
    isLoading: loadinServices,
    error: errorServices,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(),
  });

  return {
    services,
    loadinServices,
    errorServices,
  };
};

export default useGetAllServices;
