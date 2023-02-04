import { Button, ButtonVariant, Form, ModalBoxBody, ModalBoxFooter } from '@patternfly/react-core';
import { Formik, FormikConfig, FormikProps } from 'formik';
import { InterfaceState, NMStateInterface, NMStateInterfaceType, VLANInterface } from '../../types';
import IPv4Fields from '../formInputs/IPv4Fields';
import NumberInputField from '../formInputs/NumberInputField';
import TextInputField from '../formInputs/TextInputField';
import VLANBaseInterfaceSelectField from '../formInputs/VLANBaseInterfaceSelectField';
import { NMStateInterfaceDialogProps } from '../NMStateInterfaceDialog';
import { buildInterfaceIPv4Config, getIPv4InitialValues } from '../utils';

export type VLANInterfaceFormValues = VLANInterface;

type VLANInterfaceFormProps = Omit<
  NMStateInterfaceDialogProps,
  'newInterfaceType' | 'nmstateInterface'
> & {
  nmstateInterface?: VLANInterface;
  interfaces?: NMStateInterface[];
};

function VLANInterfaceForm({
  nmstateInterface,
  interfaces,
  updateInterface,
  addInterface,
  onClose,
}: VLANInterfaceFormProps) {
  const handleSubmit: FormikConfig<VLANInterfaceFormValues>['onSubmit'] = (values) => {
    const updatedInterface: VLANInterface = {
      ...values,
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
    <Formik<VLANInterfaceFormValues>
      initialValues={{
        type: NMStateInterfaceType.VLAN,
        name: nmstateInterface?.name || '',
        state: InterfaceState.UP,
        'mac-address': nmstateInterface?.['mac-address'] || '',
        ipv4: getIPv4InitialValues(nmstateInterface?.ipv4),
        id: nmstateInterface?.id || 101,
        'base-iface': nmstateInterface?.['base-iface'] || '',
      }}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ isSubmitting, isValid, submitForm }: FormikProps<VLANInterfaceFormValues>) => (
        <>
          <ModalBoxBody>
            <Form>
              <VLANBaseInterfaceSelectField interfaces={interfaces} />
              <NumberInputField name="id" label="VLAN ID" min={0} isRequired />
              <TextInputField name="name" label="Name" isRequired />
              {/* <MACAddressInputField /> */}
              <IPv4Fields />
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

export default VLANInterfaceForm;
