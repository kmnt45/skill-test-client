import { FC, useEffect, useState } from 'react';

import { Button, Flex, Typography, Select, message } from 'antd';
import { useParams } from 'react-router-dom';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppSelector, useAppDispatch } from 'shared/hooks';
import { Header, Markdown, CodeEditor } from 'shared/ui';
import {
  getTask,
  submitSolution,
} from 'widgets/task/model/asyncThunks';
import {
  selectCurrentTask,
  selectCurrentTaskStatus,
  selectCurrentTaskError,
  selectSubmitResult,
  selectSubmitResultStatus,
  selectSubmitResultError,
} from 'widgets/task/model/selectors';
import { clearSubmitResult } from 'widgets/task/model/slice';

import styles from './Task.module.scss';

const { Text } = Typography;
const { Option } = Select;

export const Task: FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, taskId } = useParams<{ categoryId: string; taskId: string }>();

  const task = useAppSelector(selectCurrentTask);
  const taskStatus = useAppSelector(selectCurrentTaskStatus);
  const taskError = useAppSelector(selectCurrentTaskError);

  const submitResult = useAppSelector(selectSubmitResult);
  const submitStatus = useAppSelector(selectSubmitResultStatus);
  const submitError = useAppSelector(selectSubmitResultError);

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp'>('javascript');

  useEffect(() => {
    if (categoryId && taskId) {
      dispatch(getTask({ categoryId, taskId }));
      dispatch(clearSubmitResult());
    }
  }, [categoryId, taskId, dispatch]);

  const onCheckSolution = () => {
    if (!categoryId || !taskId) return;

    if (!code.trim()) {
      message.warning('Пожалуйста, введите код решения');
      return;
    }

    dispatch(submitSolution({ categoryId, taskId, solution: code, language }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          message.success(`${res.message}. Очки: ${res.pointsEarned ?? 0}`);
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error(submitError ?? 'Ошибка при проверке решения');
      });
  };

  return (
    <Flex vertical gap={20} flex={1}>
      <Header>{task?.title || 'Загрузка задачи...'}</Header>
      <Flex flex={1} gap={20}>
        <Flex flex={1} className={styles.container}>
          {task?.statement ? <Markdown content={task.statement} /> :
            <Text>Задача не найдена или отсутствует описание.</Text>}
        </Flex>
        <Flex vertical flex={3} gap={20}>
          <Select
            value={language}
            onChange={(val) => setLanguage(val)}
            style={{ width: 150 }}
          >
            <Option value="javascript">JavaScript</Option>
            <Option value="python">Python</Option>
            <Option value="cpp">C++</Option>
          </Select>

          <Flex flex={1} className={styles.container}>
            <CodeEditor
              language={language === 'cpp' ? 'cpp' : language === 'javascript' ? 'js' : 'python'}
              value={code}
              onChange={setCode}
            />
          </Flex>

          <Button
            type="primary"
            onClick={onCheckSolution}
            loading={submitStatus === LOADING_STAGE.LOADING}
          >
            Проверить решение
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
