import { Modal, ModalVariant } from '@patternfly/react-core';
import { NMStateInterface, NMStateInterfaceType } from '../types';
import EthernetInterfaceForm from './interfaceForms/EthernetInterfaceForm';
import VLANInterfaceForm from './interfaceForms/VLANInterfaceForm';
import { getInterfaceTypeLabel } from './utils';

export type NMStateInterfaceDialogProps = {
  newInterfaceType?: NMStateInterfaceType;
  nmstateInterface?: NMStateInterface;
  addInterface: (nmstateInterface: NMStateInterface) => void;
  updateInterface: (nmstateInterface: NMStateInterface) => void;
  onClose: () => void;
};

function NMStateInterfaceDialog(props: NMStateInterfaceDialogProps) {
  const { newInterfaceType, nmstateInterface, onClose } = props;

  const interfaceType = nmstateInterface?.type || newInterfaceType || NMStateInterfaceType.ETHERNET;

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
      {interfaceType === NMStateInterfaceType.ETHERNET && <EthernetInterfaceForm {...props} />}
      {interfaceType === NMStateInterfaceType.VLAN && <VLANInterfaceForm {...props} />}
    </Modal>
  );
}

export default NMStateInterfaceDialog;
