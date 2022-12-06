import { Address, NMStateInterfaceType } from '../types';

export const getInterfaceTypeLabel = (interfaceType: NMStateInterfaceType) => {
  switch (interfaceType) {
    case NMStateInterfaceType.ETHERNET:
      return 'Ethernet';
    case NMStateInterfaceType.VLAN:
      return 'VLAN';
    case NMStateInterfaceType.BOND:
      return 'Bond';
    case NMStateInterfaceType.OVS_BRIDGE:
      return 'OVS Bridge';
  }
};

export const newAddress: Address = { ip: '', 'prefix-length': 24 };
