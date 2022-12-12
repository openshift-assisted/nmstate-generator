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
import TrashIcon from '@patternfly/react-icons/dist/esm/icons/trash-icon';
import React from 'react';
import { NMStateInterface, NMStateInterfaceType } from '../types';
import InterfaceTypeIcon from './interfaceForms/InterfaceTypeIcon';
import { getInterfaceTypeLabel } from './utils';

type NMStateConfigInterfacesListProps = {
  interfaces: (NMStateInterface | undefined)[];
  onEditInterface: (interfaceIndex: number) => void;
  onDeleteInterface: (interfaceIndex: number) => void;
};

function NMStateConfigInterfacesList({
  interfaces,
  onEditInterface,
  onDeleteInterface,
}: NMStateConfigInterfacesListProps) {
  const [hoveredCardIndex, setHoveredCardIndex] = React.useState<number>();
  return (
    <Gallery hasGutter>
      {interfaces.map((iface, index) => {
        if (iface) {
          return (
            <GalleryItem key={index}>
              <Card
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(undefined)}
                isCompact
                isRounded
              >
                <CardHeader>
                  {index === hoveredCardIndex && (
                    <CardActions>
                      <Button
                        title="Edit"
                        variant={ButtonVariant.plain}
                        onClick={() => onEditInterface(index)}
                        style={{ paddingRight: 0 }}
                      >
                        <PencilAltIcon />
                      </Button>
                      <Button
                        title="Delete"
                        variant={ButtonVariant.plain}
                        onClick={() => onDeleteInterface(index)}
                        style={{ paddingRight: 0 }}
                      >
                        <TrashIcon />
                      </Button>
                    </CardActions>
                  )}
                  <CardTitle>
                    <InterfaceTypeIcon interfaceType={iface.type} />
                    &nbsp;{getInterfaceTypeLabel(iface.type as NMStateInterfaceType)}
                  </CardTitle>
                </CardHeader>
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
                        {iface.ipv4?.address
                          ?.map((a) => `${a.ip}/${a['prefix-length']}`)
                          .join(', ')}
                      </strong>
                    </>
                  )}
                  {iface.ipv6?.enabled && (
                    <>
                      <br />
                      IPv6:
                      <strong>
                        {iface.ipv6?.address
                          ?.map((a) => `${a.ip}/${a['prefix-length']}`)
                          .join(', ')}
                      </strong>
                    </>
                  )}
                </CardBody>
              </Card>
            </GalleryItem>
          );
        }
      })}
    </Gallery>
  );
}

export default NMStateConfigInterfacesList;
