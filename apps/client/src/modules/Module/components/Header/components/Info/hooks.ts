import { srDropCards } from "@api/methods";
import { useCardsCash } from "@components/Cards";
import { saveLastUpdate } from "@store/helper-functions";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export const useDropAllCardsSR = () => {
  const cardsCache = useCardsCash();

  const mutation = useMutation({
    mutationFn: (_id_arr: string[]) => srDropCards(_id_arr),
    onSuccess: data => {
      saveLastUpdate();
      cardsCache.set(entries => {
        for (const entry of entries) {
          entry.stage = data.stage;
          entry.nextRep = data.nextRep;
          entry.prevStage = data.prevStage;
          entry.lastRep = data.lastRep;
        }
      });
    },
  });

  const dropAllCardsSR = useCallback(() => {
    const allCards = cardsCache.getAllCards();
    const _id_arr = allCards.map(c => c._id);
    if (!_id_arr.length) return;
    mutation.mutate(_id_arr);
  }, [mutation, cardsCache]);

  return dropAllCardsSR;
};
