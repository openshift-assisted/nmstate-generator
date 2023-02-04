import { Checkbox, FormGroup } from '@patternfly/react-core';
import { useField } from 'formik';
import { BaseInputFieldProps } from './types';

type BooleanCheckboxFieldProps = BaseInputFieldProps & { children?: React.ReactNode };

function BooleanCheckboxField({
  name,
  label,
  isRequired = false,
  children,
}: BooleanCheckboxFieldProps) {
  const [field, , helpers] = useField(name);
  const fieldId = `${name}-input-field`;
  return (
    <FormGroup fieldId={fieldId} isRequired>
      <Checkbox
        id={fieldId}
        label={label}
        {...field}
        isChecked={field.value}
        onChange={(checked, event) => helpers.setValue(checked)}
        body={children}
        isRequired={isRequired}
      />
    </FormGroup>
  );
}

export default BooleanCheckboxField;
