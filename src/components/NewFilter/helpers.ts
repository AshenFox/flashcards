import {
  CSSObjectWithLabel,
  GroupBase,
  StylesConfig,
  ThemeConfig,
} from "react-select";

export type Option = { value: string; label: string };

export const createCustomTheme: ThemeConfig = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "var(--active-color)",
    primary: "var(--active-color)",
  },
});

export const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: 0,
    paddingLeft: 3,
    paddingRight: 3,
    color: state.isFocused ? "var(--icon-fill)" : "var(--inactive-color)",
    ":hover": {
      color: "var(--icon-fill)",
    },
  }),

  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused
      ? "var(--active-color)"
      : "var(--element-border-color)",
    backgroundColor: "var(--element-background-color)",
    ":hover": {
      borderColor: "var(--active-color)",
    },
    boxShadow: "none",
    minHeight: "3.5rem",
    cursor: "pointer",
  }),
  option: (provided, state) => {
    const { isSelected } = state;

    const res: CSSObjectWithLabel = {
      ...provided,
      cursor: "pointer",
      transition: "all 0.1s",
      color: isSelected ? "var(--active-secondary-color)" : "var(--text-color)",
      backgroundColor: isSelected ? "var(--active-color)" : "transparent",
      ":hover": {
        backgroundColor: isSelected ? "var(--active-color)" : "transparent",
        color: isSelected
          ? "var(--active-secondary-color)"
          : "var(--active-color)",
      },
      height: "33px",
      display: "flex",
      alignItems: "center",
    };

    return res;
  },
  indicatorSeparator: provided => ({
    ...provided,
    backgroundColor: "var(--element-border-color)",
  }),
  singleValue: provided => ({
    ...provided,
    color: "var(--text-color)",
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: "var(--element-background-color)",
    border: "1px solid var(--element-border-color)",
    marginTop: "0.3rem",
    boxShadow: "none",
  }),
  valueContainer: provided => ({
    ...provided,
    input: {
      position: "absolute",
    },
  }),
};
