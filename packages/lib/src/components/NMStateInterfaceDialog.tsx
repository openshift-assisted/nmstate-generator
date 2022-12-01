import {
  Button,
  ButtonVariant,
  Form,
  Modal,
  ModalBoxBody,
  ModalBoxFooter,
  ModalVariant,
} from '@patternfly/react-core';
import { Formik, FormikConfig, FormikProps } from 'formik';
import {
  InterfaceIPv4Config,
  InterfaceState,
  NMStateInterface,
  NMStateInterfaceType,
} from '../types';
import IPv4Fields from './formInputs/IPv4Fields';
import MACAddressInputField from './formInputs/MACAddressInputField';
import NameInputField from './formInputs/NameInputField';
import { getInterfaceTypeLabel } from './utils';

const getIPv4InitialValues = (ipv4?: InterfaceIPv4Config) => ({
  enabled: ipv4?.enabled || true,
  dhcp: ipv4?.dhcp || false,
  'auto-dns': ipv4?.['auto-dns'] || false,
  'auto-gateway': ipv4?.['auto-gateway'] || false,
  'auto-routes': ipv4?.['auto-routes'] || false,
  'auto-route-table-id': ipv4?.['auto-route-table-id'] || '',
  address: (ipv4?.address || []).map((address) => ({
    ip: address.ip || '',
    'prefix-length': address['prefix-length'] || 24,
  })),
});

type FormValues = NMStateInterface;

type NMStateInterfaceDialogProps = {
  newInterfaceType?: NMStateInterfaceType;
  nmstateInterface?: NMStateInterface;
  addInterface: (nmstateInterface: NMStateInterface) => void;
  updateInterface: (nmstateInterface: NMStateInterface) => void;
  onClose: () => void;
};

function NMStateInterfaceDialog({
  newInterfaceType,
  nmstateInterface,
  onClose,
  addInterface,
  updateInterface,
}: NMStateInterfaceDialogProps) {
  const interfaceType = nmstateInterface?.type || newInterfaceType || NMStateInterfaceType.ETHERNET;

  const handleSubmit: FormikConfig<FormValues>['onSubmit'] = (values) => {
    const updatedInterface: NMStateInterface = {
      ...values,
      ipv4: values.ipv4?.enabled
        ? {
            enabled: values.ipv4.enabled,
            dhcp: values.ipv4.dhcp,
            'auto-dns': values.ipv4.dhcp ? values.ipv4?.['auto-dns'] : undefined,
            'auto-gateway': values.ipv4.dhcp ? values.ipv4?.['auto-gateway'] : undefined,
            'auto-routes': values.ipv4.dhcp ? values.ipv4?.['auto-routes'] : undefined,
            'auto-route-table-id':
              values.ipv4.dhcp && values.ipv4['auto-routes']
                ? values.ipv4?.['auto-route-table-id']
                : undefined,
            address: !values.ipv4.dhcp ? values.ipv4.address : undefined,
          }
        : { enabled: false },
    };

    if (nmstateInterface) {
      updateInterface(updatedInterface);
    } else {
      addInterface(updatedInterface);
    }
    onClose();
  };

  const dialogTitle = `${nmstateInterface ? 'Edit' : 'Add'} ${getInterfaceTypeLabel(
    interfaceType
  )} interface`;

  return (
    <Modal
      aria-label="Add/Edit interface dialog"
      title={dialogTitle}
      onClose={onClose}
      variant={ModalVariant.medium}
      hasNoBodyWrapper
      isOpen
    >
      {/* {interfaceType === NMStateInterfaceType.ETHERNET && (
        <EthernetInterfaceForm nmstateInterface={nmstateInterface} />
      )} */}
      <Formik<FormValues>
        initialValues={{
          type: interfaceType,
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
                <NameInputField />
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
    </Modal>
  );
}

export default NMStateInterfaceDialog;
