import { CardBody } from '@patternfly/react-core';
import { EthernetInterface } from '../types';

function EthernetInterfaceCardBody({ interface: iface }: { interface: EthernetInterface }) {
  return (
    <CardBody>
      Name: <strong>{iface.name}</strong>
      <br />
      MAC: <strong>{iface['mac-address']}</strong>
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

export default EthernetInterfaceCardBody;
