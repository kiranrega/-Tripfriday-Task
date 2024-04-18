import { useState, useCallback } from 'react';

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const resetValue = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, handleChange, resetValue };
};

export default useFormInput;