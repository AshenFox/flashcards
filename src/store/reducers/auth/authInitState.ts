import { UserDto } from "@common/api/entities";

export type AuthState = {
  user: false | UserDto;
  loading: boolean;
};

export type Subscription = {
  endpoint: string;
  expirationTime: null;
  key: {
    p256dh: string;
    auth: string;
  };
};

const authInitState: AuthState = { user: false, loading: true };

export default authInitState;
