import { useDocTitle } from "../../Hooks/useDocTitle";
import myPhoto from "./photo_profile_copy.jpg";
import "./about.scss";

export const About = () => {
  useDocTitle("О сайте");
  return (
    <main className="about">
      <h2>О сайте</h2>
      <p>
        Сайт создан исключительно в целях тренировки практических навыков.
        Является полностью некоммерческим.
      </p>
      <p>
        Сайт появящён любимому хобби автора - игре "Что? Где? Когда?", а точнее
        её спортивной версии. <br />
        Все вопросы взяты из открытой{" "}
        <a href="https://db.chgk.info/" target="_blank" rel="noreferrer">
          {" "}
          Базы вопросов.
        </a>
      </p>
      <h2>Навигация</h2>
      <p>
        В разделеле "Все турниры" находится таблица со всеми добавленными
        турнирами. Можно отфильтровать по алфавиту, дате и тд. <br />
        "Игровой режим" позволяет сыграть любой из турниров с таймером и учётом
        верных/неверных ответов. Результат будет сохранён в профиле. <br />
        В "Профиле", кроме результатов Игрового режима,можно увидеть добавленные
        пользователем турниры, краткую информацию, а также сменить пароль.
        <br />
        На странице "Добавить турнир" (доступна только зарегистрированным
        пользователям, как и Профиль), можно добавить турнир из Базы вопросов
        самостоятельно.
      </p>
      <h2>Использованные технологии</h2>
      <p>
        Фронтенд: React, Redux (Toolkit), React Router, SCSS <br />
        Бэкенд: Node.js, NestJS, TypeORM, MySQL, для авторизации Passport
        (JWTstrategy), для парсинга Cheerio. <br />
        Для всего проекта использовал Typescript <br />
        Хотелось развернуть проект самостоятельно, поэтому арендовал VPS (на
        Ubuntu). Там развернул бэкенд. Настроил nginx (SSL + обратное прокси).{" "}
        <br />
        Там же хостится сайт. <br /> Что-то из этого избыточно для такого
        небольшого проекта, но это тренировка и просто интересно изучать эти
        технологии.
      </p>
      <h2>Об авторе</h2>
      <div className="about__author">
        <img src={myPhoto} alt="фото автора сайта" />
        <div className="about__info">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
            porro eos maxime delectus totam facilis adipisci doloribus, placeat
            optio sapiente numquam similique cum odit eum? Laudantium aspernatur
            voluptate fugit velit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nisi
            velit, excepturi adipisci vel laudantium, voluptatum est porro
            recusandae ad sequi deserunt nesciunt asperiores, consequatur
            distinctio inventore? Magnam, consequatur aliquid. In unde, odit
            quae, at sed soluta possimus excepturi ipsam quod animi maxime
            veniam vitae quas, necessitatibus modi nostrum officia nihil omnis
            ad debitis accusamus iusto. Rem veniam ea sit!
          </p>
        </div>
      </div>
    </main>
  );
};
