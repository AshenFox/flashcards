export default {
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
