import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps extends FieldRenderProps<number, any>, FormFieldProps {}

const NumberInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <input {...input} placeholder={placeholder} type="number"></input>
      {touched && error && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default NumberInput;
