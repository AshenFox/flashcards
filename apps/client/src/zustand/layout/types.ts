export type LayoutState = {
  header_height: number;
  header_width: number;
  dropdown_active: boolean;
};

export type LayoutStore = LayoutState & {
  setHeaderDimensions: (payload: { height: number; width: number }) => void;
  setDropdownActive: (value: boolean) => void;
};
