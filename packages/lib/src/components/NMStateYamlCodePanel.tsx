// import { CodeEditor, CodeEditorProps, Language } from '@patternfly/react-code-editor';
import { ChangeHandler } from 'react-monaco-editor';
import { NMStateConfig } from '../types';
import { dump, load } from 'js-yaml';
import MonacoEditor from 'react-monaco-editor';

type NMStateYamlCodePanelProps = {
  nmstateConfig: NMStateConfig;
  updateNMStateConfig: (nmstateConfig: NMStateConfig) => void;
};

function NMStateYamlCodePanel({ nmstateConfig, updateNMStateConfig }: NMStateYamlCodePanelProps) {
  const code = dump(nmstateConfig);

  const handleChange: ChangeHandler = (value) => {
    try {
      const updatedConfig = load(value) as NMStateConfig;
      updateNMStateConfig(updatedConfig);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // <CodeEditor
    //   isDarkTheme={true}
    //   isLineNumbersVisible={true}
    //   isReadOnly={false}
    //   isMinimapVisible={true}
    //   isLanguageLabelVisible
    //   code={code}
    //   onChange={handleChange}
    //   language={Language.yaml}
    //   isCopyEnabled
    //   height="sizeToFit"
    //   options={{
    //     automaticLayout: true,
    //     scrollBeyondLastLine: false,
    //   }}
    // />
    <MonacoEditor
      // width="800"
      // height="600"
      options={{
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
      onChange={handleChange}
      language="yaml"
      theme="vs-dark"
      value={code}
    />
  );
}

export default NMStateYamlCodePanel;
