import { FC } from 'react';

import { GithubOutlined } from '@ant-design/icons';
import { Banner } from 'shared/ui';

import styles from './Home.module.scss';

export const Home: FC = () => {
  return (
    <>
      <Banner />
      <div className={styles.container}>
        <Banner
          title={'Друг для друга'}
          text={'Этот сервис создан студентами для студентов, чтобы делиться задачами, тестами и опытом.\n' +
            'Проверяй знания, развивайся, помогай другим — вместе учиться проще.'}
          linkText={'Наш GitHub'}
          link={'https://github.com/kmnt45'}
          linkIcon={<GithubOutlined />}
        />
        <Banner
          title={'Заголовок'}
          text={'Текст баннера с описанием'}
          link={'https://google.com'}
          linkText={'Ссылка на какой-то ресурс'}
        />
      </div>
    </>
  );
};
