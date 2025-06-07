import { StylesConfig } from "react-select";

import { TagOption } from "./types";

export const customStyles: StylesConfig<TagOption, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--element-background-color)",
    border: "1px solid var(--element-border-color)",
    borderRadius: "0.5rem",
    minHeight: "3rem",
    fontSize: "1.4rem",
    color: "var(--text-color)",
    cursor: "text",
    boxShadow: "none",
    outline: "none",
    "&:hover": {
      borderColor: "var(--active-color)",
    },
  }),
  input: provided => ({
    ...provided,
    color: "var(--text-color)",
    fontSize: "1.7rem",
    gridTemplateColumns: "auto 0",

    "& input": {
      opacity: "1 !important",
      width: "100%",
      gridArea: "1 / 1 !important",
    },
  }),
  placeholder: provided => ({
    ...provided,
    color: "var(--subtle-text-color)",
    fontSize: "1.7rem",
  }),
  singleValue: provided => ({
    ...provided,
    color: "var(--text-color)",
    fontSize: "1.7rem",
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: "var(--element-background-color)",
    border: "1px solid var(--element-border-color)",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 9999,
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--active-color)"
      : state.isFocused
        ? "var(--active-color)"
        : "transparent",
    color:
      state.isSelected || state.isFocused
        ? "var(--active-secondary-color)"
        : "var(--text-color)",
    fontSize: "1.4rem",
    padding: "0.8rem 1.2rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--active-color)",
    },
    transition: "all 0.1s",
  }),
  noOptionsMessage: provided => ({
    ...provided,
    color: "var(--subtle-text-color)",
    fontSize: "1.7rem",
    padding: "0.8rem 1.2rem",
  }),
};
