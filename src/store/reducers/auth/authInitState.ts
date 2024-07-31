import { UserDto } from "@common/types";

export interface AuthState {
  user: false | UserDto;
  loading: boolean;
}

export interface Subscription {
  endpoint: string;
  expirationTime: null;
  key: {
    p256dh: string;
    auth: string;
  };
}

const authInitState: AuthState = { user: false, loading: true };

export default authInitState;
