import React from 'react';
import { NMStateConfig, NMStateConfigDetail, NMStateYamlCodePanel } from '@nmstate-ui/lib';
import {
  Page,
  PageSection,
  PageSectionVariants,
  TextContent,
  TextVariants,
  Text,
  Tabs,
  Tab,
  TabTitleIcon,
  TabTitleText,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DrawerPanelContent,
  DrawerColorVariant,
  TabsProps,
} from '@patternfly/react-core';
import NetworkIcon from '@patternfly/react-icons/dist/esm/icons/network-icon';
import ClusterIcon from '@patternfly/react-icons/dist/esm/icons/cluster-icon';
import { nmstateConfigs as nmstateConfigsData, emptyNMStateConfig } from './mocks/NMStateData';

function App() {
  const [nmstateConfigs, setNMStateConfigs] = React.useState(nmstateConfigsData);
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [drawerExpanded, setDrawerExpanded] = React.useState(true);

  const handleAddTab = () => {
    const updatedNMStateConfigs = [...nmstateConfigs, emptyNMStateConfig];
    setNMStateConfigs(updatedNMStateConfigs);
    setActiveTabKey(updatedNMStateConfigs.length - 1);
  };

  const removeTab: TabsProps['onClose'] = (_, eventKey) => {
    const updatedNMStateConfigs = nmstateConfigs.filter((_, index) => index !== eventKey);
    setNMStateConfigs(updatedNMStateConfigs);
    setActiveTabKey(
      updatedNMStateConfigs.length === 0 ? 'globalSettings' : updatedNMStateConfigs.length - 1
    );
  };

  const handleNMStateConfigUpdate = (index: number, nmstateConfig: NMStateConfig) => {
    const updated = [...nmstateConfigs];
    updated.splice(index, 1, nmstateConfig);
    setNMStateConfigs(updated);
  };

  return (
    <Page>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component={TextVariants.h1}>NMState configs management</Text>
        </TextContent>
      </PageSection>
      <PageSection variant={PageSectionVariants.light} padding={{ default: 'noPadding' }}>
        <Tabs
          activeKey={activeTabKey}
          onSelect={(_, eventKey) => setActiveTabKey(eventKey)}
          onClose={removeTab}
          onAdd={handleAddTab}
          aria-label="NMState configs tabs"
          variant="light300"
          usePageInsets
          isBox
        >
          <Tab
            key="globalSettings"
            eventKey="globalSettings"
            title={
              <>
                <TabTitleIcon>
                  <ClusterIcon />
                </TabTitleIcon>
                <TabTitleText>Global settings</TabTitleText>
              </>
            }
            isCloseDisabled
          />
          {nmstateConfigs.map((_, index) => (
            <Tab
              key={index}
              eventKey={index}
              title={
                <TabTitleIcon>
                  <NetworkIcon />
                </TabTitleIcon>
              }
              aria-label="NMState config"
            />
          ))}
        </Tabs>
      </PageSection>
      <PageSection isFilled padding={{ default: 'noPadding' }}>
        <Drawer isExpanded={drawerExpanded} onExpand={() => setDrawerExpanded(true)} isInline>
          <DrawerContent
            colorVariant={DrawerColorVariant.light200}
            panelContent={
              <DrawerPanelContent defaultSize={'600px'} minSize={'150px'} hasNoBorder isResizable>
                {activeTabKey === 'globalSettings' && <>global settings code goes here</>}
                {typeof activeTabKey === 'number' && (
                  <NMStateYamlCodePanel
                    nmstateConfig={nmstateConfigs[activeTabKey]}
                    updateNMStateConfig={(nmstateConfig) =>
                      handleNMStateConfigUpdate(activeTabKey, nmstateConfig)
                    }
                  />
                )}
              </DrawerPanelContent>
            }
          >
            <DrawerContentBody hasPadding>
              {activeTabKey === 'globalSettings' && <>global settings form goes here</>}
              {typeof activeTabKey === 'number' && (
                <NMStateConfigDetail
                  nmstateConfig={nmstateConfigs[activeTabKey]}
                  updateNMStateConfig={(nmstateConfig) =>
                    handleNMStateConfigUpdate(activeTabKey, nmstateConfig)
                  }
                />
              )}
            </DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </PageSection>
    </Page>
  );
}

export default App;
