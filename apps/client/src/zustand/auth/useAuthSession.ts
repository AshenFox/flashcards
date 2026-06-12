import { useQuery } from "@tanstack/react-query";

import { authSessionQueryKey } from "./authSessionQueryKey";
import { bootstrapSession } from "./bootstrapSession";

export function useAuthSession() {
  return useQuery({
    queryKey: authSessionQueryKey,
    queryFn: bootstrapSession,
    retry: 1,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
