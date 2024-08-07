export interface User {
  subscriptions: {
    pc?: Subscription;
    tablet?: Subscription;
    mobile?: Subscription;
  };
  _id: string;
  username: string;
  email: string;
  registration_date: string;
  __v: number;
}

export interface AuthState {
  user: false | User;
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
