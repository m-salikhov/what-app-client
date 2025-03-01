import './about.css';
import myPhoto from './photo_profile_copy.jpg';
import { ExternalLinkText } from 'Shared/Components/Text/ExternalLinkText/ExternalLinkText';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';

function About() {
  useDocTitle('О сайте');

  return (
    <div className='about'>
      <h2>О сайте</h2>
      <p>Сайт создан исключительно в целях тренировки практических навыков. Является полностью некоммерческим.</p>
      <p>
        Сайт посвящён любимому хобби автора - игре "Что? Где? Когда?", а точнее её спортивной версии. <br />
        Источник вопросов: <ExternalLinkText text='База вопросов' href='https://db.chgk.info/' /> и{' '}
        <ExternalLinkText text='GotQuestions' href='https://gotquestions.online/' />
      </p>
      <h2>Навигация</h2>
      <p>
        В разделе "Все турниры" находится таблица со всеми добавленными турнирами. Можно отфильтровать по алфавиту, дате
        и тд. И открыть любой из них <br /> <br />
        "Игровой режим" позволяет сыграть любой из турниров с таймером и учётом верных/неверных ответов. Результат будет
        сохранён в профиле. <br /> <br />
        В "Профиле" (доступен после авторизации), кроме результатов Игрового режима,можно увидеть добавленные
        пользователем турниры, краткую информацию, а также сменить пароль.
        <br /> <br />
        На странице "Добавить турнир", можно добавить турнир из Базы вопросов самостоятельно. Есть инструкция как это
        сделать <br /> <br />
        Раздел "Войти" соответственно для авторизации или регистрации. Подтверждения почты нет, так что просто введите
        любой выдуманный email.
      </p>
      <h2>Использованные технологии</h2>
      <p>
        Фронтенд: React, Redux (Toolkit), React Router <br />
        Бэкенд: Node.js, NestJS, TypeORM, MySQL, для авторизации Passport (JWT strategy), для парсинга Cheerio. <br />
        Для всего проекта использовал TypeScript <br />
        Хотелось развернуть проект самостоятельно, поэтому арендовал VPS (на Ubuntu). Там развернул бэкенд. Настроил
        nginx (SSL + обратное прокси). <br />
        Там же хостится сайт. <br />
        Что-то из этого избыточно для такого небольшого проекта, но это тренировка и просто интересно изучать эти
        технологии.
      </p>
      <h2>Об авторе</h2>
      <div className='about-author'>
        <img src={myPhoto} alt='фото автора сайта' />
        <div className='about-info'>
          <p>
            Меня зовут Максим, мне 36 лет. Я начинающий разработчик.
            <br /> <br />
            Я родился и вырос в Подмосковье в городе Мытищи, но сейчас живу в Москве. Получил высшее образование в
            МГСУ(строительный). Окончил университет в 2010г. <br />
            После этого работал некоторое время по специальности, но в итоге оказался в Тинькофф Банке, где и работаю
            четвёртый год. На данный момент я руководитель смены группы контроля качества на одной из операционных
            линий. В моей команде 11 человек. <br />
            Несколько лет назад увлёкся разработкой. То что было в начале увлечением переросло в полноценное желание
            связать свою жизнь с этим новым направлением. <br /> <br />Я занимаюсь почти каждый день и мне очень
            нравится изучать технологии и как-то применять их на практике.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
