import { NMStateConfig } from '../types';
import NMStateConfigInterfacesList from './NMStateConfigInterfacesList';

type NMStateConfigDetailProps = {
  nmstateConfig: NMStateConfig;
};

function NMStateConfigDetail({ nmstateConfig }: NMStateConfigDetailProps) {
  console.log('nmstateConfig', nmstateConfig);
  return <NMStateConfigInterfacesList interfaces={nmstateConfig.interfaces} />;
}

export default NMStateConfigDetail;
