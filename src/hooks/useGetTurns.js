import { useQuery } from "@tanstack/react-query";
import { getAllTurns } from "../api/api";
const useGetTruns = () => {
  const {
    data: turns,
    isLoading: loadinTurns,
    error: errorTurns,
    refetch,
  } = useQuery({
    queryKey: ["turns"],
    queryFn: () => getAllTurns(),
  });

  return {
    refetch,
    turns,
    loadinTurns,
    errorTurns,
  };
};

export default useGetTruns;
