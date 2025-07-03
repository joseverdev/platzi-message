import React from 'react';

interface InputProps {
  Icon?: import('lucide-react').LucideIcon;
  label: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  Icon,
  label,
  value,
  handleChange,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <div className="input-container">
        {Icon && <Icon className="input-icon" size={20} />}
        <input
          id={label}
          className="login-form__input login-form__input--with-icon light-shadow"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Input;
