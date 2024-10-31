import { useQuery } from "@tanstack/react-query";
import { getUnicTrun } from "../api/api";
const useGetUnicTrun = (id) => {
  const {
    data: trun,
    isLoading: loadinTrun,
    error: errorTrun,
  } = useQuery({
    queryKey: ["tunr", id],
    enabled: !!id && id !== "null" && id !== "",
    queryFn: () => getUnicTrun(id),
  });

  return {
    trun,
    loadinTrun,
    errorTrun,
  };
};

export default useGetUnicTrun;
