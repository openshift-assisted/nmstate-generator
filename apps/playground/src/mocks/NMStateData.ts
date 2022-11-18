import { NMStateConfig, camelKeys, InterfaceState } from '@nmstate-ui/lib';

export const emptyNMStateConfig: NMStateConfig = {
  interfaces: [],
};

export const nmstateConfig1: NMStateConfig = {
  interfaces: [
    {
      name: 'eth0',
      type: 'ethernet',
      state: InterfaceState.UP,
      'mac-address': '02:00:00:80:12:14',
      ipv4: {
        enabled: true,
        address: [
          {
            ip: '192.168.126.30',
            'prefix-length': 24,
          },
        ],
        dhcp: false,
      },
    },
    {
      name: 'eth1',
      type: 'ethernet',
      state: InterfaceState.UP,
      'mac-address': '02:00:00:80:12:15',
      ipv4: {
        enabled: true,
        address: [
          {
            ip: '192.168.140.30',
            'prefix-length': 24,
          },
        ],
        dhcp: false,
      },
    },
  ],
  'dns-resolver': {
    config: {
      server: ['192.168.126.1'],
    },
  },
  routes: {
    config: [
      {
        destination: '0.0.0.0/0',
        'next-hop-address': '192.168.126.1',
        'next-hop-interface': 'eth1',
        'table-id': 254,
      },
      {
        destination: '0.0.0.0/0',
        'next-hop-address': '192.168.140.1',
        'next-hop-interface': 'eth1',
        'table-id': 254,
      },
    ],
  },
};

export const nmstateConfigs = [nmstateConfig1];
