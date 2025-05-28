export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "40px",
    borderRadius: "6px",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#e3f2fd",
    border: "1px solid #bbdefb",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#bbdefb",
    },
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#1976d2",
    fontWeight: "500",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#1976d2",
    "&:hover": {
      backgroundColor: "#f44336",
      color: "white",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#999",
    fontStyle: "italic",
  }),
};
