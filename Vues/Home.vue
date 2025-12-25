<script setup>
import { useAppStore } from "../src/store/app-store";
import { useRestStore } from "@/store/rests";

const appStore = useAppStore();
const restStore = useRestStore();

// Получаем массив ресторанов
const rests = restStore.rests;

const getUrl = (name) => {
  return new URL(`../src/assets/images/rests/${name}`, import.meta.url);
};
/* Метод getUrl(name) предназначен для формирования корректного абсолютного пути к изображению/др ресурсу в проекте. Метод возвращает объект типа URL, содержащий абсолютный путь к файлу. Эта конструкция полезна, потому что new URL() формирует правильный URL, учитывающий расположение текущего модуля (import.meta.url).
    Механизм работы:
- Сначала создается относительная ссылка на файл (../src/assets/images/goods/${name}).
 - Далее эта относительная ссылка преобразуется в абсолютную путем привязки к базовому URL (import.meta.url), который представляет собой URL исходного JavaScript-модуля.
    Зачем это нужно?
В большинстве случаев, при разработке фронтенда с использованием инструментов сборки (Webpack/Vite), статические ресурсы, такие как изображения, собираются и обрабатываются сборщиком. Эти инструменты могут перемещать файлы или менять их имена, создавая хэшированные названия для кэширования. Поэтому прямой доступ к путям может стать проблемой. Используя метод getUrl, вы гарантируете, что любые преобразования имен файлов и местоположений учитываются сборочной системой, и ссылки остаются корректными независимо от окружения (разработка, продакшн).
*/
</script>

<template>
  <main class="main">
    <section class="banner">
      <div class="container">
        <div class="banner-item">
          <h2 class="banner-item--title">
            Онлайн-сервис <br />
            доставки еды на дом
          </h2>
          <p class="banner-item--subtitle">
            Блюда из любимого ресторана привезет курьер в перчатках, маске и с
            антисептиком
          </p>
        </div>
      </div>
    </section>
    <section class="products">
      <div class="container">
        <div class="products-header">
          <h3 class="products-header--title">Рестораны</h3>
          <input
            type="text"
            placeholder="Поиск блюд и ресторанов"
            class="products-header--search"
          />
        </div>
        <div class="products-wrapper" id="rests-container">
          <router-link
            v-for="rest in rests"
            :key="rest.id"
            :to="`/rest?id=${rest.id}`"
            class="products-card"
          >
            <div class="products-card_image">
              <img :src="getUrl(rest.img)" alt="изображение ресторана" />
            </div>
            <div class="products-card_description">
              <div class="products-card_description--row">
                <h4 class="products-card_description--title">
                  {{ rest.title }}
                </h4>
                <div class="products-card_description--badge">
                  {{ rest.time }} мин
                </div>
              </div>
              <div class="products-card_description--row">
                <div class="products-card_description--info">
                  <div class="products-card_description--rating">
                    <img src="../src/assets/images/icons/star.svg" alt="star" />
                    {{ rest.rating }}
                  </div>
                  <div class="products-card_description--price">
                    От {{ rest.price }} ₽
                  </div>
                  <div class="products-card_description--group">
                    {{ rest.type }}
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* чтобы был перенос текста при уменьшении ширины экрана*/
  gap: 24px;
}
.products-header--title {
  color: rgba(0, 0, 0, 1);
  font-size: 36px;
  font-weight: 700;
  margin: 0;
}
.products-header--search {
  box-sizing: border-box;
  border: 1px solid rgba(217, 217, 217, 1);
  border-radius: 2px;
  background: rgba(255, 255, 255, 1);
  min-width: 306px;
  height: 34px;
  flex-shrink: 0;
  padding: 5px 12px;
}
.products-header--search:focus {
  outline: none;
  border: 1px solid rgba(217, 217, 217, 1);
}
.products-header--search::placeholder {
  color: rgba(191, 191, 191, 1);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}
.products-card_description--title {
  color: rgba(0, 0, 0, 1);
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin: 0; /* убираем лишние отступы */
}
.products-card_description--badge {
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 2px;
  background: rgba(38, 38, 38, 1);
  padding: 1px 8px;
}
.products-card_description--info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap; /* перенос строки */
  row-gap: 8px;
  column-gap: 25px;
}
.products-card_description--rating {
  color: rgba(255, 193, 7, 1);
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
}
.products-card_description--price {
  color: rgba(140, 140, 140, 1);
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
}
.products-card_description--group {
  color: rgba(140, 140, 140, 1);
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
  position: relative;
}
.products-card_description--group::before {
  content: ""; /* точку задаем через псевдокласс*/
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgba(140, 140, 140, 1);
  position: absolute;
  top: 14px;
  left: -14px;
}
</style>