import {
  FormGroup,
  Select,
  SelectOption,
  SelectOptionProps,
  SelectProps,
  SelectVariant,
} from '@patternfly/react-core';
import { useField } from 'formik';
import React from 'react';
import { NMStateInterface, NMStateInterfaceType } from '../../types/nmstate';

type BondPortsMultiSelectFieldProps = {
  interfaces?: NMStateInterface[];
};
function BondPortsMultiSelectField({ interfaces }: BondPortsMultiSelectFieldProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [field, meta, helpers] = useField<string[]>('ports');
  const fieldId = `${name}-input-field`;

  const options: SelectOptionProps[] = (interfaces || [])
    .filter(({ type }) => [NMStateInterfaceType.ETHERNET, NMStateInterfaceType.VLAN].includes(type))
    .map(({ name }) => ({ value: name }));

  const handleSelect: SelectProps['onSelect'] = (event, selection) => {
    if (field.value.includes(selection.toString())) {
      helpers.setValue([...field.value.filter((item) => item !== selection.toString())]);
    } else {
      helpers.setValue([...field.value, selection.toString()]);
    }
  };

  return (
    <FormGroup label={'Ports'} fieldId={fieldId} isRequired>
      <Select
        {...field}
        variant={SelectVariant.typeaheadMulti}
        typeAheadAriaLabel="Select ports"
        onToggle={setIsExpanded}
        onSelect={handleSelect}
        onClear={() => helpers.setValue([])}
        selections={field.value}
        isOpen={isExpanded}
        id={fieldId}
        shouldResetOnSelect
      >
        {options.map((option, index) => (
          <SelectOption key={index} isDisabled={option.isDisabled} value={option.value} />
        ))}
      </Select>
    </FormGroup>
  );
}

export default BondPortsMultiSelectField;
