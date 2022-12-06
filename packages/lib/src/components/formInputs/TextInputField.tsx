import { FormGroup, TextInput } from '@patternfly/react-core';
import { useField } from 'formik';
import { BaseInputFieldProps } from './types';

type TextInputFieldProps = BaseInputFieldProps;

function TextInputField({ name, label, isRequired = false }: TextInputFieldProps) {
  const [field, meta, helpers] = useField<string>(name);
  const fieldId = `${name}-input-field`;
  return (
    <FormGroup label={label} fieldId={fieldId} isRequired>
      <TextInput
        type="text"
        id={fieldId}
        {...field}
        onChange={(value, event) => field.onChange(event)}
        isRequired={isRequired}
      />
    </FormGroup>
  );
}

export default TextInputField;
