export type ErrorsArr = string[];

export interface ModalState {
  is_modal: boolean;
  active_modal: false | 'log_in' | 'sign_up' | 'delete';
  log_in: {
    username: string;
    password: string;
  };
  sign_up: {
    username: string;
    email: string;
    password: string;
  };
  loading: boolean;

  log_in_errors: {
    ok: boolean;
    username: {
      ok: boolean;
      errors: ErrorsArr;
    };
    password: {
      ok: boolean;
      errors: ErrorsArr;
    };
  };

  sign_up_errors: {
    ok: boolean;
    username: {
      ok: boolean;
      errors: ErrorsArr;
    };
    password: {
      ok: boolean;
      errors: ErrorsArr;
    };
    email: {
      ok: boolean;
      errors: ErrorsArr;
    };
  };
}

const modalInitState: ModalState = {
  is_modal: false,
  active_modal: false,
  log_in: {
    username: '',
    password: '',
  },
  sign_up: {
    username: '',
    email: '',
    password: '',
  },
  loading: false,

  log_in_errors: {
    ok: true,
    username: {
      ok: true,
      errors: [],
    },
    password: {
      ok: true,
      errors: [],
    },
  },

  sign_up_errors: {
    ok: false,
    username: {
      ok: true,
      errors: [],
    },
    password: {
      ok: true,
      errors: [],
    },
    email: {
      ok: true,
      errors: [],
    },
  },
};

export default modalInitState;
