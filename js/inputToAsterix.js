function changeToAsterisk(e, value) {
  const target = e.target;
  setTimeout(() => {
    target.value = value.replace(/./g, "•") + target.value.slice(value.length);
  }, 250);
}

export default function inputToAsterisk(input, setValue) {
  input.addEventListener("input", handleChange);
  input.addEventListener("paste", (e) => e.preventDefault());

  let inputValue = "";

  function handleChange(e) {
    const currentValue = e.target.value;

    function setCheckedValue(value) {
      if (value.indexOf("•") !== -1) {
        inputValue = value.slice(0, value.indexOf("•"));
        e.target.value = currentValue.slice(0, value.indexOf("•"));
      } else {
        inputValue = value;
      }
      setValue(inputValue);
    }

    if (
      currentValue.length === inputValue.length &&
      currentValue[currentValue.length - 1] !== "•" &&
      currentValue[currentValue.length - 1] !==
        inputValue[currentValue.length - 1]
    ) {
      //      console.log("input same as value and last char is not asterisk");
      setCheckedValue(
        inputValue.slice(0, inputValue.length - 1) +
          currentValue.slice(inputValue.length - 1)
      );
      return;
    }

    if (currentValue.length < inputValue.length) {
      //   console.log("input shorter than value");
      if (
        currentValue.length &&
        currentValue[currentValue.length - 1] !== "•" &&
        currentValue[currentValue.length - 1] !==
          inputValue[currentValue.length - 1]
      ) {
        // console.log("input is shorter and last char not asterisk");
        setCheckedValue(
          inputValue.slice(0, currentValue.length - 1) + currentValue.slice(-1)
        );
        return;
      }
      setCheckedValue(inputValue.slice(0, currentValue.length));
      return;
    }
    // console.log("default // input bigger than value");

    setCheckedValue(inputValue + currentValue.slice(inputValue.length));

    if (inputValue.indexOf("•") === -1) changeToAsterisk(e, currentValue);
  }
}
