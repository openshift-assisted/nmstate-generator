import { CardBody } from '@patternfly/react-core';
import { VLANInterface } from '../types';

function VLANInterfaceCardBody({ interface: iface }: { interface: VLANInterface }) {
  return (
    <CardBody>
      Name: <strong>{iface.name}</strong>
      <br />
      Base interface: <strong>{iface['base-iface']}</strong>
      <br />
      VLAN ID: <strong>{iface.id}</strong>
      {/* <br /> */}
      {/* MAC: <strong>{iface['mac-address']}</strong> */}
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

export default VLANInterfaceCardBody;
