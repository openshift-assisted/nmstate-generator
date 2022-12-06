import {
  Button,
  ButtonVariant,
  Checkbox,
  Flex,
  FlexItem,
  FormGroup,
  Radio,
  RadioProps,
  Stack,
} from '@patternfly/react-core';
import PlusIcon from '@patternfly/react-icons/dist/esm/icons/plus-icon';
import TrashIcon from '@patternfly/react-icons/dist/esm/icons/trash-icon';
import { FieldArray, useField, useFormikContext } from 'formik';
import React from 'react';
import { InterfaceIPv4Config } from '../../types/nmstate';
import { newAddress } from '../utils';
import BooleanCheckboxField from './BooleanCheckboxField';
import NumberInputField from './NumberInputField';
import TextInputField from './TextInputField';

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
        <Stack hasGutter>
          <DHCPRadioField />
          {values.ipv4.dhcp && (
            <Stack hasGutter>
              <BooleanCheckboxField name="ipv4.auto-dns" label="Auto DNS" />
              <BooleanCheckboxField name="ipv4.auto-gateway" label="Auto gateway" />
              <BooleanCheckboxField name="ipv4.auto-routes" label="Auto routes" />
              {values.ipv4['auto-routes'] && (
                <TextInputField name="ipv4.auto-route-table-id" label="Auto route table ID" />
              )}
            </Stack>
          )}
          {!values.ipv4.dhcp && (
            <FieldArray name="ipv4.address">
              {({ insert, remove, push }) => (
                <>
                  {(values.ipv4?.address || []).map((value, index) => (
                    <Flex key={index} justifyContent={{ default: 'justifyContentFlexEnd' }}>
                      <FlexItem flex={{ default: 'flex_1' }}>
                        <TextInputField name={`ipv4.address.${index}.ip`} label="IP address" />
                      </FlexItem>
                      <FlexItem alignSelf={{ default: 'alignSelfFlexEnd' }}>
                        <Button
                          onClick={() => remove(index)}
                          style={{ paddingRight: 0, paddingLeft: 0 }}
                          variant={ButtonVariant.plain}
                          isInline
                          isDisabled
                        >
                          /
                        </Button>
                      </FlexItem>
                      <FlexItem align={{ default: 'alignRight' }}>
                        <NumberInputField
                          name={`ipv4.address.${index}.prefix-length`}
                          label="Prefix length"
                          min={1}
                          max={32}
                        />
                      </FlexItem>
                      <FlexItem alignSelf={{ default: 'alignSelfFlexEnd' }}>
                        <Button
                          title="Remove"
                          variant={ButtonVariant.plain}
                          onClick={() => remove(index)}
                          style={{ paddingRight: 0, paddingLeft: 0 }}
                          isDisabled={!index}
                        >
                          <TrashIcon />
                        </Button>
                      </FlexItem>
                    </Flex>
                  ))}
                  <Flex>
                    <Button
                      title="Add address"
                      onClick={() => push(newAddress)}
                      variant={ButtonVariant.secondary}
                      isSmall
                    >
                      <PlusIcon /> Add address
                    </Button>
                  </Flex>
                </>
              )}
            </FieldArray>
          )}
        </Stack>
      )}
    </IPv4Checkbox>
  );
}

export default IPv4Fields;
