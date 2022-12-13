import {
  ButtonVariant,
  Dropdown,
  DropdownItem,
  DropdownProps,
  DropdownToggle,
} from '@patternfly/react-core';
import PlusIcon from '@patternfly/react-icons/dist/esm/icons/plus-icon';
import React from 'react';
import { NMStateInterfaceType } from '../types';
import { getInterfaceTypeLabel } from './utils';

type AddInterfaceDropdownProps = {
  addInterface: (interfaceType: NMStateInterfaceType) => void;
};

const dropdownItems = [
  <DropdownItem
    key={NMStateInterfaceType.ETHERNET}
    component="button"
    componentID={NMStateInterfaceType.ETHERNET}
  >
    {getInterfaceTypeLabel(NMStateInterfaceType.ETHERNET)}
  </DropdownItem>,
  <DropdownItem
    key={NMStateInterfaceType.VLAN}
    component="button"
    componentID={NMStateInterfaceType.VLAN}
  >
    {getInterfaceTypeLabel(NMStateInterfaceType.VLAN)}
  </DropdownItem>,
  <DropdownItem
    key={NMStateInterfaceType.BOND}
    component="button"
    componentID={NMStateInterfaceType.BOND}
  >
    {getInterfaceTypeLabel(NMStateInterfaceType.BOND)}
  </DropdownItem>,
  <DropdownItem
    key={NMStateInterfaceType.OVS_BRIDGE}
    component="button"
    componentID={NMStateInterfaceType.OVS_BRIDGE}
    isDisabled
  >
    {getInterfaceTypeLabel(NMStateInterfaceType.OVS_BRIDGE)}
  </DropdownItem>,
];

function AddInterfaceDropdown({ addInterface }: AddInterfaceDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleSelect: DropdownProps['onSelect'] = (event) => {
    setIsOpen(false);
    addInterface((event?.target as HTMLDivElement).id as NMStateInterfaceType);
  };
  return (
    <Dropdown
      onSelect={handleSelect}
      toggle={
        <DropdownToggle
          id="add-interface-toggle"
          toggleVariant={ButtonVariant.primary}
          onToggle={(isOpen) => setIsOpen(isOpen)}
        >
          <PlusIcon /> Add interface
        </DropdownToggle>
      }
      isOpen={isOpen}
      dropdownItems={dropdownItems}
    />
  );
}

export default AddInterfaceDropdown;
