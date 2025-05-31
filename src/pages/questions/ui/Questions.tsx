import { FC, useCallback, useEffect, useState } from 'react';

import { CheckCircleOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Collapse, Flex, Spin, Typography, Skeleton } from 'antd';
import { getQuestionsList, getQuestionContent } from 'entities/content/model/asyncThunks';
import { selectQuestionsList, selectQuestionsListStatus, selectAnswers } from 'entities/content/model/selectors';
import styles from 'pages/questions/ui/Questions.module.scss'
import { useParams } from 'react-router-dom';
import { CATEGORY_LABELS } from 'shared/constants/categoryLabels';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppSelector, useAppDispatch } from 'shared/hooks';
import { generateQuestionLink } from 'shared/lib';
import { Header, Markdown } from 'shared/ui';


export const Questions: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useAppDispatch();

  const questionsList = useAppSelector(selectQuestionsList);
  const questionsListStatus = useAppSelector(selectQuestionsListStatus);
  const answers = useAppSelector(selectAnswers);

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

  if (questionsListStatus === LOADING_STAGE.LOADING) {
    return (
      <>
        <Header>{CATEGORY_LABELS[categoryId ?? ''] ?? 'Вопросы'}</Header>
        <Flex align={'center'} justify={'center'} style={{ height: '100%' }}>
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
        {questionsList?.map(({ slug, title }) => {
          const answer = answers[slug];
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
                    icon={
                      copiedSlug === slug ? (
                        <CheckCircleOutlined style={{ color: '#09def6' }} />
                      ) : (
                        <CopyOutlined />
                      )
                    }
                  />
                </Flex>
              }
            >
              {isAnswerLoading === LOADING_STAGE.LOADING ? (
                <Skeleton active paragraph={{ rows: 6 }} />
              ) : hasAnswer ? (
                <Markdown content={answer.apiData ?? ''} />
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
