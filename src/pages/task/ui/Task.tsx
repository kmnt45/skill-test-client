import { FC, useEffect, useState } from 'react';

import { Button, Flex, Typography, Spin } from 'antd';
import { getTask, submitSolution } from 'entities/content/model/asyncThunks';
import { selectCurrentTask, selectCurrentTaskStatus, selectSubmitResult } from 'entities/content/model/selectors';
import { clearSubmitResult } from 'entities/content/model/slice';
import styles from 'pages/task/ui/Task.module.scss';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'shared/hooks';
import { Header, Markdown, CodeEditor } from 'shared/ui';
import { useAppMessage } from 'app/providers/message';
import { LOADING_STAGE } from 'shared/constants';

const { Text } = Typography;

type Language = 'js' | 'ts';

type RouteParams = {
  categoryId: string;
  language: Language;
  taskId: string;
};

const languageMapForApi: Record<Language, string> = {
  js: 'javascript',
  ts: 'typescript',
};

export const Task: FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, language: langParam, taskId } = useParams<RouteParams>();
  const message = useAppMessage();
  const task = useAppSelector(selectCurrentTask);
  const taskStatus = useAppSelector(selectCurrentTaskStatus);
  const submitResult = useAppSelector(selectSubmitResult);
  const isLoading = taskStatus === LOADING_STAGE.LOADING;
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
    if (!code.trim()) {
      message.error('Введите решение');
      return;
    }

    if (!categoryId || !taskId) {
      message.error('Некорректные параметры задачи');
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
    <>
      {isLoading ? (
        <Flex align="center" justify="center" flex={1}>
          <Spin size="large" />
        </Flex>
      ) : task ? (
        <Flex vertical gap={20} flex={1}>
          <Header>{task.title}</Header>
          <Flex flex={1} gap={20}>
            <Flex vertical flex={1} className={styles.container}>
              <Markdown content={task.statement || ''} />
            </Flex>
            <Flex vertical flex={3} gap={20}>
              <Flex flex={1} className={styles.container}>
                <CodeEditor value={code} language={language} onChange={setCode} />
              </Flex>
              <Flex justify="space-between" gap={20}>
                <Button type="dashed">Подсказка</Button>
                <Button type="primary" onClick={onSubmit}>
                  Проверить решение
                </Button>
              </Flex>
              {submitResult && (
                <Text type={submitResult.success ? 'success' : 'danger'}>
                  {submitResult.message}
                  {submitResult.pointsEarned !== undefined && ` (Баллы: ${submitResult.pointsEarned}🔥)`}
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Text type="danger">Задача не найдена</Text>
      )}
    </>
  );
};
