import { srGetCount } from "@api/methods";
import { useQuery } from "@tanstack/react-query";

export const useSRCountQuery = () =>
  useQuery({
    queryKey: ["sr", "count"],
    queryFn: srGetCount,
  });
