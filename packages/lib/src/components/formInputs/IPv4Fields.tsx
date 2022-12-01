import React from 'react';
import { Checkbox, FormGroup, Grid, Radio, RadioProps, TextInput } from '@patternfly/react-core';
import { useField, useFormikContext } from 'formik';
import { InterfaceIPv4Config } from '../../types/nmstate';

type BaseInputFieldProps = {
  name: string;
  label: string;
  isRequired?: boolean;
};

type TextInputFieldProps = BaseInputFieldProps;

function TextInputField({ name, label, isRequired = false }: TextInputFieldProps) {
  const [field, meta, helpers] = useField(name);
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

type BooleanCheckboxFieldProps = BaseInputFieldProps & { children?: React.ReactNode };

function BooleanCheckboxField({
  name,
  label,
  isRequired = false,
  children,
}: BooleanCheckboxFieldProps) {
  const [field, meta, helpers] = useField(name);
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

function IPv4Checkbox({ children }: { children: React.ReactNode }) {
  const [field, meta, helpers] = useField('ipv4');
  const fieldId = 'ipv4-input-field';
  return (
    <FormGroup fieldId={fieldId} isRequired>
      <Checkbox
        label="Enable IPv4"
        id={fieldId}
        name="ipv4"
        aria-label="Enable IPv4"
        isChecked={field.value.enabled}
        onChange={(checked, event) => helpers.setValue({ ...field.value, enabled: checked })}
        body={children}
      />
    </FormGroup>
  );
}

function DHCPRadioField() {
  const [field, meta, helpers] = useField('ipv4.dhcp');
  const fieldId = 'ipv4-dhcp-input-field';

  const handleRadioChange: RadioProps['onChange'] = (checked, event) => {
    if ((event.target as HTMLInputElement).id === 'ipv4-dhcp-radio-dhcp-enabled' && checked) {
      helpers.setValue(true);
    }
    if ((event.target as HTMLInputElement).id === 'ipv4-dhcp-radio-dhcp-disabled' && checked) {
      helpers.setValue(false);
    }
  };

  return (
    <FormGroup role="radiogroup" fieldId={fieldId} isInline>
      <Radio
        name="ipv4.dhcp"
        label="Static IP"
        id="ipv4-dhcp-radio-dhcp-disabled"
        isChecked={!field.value}
        onChange={handleRadioChange}
      />
      <Radio
        name="ipv4.dhcp"
        label="DHCP"
        id="ipv4-dhcp-radio-dhcp-enabled"
        isChecked={field.value}
        onChange={handleRadioChange}
      />
    </FormGroup>
  );
}

function IPv4Fields() {
  const { values } = useFormikContext<{ ipv4?: InterfaceIPv4Config }>();
  return (
    <IPv4Checkbox>
      {values.ipv4?.enabled && (
        <Grid hasGutter>
          <DHCPRadioField />
          {values.ipv4.dhcp && (
            <Grid hasGutter>
              <BooleanCheckboxField name="ipv4.auto-dns" label="Auto DNS" />
              <BooleanCheckboxField name="ipv4.auto-gateway" label="Auto gateway" />
              <BooleanCheckboxField name="ipv4.auto-routes" label="Auto routes" />
              {values.ipv4['auto-routes'] && (
                <TextInputField name="ipv4.auto-route-table-id" label="Auto route table ID" />
              )}
            </Grid>
          )}
          {!values.ipv4.dhcp && (
            <>
              <TextInputField name="ipv4.address.0.ip" label="IP address" />
              <TextInputField name="ipv4.address.0.prefix-length" label="Prefix length" />
            </>
          )}
        </Grid>
      )}
    </IPv4Checkbox>
  );
}

export default IPv4Fields;
