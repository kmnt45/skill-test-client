import { FC, useEffect, useState } from 'react';

import { Button, Flex, Typography, message } from 'antd';
import { getTask, submitSolution } from 'entities/content/model/asyncThunks';
import { selectCurrentTask, selectSubmitResult } from 'entities/content/model/selectors';
import { clearSubmitResult } from 'entities/content/model/slice';
import styles from 'pages/task/ui/Task.module.scss';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'shared/hooks';
import { Header, Markdown, CodeEditor } from 'shared/ui';

const { Text } = Typography;

type Language = 'js' | 'ts';

const languageMapForApi: Record<Language, string> = {
  js: 'javascript',
  ts: 'typescript',
};

export const Task: FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, language: langParam, taskId } = useParams<{ categoryId: string; language: Language; taskId: string }>();

  const task = useAppSelector(selectCurrentTask);
  const submitResult = useAppSelector(selectSubmitResult);

  const [code, setCode] = useState('');

  const language: Language = langParam === 'ts' ? 'ts' : 'js';

  useEffect(() => {
    if (categoryId && taskId) {
      dispatch(getTask({ categoryId, taskId }));
      dispatch(clearSubmitResult());
      setCode('');
    }
  }, [categoryId, taskId, dispatch]);

  const onSubmit = () => {
    if (!categoryId || !taskId) {
      message.error('Не указан categoryId или taskId');
      return;
    }
    if (!code.trim()) {
      message.error('Введите решение');
      return;
    }

    dispatch(submitSolution({
      categoryId,
      taskId,
      solution: code,
      language: languageMapForApi[language],
    }));
  };

  return (
    <Flex vertical gap={20} flex={1}>
      <Header>{task?.title || 'Загрузка задачи...'}</Header>
      <Flex flex={1} gap={20}>
        <Flex vertical flex={1} className={styles.container}>
          {task?.statement ? <Markdown content={task.statement} /> : <Text>Задача не найдена или отсутствует описание.</Text>}
        </Flex>
        <Flex vertical flex={3} gap={20}>
          <Flex flex={1} className={styles.container}>
            <CodeEditor
              value={code}
              language={language}
              onChange={setCode}
            />
          </Flex>

          <Button
            type="primary"
            onClick={onSubmit}
          >
            Проверить решение
          </Button>

          {submitResult && (
            <Text type={submitResult.success ? 'success' : 'danger'}>
              {submitResult.message} {submitResult.pointsEarned !== undefined && `(Баллы: ${submitResult.pointsEarned}🔥)`}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
