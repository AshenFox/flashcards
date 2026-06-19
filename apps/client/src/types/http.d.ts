import type { UserDto } from "@flashcards/common";

// The Express auth guard resolves the session user once per request and hangs
// it on the request object so Next's getInitialProps can read it without a
// second lookup. Express's Request extends http.IncomingMessage and Next types
// ctx.req as IncomingMessage, so augmenting this one interface types both the
// write (server guard) and the read (client getInitialProps).
declare module "http" {
  interface IncomingMessage {
    user?: UserDto | null;
  }
}
