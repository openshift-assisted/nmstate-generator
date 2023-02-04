import {
  FormGroup,
  FormSelect,
  FormSelectOption,
  FormSelectOptionProps,
} from '@patternfly/react-core';
import { useField } from 'formik';
import { BaseInputFieldProps } from './types';

type SelectFieldProps = BaseInputFieldProps & {
  options: FormSelectOptionProps[];
};

function SelectField({ name, label, isRequired = false, options }: SelectFieldProps) {
  const [field] = useField<string>(name);
  const fieldId = `${name}-input-field`;
  return (
    <FormGroup label={label} fieldId={fieldId} isRequired>
      <FormSelect
        {...field}
        id={fieldId}
        onChange={(value, event) => field.onChange(event)}
        isRequired={isRequired}
      >
        {options.map((option, index) => (
          <FormSelectOption
            key={index}
            isDisabled={option.isDisabled}
            value={option.value}
            label={option.label}
          />
        ))}
      </FormSelect>
    </FormGroup>
  );
}

export default SelectField;
