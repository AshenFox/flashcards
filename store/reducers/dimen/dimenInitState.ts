export interface DimenState {
  header_height: number;
  header_width: number;
  scroll_height: number;
  game_controls_height: number;
  game_controls_width: number;
}

const dimenInitState: DimenState = {
  header_height: 0,
  header_width: 0,
  scroll_height: 0,
  game_controls_height: 0,
  game_controls_width: 0,
};

export default dimenInitState;
