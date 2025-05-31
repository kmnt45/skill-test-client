import { FC, useState, useEffect, useMemo } from 'react';

import { javascript } from '@codemirror/lang-javascript';
import type { LanguageSupport } from '@codemirror/language';
import CodeMirror from '@uiw/react-codemirror';

type Language = 'js' | 'ts';

type CodeEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  language?: Language;
};

const languageMap: Record<Language, LanguageSupport> = {
  js: javascript(),
  ts: javascript({ typescript: true }),
};

export const CodeEditor: FC<CodeEditorProps> = ({
                                                  value = '',
                                                  onChange,
                                                  language = 'js',
                                                }) => {
  const [code, setCode] = useState(value);

  useEffect(() => {
    setCode(value);
  }, [value]);

  const langExtension = useMemo(() => languageMap[language], [language]);

  const handleChange = (val: string) => {
    setCode(val);
    onChange?.(val);
  };

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
