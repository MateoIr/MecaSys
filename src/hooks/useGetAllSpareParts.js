import { useQuery } from "@tanstack/react-query";
import { getAllSpareParts } from "../api/api";
const useGetAllSpareParts = () => {
  const {
    data: spareParts,
    isLoading: loadinSpareParts,
    error: errorSpareParts,
  } = useQuery({
    queryKey: ["spareParts"],
    queryFn: () => getAllSpareParts(),
  });

  return {
    spareParts,
    loadinSpareParts,
    errorSpareParts,
  };
};

export default useGetAllSpareParts;
