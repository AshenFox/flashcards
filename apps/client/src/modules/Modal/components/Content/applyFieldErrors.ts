import type { AuthFieldErrors } from "@flashcards/common";
import type { FieldPath, UseFormSetError } from "react-hook-form";

export function applyFieldErrors<T extends Record<string, unknown>>(
  setError: UseFormSetError<T>,
  fieldErrors: AuthFieldErrors,
) {
  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages?.[0]) {
      setError(field as FieldPath<T>, {
        type: "server",
        message: messages[0],
      });
    }
  }
}
