export const handleChange = (e, inputValue, setFunction) => {
  setFunction({
    ...inputValue,
    [e.target.name]: e.target.value,
  });
};
