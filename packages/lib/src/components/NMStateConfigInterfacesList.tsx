import {
  Button,
  ButtonVariant,
  Card,
  CardActions,
  CardBody,
  CardHeader,
  CardTitle,
  Gallery,
  GalleryItem,
} from '@patternfly/react-core';
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon';
import { NMStateInterface } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthernet } from '@fortawesome/free-solid-svg-icons';

type NMStateConfigInterfacesListProps = {
  interfaces: NMStateInterface[];
};

function NMStateConfigInterfacesList({ interfaces }: NMStateConfigInterfacesListProps) {
  return (
    <Gallery hasGutter>
      {interfaces.map((iface, index) => (
        <GalleryItem key={index}>
          <Card isCompact isRounded>
            <CardHeader>
              <CardActions>
                <Button variant={ButtonVariant.plain}>
                  <PencilAltIcon />
                </Button>
              </CardActions>
              <CardTitle>
                <FontAwesomeIcon icon={faEthernet} />
                &nbsp;{iface.type}
              </CardTitle>
            </CardHeader>
            <CardBody>
              Name: <strong>{iface.name}</strong>
              <br />
              MAC: <strong>{iface['mac-address']}</strong>
              {iface.ipv4 && (
                <>
                  <br />
                  IPv4:{' '}
                  <strong>
                    {iface.ipv4?.address.map((a) => `${a.ip}/${a['prefix-length']}`).join(', ')}
                  </strong>
                </>
              )}
              {iface.ipv6 && (
                <>
                  <br />
                  IPv6:
                  <strong>
                    {iface.ipv6?.address.map((a) => `${a.ip}/${a['prefix-length']}`).join(', ')}
                  </strong>
                </>
              )}
            </CardBody>
          </Card>
        </GalleryItem>
      ))}
    </Gallery>
  );
}

export default NMStateConfigInterfacesList;
