import { FC } from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { Banner } from 'shared/ui';

export const Home: FC = () => {
  return (
    <>
      <Banner
        title="Добро пожаловать на СкиллТест!"
        text={`Проверь свои знания и прокачай навыки программирования.\n
Ты найдёшь множество вопросов, тестов и задач — от простых до сложных.\n
Учись, практикуйся и следи за прогрессом вместе с нами!`}
      />
      <Banner
        title="Друг для друга"
        text={`Сервис создан студентами для студентов — делись задачами и опытом.\n
Проверяй знания, развивайся и помогай другим — вместе учиться проще.`}
        linkText="Наш GitHub"
        link="https://github.com/kmnt45/skill-test-content"
        linkIcon={<GithubOutlined />}
      />
    </>
  );
};
