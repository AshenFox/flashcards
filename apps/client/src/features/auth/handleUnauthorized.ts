import { PUBLIC_LANDING_PATH } from "@flashcards/common";
import Router from "next/router";

import { getAuthStore } from "./store/storeRef";

export const handleUnauthorized = () => {
  getAuthStore()?.getState().clearSession();

  if (Router.pathname !== PUBLIC_LANDING_PATH)
    void Router.replace(PUBLIC_LANDING_PATH);
};

