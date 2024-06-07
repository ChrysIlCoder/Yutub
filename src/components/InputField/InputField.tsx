import { CSSProperties, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import "./InputField.scss";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

interface IInputFieldProps {
  input: 'input' | 'textarea'
  label?: string;
  options?: InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>;
  styles?: CSSProperties;
  classname?: string;
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  name: string;
}

export default function InputField({ ...props }: IInputFieldProps) {
  return props.input === 'input' ? (
    <div className={`input_field_container ${props.classname}`}>
      {props.label && <label className="input_field_container__label">{props.label}</label>}
      <input
        className="input_field_container__input"
        {...(props.options) as InputHTMLAttributes<HTMLInputElement>}
        style={props.errors[props.name] ? { ...props.styles, outlineColor: 'red' } : {...props.styles}}
        {...props.register(props.name, { required: props.required })}
      />
      <ErrorMessage 
        errors={props.errors}
        name={props.name}
        render={() => (
          <div className="input_field_container__error_container">
            <FontAwesomeIcon icon={faWarning} size="xs" color="red" />
            <p className="input_field_container__error_container__error">Check this field</p>
          </div>
        )}
      />
    </div>
  ) : (
    <div className={`input_field_container ${props.classname}`}>
      {props.label && <label className="input_field_container__label">{props.label}</label>}
      <textarea
        className="input_field_container__input"
        {...(props.options) as TextareaHTMLAttributes<HTMLTextAreaElement>}
        style={{ ...props.styles }}
        {...props.register(props.name)}
      />
      <ErrorMessage 
        errors={props.errors}
        name={props.name}
        render={() => (
          <div className="input_field_container__error_container">
            <FontAwesomeIcon icon={faWarning} size="xs" color="red" />
            <p className="input_field_container__error_container__error">Check this field</p>
          </div>
        )}
      />
    </div>
  );
}
