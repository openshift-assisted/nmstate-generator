import { FormGroup, TextInput } from '@patternfly/react-core';
import { useField } from 'formik';

function NameInputField() {
  const [field, meta, helpers] = useField('name');
  const fieldId = 'name-input-field';
  return (
    <FormGroup label="Name" fieldId={fieldId} isRequired>
      <TextInput
        type="text"
        id={fieldId}
        {...field}
        onChange={(value, event) => field.onChange(event)}
        isRequired
      />
    </FormGroup>
  );
}

export default NameInputField;
