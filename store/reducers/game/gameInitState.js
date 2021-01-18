export default {
  flashcards: {
    progress: 0,
    side: 'definition',
    shuffled: false,
    answers: [],
    is_turned: false,
  },
  write: {
    is_init: false,
    all_cards_num: 0,
    remaining: [],
    answer: '',
    copy_answer: '',
    answered: [],
    rounds: [],
  },
};

export const card_fields = {
  answer: false,
};
