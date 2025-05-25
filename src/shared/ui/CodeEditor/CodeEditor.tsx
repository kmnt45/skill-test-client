import { FC, useState } from 'react';

import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import type { LanguageSupport } from '@codemirror/language';
import CodeMirror from '@uiw/react-codemirror';

type Language = 'js' | 'ts' | 'python' | 'cpp' | 'html';

type CodeEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  language?: Language;
};

const languageMap: Record<Language, LanguageSupport> = {
  js: javascript(),
  ts: javascript({ typescript: true }),
  python: python(),
  cpp: cpp(),
  html: html(),
};

export const CodeEditor: FC<CodeEditorProps> = ({
  value = '',
  onChange,
  language = 'js',
}) => {
  const [code, setCode] = useState(value);

  const handleChange = (val: string) => {
    setCode(val);
    onChange?.(val);
  };

  const langExtension = languageMap[language] ?? javascript();

  return (
    <CodeMirror
      value={code}
      height="100%"
      width="100%"
      theme="dark"
      extensions={[langExtension]}
      onChange={handleChange}
      style={{ flex: 1, backgroundColor: 'transparent' }}
    />
  );
};
