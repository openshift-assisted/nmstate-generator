import { Button, ButtonVariant, Form, ModalBoxBody, ModalBoxFooter } from '@patternfly/react-core';
import { Formik, FormikConfig, FormikProps } from 'formik';
import { InterfaceState, NMStateInterface, NMStateInterfaceType } from '../../types';
import IPv4Fields from '../formInputs/IPv4Fields';
import MACAddressInputField from '../formInputs/MACAddressInputField';
import TextInputField from '../formInputs/TextInputField';
import { NMStateInterfaceDialogProps } from '../NMStateInterfaceDialog';
import { buildInterfaceIPv4Config, getIPv4InitialValues } from '../utils';

type FormValues = NMStateInterface;

type VLANInterfaceFormProps = Omit<NMStateInterfaceDialogProps, 'interfaceType'>;

function VLANInterfaceForm({
  nmstateInterface,
  updateInterface,
  addInterface,
  onClose,
}: VLANInterfaceFormProps) {
  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = (values) => {
    const updatedInterface: NMStateInterface = {
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
    <Formik<FormValues>
      initialValues={{
        type: NMStateInterfaceType.VLAN,
        name: nmstateInterface?.name || '',
        state: InterfaceState.UP,
        'mac-address': nmstateInterface?.['mac-address'] || '',
        ipv4: getIPv4InitialValues(nmstateInterface?.ipv4),
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
