import { FormSelectOptionProps } from '@patternfly/react-core';
import { useFormikContext } from 'formik';
import React from 'react';
import { NMStateInterface, NMStateInterfaceType } from '../../types/nmstate';
import { VLANInterfaceFormValues } from '../interfaceForms/VLANInterfaceForm';
import SelectField from './SelectField';

type VLANBaseInterfaceSelectFieldProps = {
  interfaces?: NMStateInterface[];
};
function VLANBaseInterfaceSelectField({ interfaces }: VLANBaseInterfaceSelectFieldProps) {
  const baseInterfaceOptions: FormSelectOptionProps[] = (interfaces || [])
    .filter(({ type }) => type === NMStateInterfaceType.ETHERNET)
    .map(({ name }) => ({ value: name, label: name }));

  const { values, setFieldValue } = useFormikContext<VLANInterfaceFormValues>();

  React.useEffect(() => {
    if (!values['base-iface']) {
      setFieldValue('base-iface', baseInterfaceOptions[0]?.value || '');
    }
  }, []);

  return (
    <SelectField
      name="base-iface"
      label="Base interface"
      options={baseInterfaceOptions}
      isRequired
    />
  );
}

export default VLANBaseInterfaceSelectField;
