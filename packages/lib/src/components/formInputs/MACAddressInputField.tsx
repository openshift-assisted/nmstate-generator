import { FormGroup, TextInput } from '@patternfly/react-core';
import { useField } from 'formik';

function MACAddressInputField() {
  const [field] = useField('mac-address');
  const fieldId = 'name-input-field';
  return (
    <FormGroup label="MAC address" fieldId={fieldId} isRequired>
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

export default MACAddressInputField;
