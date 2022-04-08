export interface SrState {
  all_num: number;
  repeat_num: number;
  next_num: number;
  next_date: false | string;
  counter: number;
  loading: boolean;
}

const srInitState: SrState = {
  all_num: 0,
  repeat_num: 0,
  next_num: 0,
  next_date: false,
  counter: 0,
  loading: false,
};

export default srInitState;
