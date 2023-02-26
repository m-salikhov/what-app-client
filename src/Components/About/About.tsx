import "./about.scss";

export const About = () => {
  return (
    <main className="about">
      <h2>О сайте</h2>
      <p>
        Сайт создан исключительно в целях тренировки практических навыков.
        Является полностью некоммерческим.
      </p>
      <p>
        Сайт появящён любимому хобби автора - игре "Что?Где?Когда?", а точнее её
        спортивной версии. <br />
        Все вопросы взяты из открытой{" "}
        <a href="https://db.chgk.info/"> Базы вопросов.</a>
      </p>
      <p>
        В разделеле Все турниры находится таблица со всеми добавленными
        турнирами. <br />
        Игровой режим позволяет сыграть любой из турниров с таймером и учётом
        верных/неверных ответов. Результат будет сохранён в профиле. <br />
        В Профиле, кроме результатов Игрового режима,можно увидеть добавленные
        пользователем турниры, краткую информацию, а также сменить пароль.
        <br />
        На странице Добавить турнир (доступна только зарегистрированным
        пользователям, как и Профиль), можно добавить турнир из Базы вопросов
        самостоятельно.
      </p>
      <h2>Использованные технологии</h2>
      <p>
        Для всего проекта использовал Typescript <br /> Фронтенд: React, Redux
        (Toolkit), React Router, SCSS <br />
        Бэкенд: Node.js, NestJS, TypeORM, MySQL, для аутентификации/авторизации
        Passport (JWTstrategy) <br />
        Хотелось развернуть проект самостоятельно, поэтому арендовал VPS (на
        Ubuntu). Там развернул бэкенд. Настроил nginx (SSL + обратное прокси).{" "}
        <br />
        Фронт же просто на Netify. <br /> Что-то из этого избыточно для такого
        небольшого проекта, но это тренировка и просто интересно эти технологии.
      </p>
      <h2>Об авторе</h2>
    </main>
  );
};