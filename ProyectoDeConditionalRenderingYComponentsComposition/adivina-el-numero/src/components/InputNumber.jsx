function InputNumber({ value, onChange, disabled }) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder="Ingresa un número"
      min="1"
      max="100"
    />
  );
}

export default InputNumber;