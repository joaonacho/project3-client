import Select from "react-select";

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor,
    padding: 20,
    backgroundColor: "white",
  }),

  control: (_, { selectProps: { width } }) => ({
    width: "200px",
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

export const Test = ({ options }) => (
  <Select
    styles={customStyles}
    width="200px"
    menuColor="red"
    options={options}
  />
);
