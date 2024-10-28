import { useQuery } from "@tanstack/react-query";
import { getAllMecanics } from "../api/api";

const useGetMecanics = () => {
  const {
    data: mecanics,
    isLoading: loadinMecanics,
    error: errorMecanics,
  } = useQuery({
    queryKey: ["mecanics"],
    queryFn: () => getAllMecanics(),
  });

  return {
    mecanics,
    loadinMecanics,
    errorMecanics,
  };
};

export default useGetMecanics;
