import { useMutation } from "@tanstack/react-query";

import { updateState } from "../api/api";

const useUpdateState = () => {
  const {
    isPending: isLoadingUpdateState,
    error: errorUpdateState,
    mutate: createUpdateState,
  } = useMutation({
    mutationFn: updateState,
  });
  return { isLoadingUpdateState, errorUpdateState, createUpdateState };
};

export default useUpdateState;
