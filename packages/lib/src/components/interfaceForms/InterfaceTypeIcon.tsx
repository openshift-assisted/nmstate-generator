import { faDiagramProject, faEthernet, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnknownIcon } from '@patternfly/react-icons';
import { NMStateInterfaceType } from '../../types/nmstate';

type InterfaceTypeIconProps = {
  interfaceType: NMStateInterfaceType;
};

function InterfaceTypeIcon({ interfaceType }: InterfaceTypeIconProps) {
  switch (interfaceType) {
    case NMStateInterfaceType.VLAN:
      return <FontAwesomeIcon icon={faNetworkWired} />;
    case NMStateInterfaceType.BOND:
      return <FontAwesomeIcon icon={faDiagramProject} />;
    case NMStateInterfaceType.ETHERNET:
      return <FontAwesomeIcon icon={faEthernet} />;
    default:
      return <UnknownIcon />;
  }
}

export default InterfaceTypeIcon;
