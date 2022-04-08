export interface DimenState {
  header_height: number;
  header_width: number;
  scroll_height: number;
  game_controls_height: number;
  game_controls_width: number;
  scroll_width: number;
  is_scroll: boolean;
}

const dimenInitState: DimenState = {
  header_height: 0,
  header_width: 0,
  scroll_height: 0,
  game_controls_height: 0,
  game_controls_width: 0,
  scroll_width: 0,
  is_scroll: false,
};

export default dimenInitState;
