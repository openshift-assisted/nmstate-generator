import { CardBody } from '@patternfly/react-core';
import { BondInterface } from '../types';

function BondInterfaceCardBody({ interface: iface }: { interface: BondInterface }) {
  return (
    <CardBody>
      Name: <strong>{iface.name}</strong>
      <br />
      Ports: <strong>{iface.ports.join(', ')}</strong>
      {iface.ipv4?.enabled && (
        <>
          <br />
          IPv4:{' '}
          <strong>
            {iface.ipv4?.dhcp && 'DHCP'}
            {iface.ipv4?.address?.map((a) => `${a.ip}/${a['prefix-length']}`).join(', ')}
          </strong>
        </>
      )}
      {iface.ipv6?.enabled && (
        <>
          <br />
          IPv6:
          <strong>
            {iface.ipv6?.address?.map((a) => `${a.ip}/${a['prefix-length']}`).join(', ')}
          </strong>
        </>
      )}
    </CardBody>
  );
}

export default BondInterfaceCardBody;
