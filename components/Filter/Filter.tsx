import Input from "@ui/Input";
import clsx from "clsx";
import { ChangeEventHandler, memo, useRef } from "react";
import Select, {
  GroupBase,
  Options,
  StylesConfig,
  ThemeConfig,
} from "react-select";

import s from "./styles.module.scss";

export type Option = { value: string; label: string };

const createCustomTheme: ThemeConfig = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "var(--highlighted-element-background-color)",
    primary: "var(--highlighted-element-background-color)",
  },
});

const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    paddingLeft: 3,
    paddingRight: 3,
    color: state.isFocused ? "var(--icon-fill)" : "var(--icon-pale-fill)",
    ":hover": {
      color: "var(--icon-fill)",
    },
  }),
  control: provided => ({
    ...provided,
    borderColor: "var(--element-border-color)",
  }),
  option: provided => ({
    ...provided,
    color: "var(--text-color)",
  }),
  indicatorSeparator: provided => ({
    ...provided,
    backgroundColor: "var(--element-border-color)",
  }),
  singleValue: provided => ({
    ...provided,
    color: "var(--text-color)",
  }),
};

type FilterProps = {
  className?: string;
  search?: {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
  };
  selects?: {
    id: string;
    value: Option;
    options: Options<Option>;
    setValue: (value: Option) => void;
    alwaysReload?: boolean;
  }[];
  getData: () => void;
  resetData: () => void;
};

const Filter = ({
  className,
  search,
  selects,
  getData,
  resetData,
}: FilterProps) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const onInnerSearchChange: ChangeEventHandler<HTMLInputElement> = e => {
    search.setValue(e.target.value);
    resetData();

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      getData();
    }, 500);
  };

  return (
    <div className={clsx(s.filter, className)}>
      <div className={s.container}>
        {!!search && (
          <Input
            placeholder={search.placeholder}
            value={search.value}
            onChange={onInnerSearchChange}
            className={s.search}
          />
        )}
        <div className={s.select_group}>
          {selects?.map(select => {
            const onChange = (value: Option) => {
              select.setValue(value);

              if (search.value || select.alwaysReload) {
                resetData();
                getData();
              }
            };

            return (
              <Select<Option>
                key={select.id}
                instanceId={select.id}
                className={s.select}
                options={select.options}
                onChange={onChange}
                value={select.value}
                isSearchable={false}
                theme={createCustomTheme}
                styles={customStyles}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Filter);
