import { Toolbar, ToolbarContent } from '@patternfly/react-core';
import React from 'react';
import { NMStateConfig, NMStateInterface, NMStateInterfaceType } from '../types';
import NMStateConfigInterfacesList from './NMStateConfigInterfacesList';
import NMStateInterfaceDialog from './NMStateInterfaceDialog';
import AddInterfaceDropdown from './AddInterfaceDropdown';

type NMStateConfigDetailProps = {
  nmstateConfig: NMStateConfig;
  updateNMStateConfig: (nmstateConfig: NMStateConfig) => void;
};

function NMStateConfigDetail({ nmstateConfig, updateNMStateConfig }: NMStateConfigDetailProps) {
  const [editInterface, setEditInterface] = React.useState<{
    index: number;
    type?: NMStateInterfaceType;
  }>();

  const handleClose = () => setEditInterface(undefined);

  const handleAddInterface = (interfaceType: NMStateInterfaceType) => {
    setEditInterface({ index: nmstateConfig.interfaces.length, type: interfaceType });
  };

  return (
    <>
      <Toolbar
        style={{ backgroundColor: 'transparent', paddingTop: '0' }}
        inset={{ default: 'insetNone' }}
      >
        <ToolbarContent>
          <AddInterfaceDropdown addInterface={handleAddInterface} />
        </ToolbarContent>
      </Toolbar>
      <NMStateConfigInterfacesList
        interfaces={nmstateConfig.interfaces}
        onEditInterface={(interfaceIndex) => setEditInterface({ index: interfaceIndex })}
        onDeleteInterface={(interfaceIndex) => {
          const updatedInterfaces = [...nmstateConfig.interfaces];
          updatedInterfaces.splice(interfaceIndex, 1);
          updateNMStateConfig({
            ...nmstateConfig,
            interfaces: updatedInterfaces,
          });
        }}
      />
      {editInterface !== undefined && (
        <NMStateInterfaceDialog
          newInterfaceType={editInterface.type}
          nmstateInterface={nmstateConfig.interfaces[editInterface.index]}
          interfaces={nmstateConfig.interfaces}
          addInterface={(nmstateInterface: NMStateInterface) =>
            updateNMStateConfig({
              ...nmstateConfig,
              interfaces: [...nmstateConfig.interfaces, nmstateInterface],
            })
          }
          updateInterface={(nmstateInterface: NMStateInterface) => {
            const updatedInterfaces = [...nmstateConfig.interfaces];
            updatedInterfaces.splice(editInterface.index, 1, nmstateInterface);
            updateNMStateConfig({
              ...nmstateConfig,
              interfaces: updatedInterfaces,
            });
          }}
          onClose={handleClose}
        />
      )}
    </>
  );
}

export default NMStateConfigDetail;
