import { CodeEditor, CodeEditorProps, Language } from '@patternfly/react-code-editor';
import { ChangeHandler } from 'react-monaco-editor';
import { NMStateConfig } from '../types';
import { dump } from 'js-yaml';
import MonacoEditor from 'react-monaco-editor';

type CodePanelProps = {
  nmstateConfig: NMStateConfig;
};

function NMStateYamlCodePanel({ nmstateConfig }: CodePanelProps) {
  const code = dump(nmstateConfig);

  const onChange: ChangeHandler = (value, event) => {
    console.log('changed', value, event);
  };

  return (
    // <CodeEditor
    //   isDarkTheme={true}
    //   isLineNumbersVisible={true}
    //   isReadOnly={false}
    //   isMinimapVisible={true}
    //   isLanguageLabelVisible
    //   code={code}
    //   onChange={onChange}
    //   language={Language.yaml}
    //   isCopyEnabled
    //   // height="sizeToFit"
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
      language="javascript"
      theme="vs-dark"
      value={code}
    />
  );
}

export default NMStateYamlCodePanel;
