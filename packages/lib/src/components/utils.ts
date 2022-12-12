import { Address, InterfaceIPv4Config, NMStateInterfaceType } from '../types';

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

export const getIPv4InitialValues = (ipv4?: InterfaceIPv4Config): InterfaceIPv4Config => ({
  enabled: ipv4?.enabled || true,
  dhcp: ipv4?.dhcp || false,
  'auto-dns': ipv4?.['auto-dns'] || false,
  'auto-gateway': ipv4?.['auto-gateway'] || false,
  'auto-routes': ipv4?.['auto-routes'] || false,
  'auto-route-table-id': ipv4?.['auto-route-table-id'] || '',
  address: (ipv4?.address || [newAddress]).map((address) => ({
    ip: address.ip || '',
    'prefix-length': address['prefix-length'] || 24,
  })),
});

export const buildInterfaceIPv4Config = (ipv4?: InterfaceIPv4Config): InterfaceIPv4Config => {
  if (ipv4?.enabled) {
    return {
      enabled: ipv4.enabled,
      dhcp: ipv4.dhcp,
      'auto-dns': ipv4.dhcp ? ipv4['auto-dns'] : undefined,
      'auto-gateway': ipv4.dhcp ? ipv4['auto-gateway'] : undefined,
      'auto-routes': ipv4.dhcp ? ipv4['auto-routes'] : undefined,
      'auto-route-table-id':
        ipv4.dhcp && ipv4['auto-routes'] ? ipv4['auto-route-table-id'] : undefined,
      address: !ipv4.dhcp ? ipv4.address : undefined,
    };
  }
  return { enabled: false };
};
