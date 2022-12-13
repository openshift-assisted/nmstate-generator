import {
  Button,
  ButtonVariant,
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  Gallery,
  GalleryItem,
} from '@patternfly/react-core';
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon';
import TrashIcon from '@patternfly/react-icons/dist/esm/icons/trash-icon';
import React from 'react';
import {
  BondInterface,
  EthernetInterface,
  NMStateInterface,
  NMStateInterfaceType,
  VLANInterface,
} from '../types';
import BondInterfaceCardBody from './BondInterfaceCardBody';
import EthernetInterfaceCardBody from './EthernetInterfaceCardBody';
import InterfaceTypeIcon from './InterfaceTypeIcon';
import { getInterfaceTypeLabel } from './utils';
import VLANInterfaceCardBody from './VLANInterfaceCardBody';

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
                {iface.type === NMStateInterfaceType.ETHERNET && (
                  <EthernetInterfaceCardBody interface={iface as EthernetInterface} />
                )}
                {iface.type === NMStateInterfaceType.VLAN && (
                  <VLANInterfaceCardBody interface={iface as VLANInterface} />
                )}
                {iface.type === NMStateInterfaceType.BOND && (
                  <BondInterfaceCardBody interface={iface as BondInterface} />
                )}
              </Card>
            </GalleryItem>
          );
        }
      })}
    </Gallery>
  );
}

export default NMStateConfigInterfacesList;
