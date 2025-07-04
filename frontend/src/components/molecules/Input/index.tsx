import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps {
  Icon?: LucideIcon;
  label?: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input = ({
  Icon,
  label,
  value,
  handleChange,
  placeholder,
}: InputProps) => {
  return (
    <>
      {label && <label htmlFor={label}>{label}</label>}
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
