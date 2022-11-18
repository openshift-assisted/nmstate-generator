export enum IPVersions {
  ipv4 = 'ipv4',
  ipv6 = 'ipv6',
}

export type Address = {
  ip: string;
  'prefix-length': number;
};

// https://nmstate.io/devel/api.html#interfaceip
export type InterfaceIPConfig = {
  enabled: boolean;
  dhcp: boolean;
  'auto-dns'?: boolean;
  'auto-gateway'?: boolean;
  'auto-routes'?: boolean;
  'auto-route-table-id'?: number;
  address: Address[];
};

export type InterfaceIPv4Config = InterfaceIPConfig;

export type InterfaceIPv6Config = InterfaceIPConfig & {
  autoconf?: boolean;
};

export type NMStateRoutesConfig = {
  destination: string;
  'next-hop-address': string;
  'next-hop-interface': string;
  'table-id': number;
};

export type NMStateDNSResolver = {
  config: {
    server: string[];
  };
};

export enum NMStateInterfaceType {
  ETHERNET = 'ethernet',
  VLAN = 'vlan',
}

export enum InterfaceState {
  UP = 'up',
  DOWN = 'down',
  ABSENT = 'absent',
}

export type NMStateInterface = {
  name: string;
  type: string;
  state: InterfaceState;
  mtu?: number;
  'mac-address': string;
  description?: string;
  ipv4?: InterfaceIPv4Config;
  ipv6?: InterfaceIPv6Config;
};

export type NMStateConfig = {
  'dns-resolver'?: NMStateDNSResolver;
  routes?: {
    config: NMStateRoutesConfig[];
  };
  interfaces: NMStateInterface[];
};
