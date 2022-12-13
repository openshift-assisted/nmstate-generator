import { Button, ButtonVariant, Form, ModalBoxBody, ModalBoxFooter } from '@patternfly/react-core';
import { Formik, FormikConfig, FormikProps } from 'formik';
import { EthernetInterface, InterfaceState, NMStateInterfaceType } from '../../types';
import { BooleanCheckboxField, NumberInputField } from '../formInputs';
import IPv4Fields from '../formInputs/IPv4Fields';
import MACAddressInputField from '../formInputs/MACAddressInputField';
import SelectField from '../formInputs/SelectField';
import TextInputField from '../formInputs/TextInputField';
import { NMStateInterfaceDialogProps } from '../NMStateInterfaceDialog';
import { buildInterfaceIPv4Config, getIPv4InitialValues } from '../utils';

type FormValues = Omit<EthernetInterface, 'duplex'> & { duplex: 'half' | 'full' | '' };

type EthernetInterfaceFormProps = Omit<
  NMStateInterfaceDialogProps,
  'newInterfaceType' | 'nmstateInterface'
> & {
  nmstateInterface?: EthernetInterface;
};

function EthernetInterfaceForm({
  nmstateInterface,
  updateInterface,
  addInterface,
  onClose,
}: EthernetInterfaceFormProps) {
  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = (values) => {
    const updatedInterface: EthernetInterface = {
      ...values,
      'auto-negotiation':
        values['auto-negotiation'] === false
          ? values['auto-negotiation']
          : values.duplex || values.speed
          ? values['auto-negotiation']
          : undefined,
      duplex: values.duplex || undefined,
      speed: values.speed || undefined,
      ipv4: buildInterfaceIPv4Config(values.ipv4),
    };

    if (nmstateInterface) {
      updateInterface(updatedInterface);
    } else {
      addInterface(updatedInterface);
    }
    onClose();
  };

  return (
    <Formik<FormValues>
      initialValues={{
        type: NMStateInterfaceType.ETHERNET,
        name: nmstateInterface?.name || '',
        state: InterfaceState.UP,
        'mac-address': nmstateInterface?.['mac-address'] || '',
        ipv4: getIPv4InitialValues(nmstateInterface?.ipv4),
        'auto-negotiation':
          nmstateInterface?.['auto-negotiation'] === undefined
            ? true
            : nmstateInterface['auto-negotiation'],
        duplex: nmstateInterface?.duplex || '',
        speed: nmstateInterface?.speed || 0,
      }}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ isSubmitting, isValid, submitForm }: FormikProps<FormValues>) => (
        <>
          <ModalBoxBody>
            <Form>
              <TextInputField name="name" label="Name" isRequired />
              <MACAddressInputField />
              <IPv4Fields />
              <BooleanCheckboxField
                name="auto-negotiation"
                label="Speed and duplex auto negotiation"
              />
              <SelectField
                name="duplex"
                label="Duplex"
                options={[
                  { label: '', value: '' },
                  { label: 'Full duplex', value: 'full' },
                  { label: 'Half duplex', value: 'half' },
                ]}
              />
              <NumberInputField name="speed" label="Speed (Mbps)" min={0} />
            </Form>
          </ModalBoxBody>
          <ModalBoxFooter>
            <Button onClick={submitForm} isDisabled={isSubmitting || !isValid}>
              Save
            </Button>
            <Button onClick={onClose} variant={ButtonVariant.secondary}>
              Cancel
            </Button>
          </ModalBoxFooter>
        </>
      )}
    </Formik>
  );
}

export default EthernetInterfaceForm;
