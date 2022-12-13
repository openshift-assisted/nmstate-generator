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
  dhcp?: boolean;
  'auto-dns'?: boolean;
  'auto-gateway'?: boolean;
  'auto-routes'?: boolean;
  'auto-route-table-id'?: string;
  address?: Address[];
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
  BOND = 'bond',
  OVS_BRIDGE = 'ovs-bridge',
}

export enum InterfaceState {
  UP = 'up',
  DOWN = 'down',
  ABSENT = 'absent',
}

export enum BondMode {
  ROUND_ROBIN = 'balance-rr',
  ACTIVE_BACKUP = 'active-backup',
  XOR = 'balance-xor',
  BROADCAST = 'broadcast',
  LACP = '802.3ad',
  TLB = 'balance-tlb',
  ALB = 'balance-alb',
}

export type NMStateInterface = {
  name: string;
  type: NMStateInterfaceType;
  state: InterfaceState;
  mtu?: number;
  'mac-address'?: string;
  description?: string;
  ipv4?: InterfaceIPv4Config;
  ipv6?: InterfaceIPv6Config;
};

export type EthernetInterface = NMStateInterface & {
  'auto-negotiation'?: boolean;
  duplex?: 'full' | 'half';
  speed?: number;
};

export type VLANInterface = NMStateInterface & {
  id: number;
  'base-iface': string;
};

export type BondInterface = NMStateInterface & {
  mode?: BondMode;
  options?: Record<string, unknown>;
  ports: string[];
};

export type NMStateConfig = {
  'dns-resolver'?: NMStateDNSResolver;
  routes?: {
    config: NMStateRoutesConfig[];
  };
  interfaces: NMStateInterface[];
};
