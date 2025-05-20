import { FC, useEffect, useState } from 'react';

import { Collapse } from 'antd';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { CATEGORY_LABELS } from 'shared/constants/categoryLabels';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { Header } from 'shared/ui/Header/Header';

import styles from './Questions.module.scss';
import { getQuestionsList, getQuestionContent } from '../model/asyncThunks';

export const Questions: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useAppDispatch();

  const questionList = useAppSelector(state => state.questions.questionsList.apiData ?? []);
  const answers = useAppSelector(state => state.questions.answers);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (categoryId) {
      dispatch(getQuestionsList(categoryId));
      setActiveKeys([]);
    }

    const hash = window.location.hash;
    if (hash.startsWith('#question-')) {
      const slugFromHash = hash.replace('#question-', '');
      setActiveKeys([slugFromHash]);

      if (!answers[slugFromHash]?.apiData && categoryId) {
        dispatch(getQuestionContent({ categoryId, questionSlug: slugFromHash }));
      }
    }
  }, [categoryId, dispatch, answers]);

  const onPanelChange = (keys: string | string[]) => {
    const active = Array.isArray(keys) ? keys : [keys];
    setActiveKeys(active);

    active.forEach((questionSlug) => {
      if (!answers[questionSlug]?.apiData && categoryId) {
        dispatch(getQuestionContent({ categoryId, questionSlug }));
      }
    });
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}${window.location.pathname}#question-${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  };

  return (
    <>
      <Header>{CATEGORY_LABELS[categoryId ?? ''] || 'Вопросы'}</Header>
      <Collapse
        bordered={false}
        className={styles.collapse}
        expandIconPosition="end"
        activeKey={activeKeys}
        onChange={onPanelChange}
      >
        {questionList.map((q) => (
          <Collapse.Panel
            key={q.slug}
            id={`question-${q.slug}`} // id для якоря
            className={styles.question}
            header={
              <div className={styles.questionHeader}>
                <span>{q.title}</span>
                <button
                  className={styles.copyLinkButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyLink(q.slug);
                  }}
                  title="Скопировать ссылку на вопрос"
                >
                  {copiedSlug === q.slug ? '✅' : '📋'}
                </button>
              </div>
            }
          >
            {answers[q.slug]?.apiData ? (
              <ReactMarkdown>{answers[q.slug].apiData}</ReactMarkdown>
            ) : (
              'Загрузка...'
            )}
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  );
};
