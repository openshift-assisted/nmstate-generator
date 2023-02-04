import { FormGroup, NumberInput, NumberInputProps } from '@patternfly/react-core';
import { useField } from 'formik';
import { BaseInputFieldProps } from './types';

type NumberInputFieldProps = BaseInputFieldProps & NumberInputProps;

function NumberInputField({ name, label, isRequired = false, ...props }: NumberInputFieldProps) {
  const [field, , helpers] = useField<number>(name);
  const fieldId = `${name}-input-field`;
  const onPlus: NumberInputProps['onPlus'] = (event) => helpers.setValue(field.value + 1);
  const onMinus: NumberInputProps['onMinus'] = (event) => helpers.setValue(field.value - 1);
  return (
    <FormGroup label={label} fieldId={fieldId} isRequired>
      <NumberInput
        {...field}
        onMinus={onMinus}
        onPlus={onPlus}
        inputName={name}
        inputAriaLabel="number input"
        minusBtnAriaLabel="minus"
        plusBtnAriaLabel="plus"
        id={fieldId}
        onChange={field.onChange}
        required={isRequired}
        {...props}
      />
    </FormGroup>
  );
}

export default NumberInputField;
