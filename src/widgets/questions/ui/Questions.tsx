import { FC, useEffect, useState, useCallback } from 'react';

import { CheckCircleOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Collapse, Flex, Skeleton, Spin, Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { CATEGORY_LABELS } from 'shared/constants/categoryLabels';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { generateQuestionLink } from 'shared/lib';
import { Header } from 'shared/ui/Header/Header';

import styles from './Questions.module.scss';
import { getQuestionsList, getQuestionContent } from '../model/asyncThunks';

export const Questions: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useAppDispatch();

  const questionsState = useAppSelector(state => state.questions.questionsList);
  const questionList = questionsState.apiData ?? [];
  const questionListLoading = questionsState.apiStatus;

  const answers = useAppSelector(state => state.questions.answers);

  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    dispatch(getQuestionsList(categoryId));
    setActiveKeys([]);

    const hash = window.location.hash;
    if (hash.startsWith('#question-')) {
      const slugFromHash = hash.replace('#question-', '');
      setActiveKeys([slugFromHash]);

      if (!answers[slugFromHash]?.apiData) {
        dispatch(getQuestionContent({ categoryId, questionSlug: slugFromHash }));
      }
    }
     
  }, [categoryId]);

  const onPanelChange = useCallback((keys: string | string[]) => {
    const active = Array.isArray(keys) ? keys : [keys];
    setActiveKeys(active);

    if (!categoryId) return;

    active.forEach(slug => {
      if (!answers[slug]?.apiData) {
        dispatch(getQuestionContent({ categoryId, questionSlug: slug }));
      }
    });
  }, [answers, categoryId, dispatch]);

  const handleCopyLink = useCallback((slug: string) => {
    const url = generateQuestionLink(slug);
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  }, []);

  if (questionListLoading === LOADING_STAGE.LOADING) {
    return (
      <>
        <Header>{CATEGORY_LABELS[categoryId ?? ''] ?? 'Вопросы'}</Header>
        <Flex align={'center'} justify={'center'} style={{height: '100%'}}>
          <Spin size="large" />
        </Flex>
      </>
    );
  }

  return (
    <>
      <Header>{CATEGORY_LABELS[categoryId ?? ''] ?? 'Вопросы'}</Header>

      <Collapse
        bordered={false}
        className={styles.collapse}
        expandIconPosition="end"
        activeKey={activeKeys}
        onChange={onPanelChange}
      >
        {questionList.map(({ slug, title }) => {
          const answer = answers[slug];
          console.log(answer)
          const isAnswerLoading = answer?.apiStatus;
          const hasAnswer = !!answer?.apiData;

          return (
            <Collapse.Panel
              key={slug}
              id={`question-${slug}`}
              className={styles.question}
              header={
                <Flex className={styles.questionHeader}>
                  <Typography.Text>{title}</Typography.Text>
                  <Button
                    type="text"
                    shape="circle"
                    size="small"
                    onClick={e => {
                      e.stopPropagation();
                      handleCopyLink(slug);
                    }}
                    icon={copiedSlug === slug ? <CheckCircleOutlined style={{ color: '#09def6' }} /> : <CopyOutlined />}
                  />
                </Flex>
              }
            >
              {isAnswerLoading === LOADING_STAGE.LOADING ? (
                <Skeleton active paragraph={{ rows: 6 }} />
              ) : hasAnswer ? (
                <ReactMarkdown>{answer.apiData}</ReactMarkdown>
              ) : (
                <div>Ответ не найден</div>
              )}
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </>
  );
};
