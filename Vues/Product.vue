<script setup>
const goodsArray = [
  {
    id: 0,
    title: "Ролл угорь стандарт",
    info: "Рис, угорь, соус унаги, кунжут, водоросли нори.",
    price: 250,
    img: "prd1.jpg",
  },
  {
    id: 1,
    title: "Калифорния лосось стандарт",
    info: "Рис, лосось, авокадо, огурец, майонез, икра масаго, водоросли нори.",
    price: 395,
    img: "prd2.jpg",
  },
  {
    id: 2,
    title: "Окинава стандарт",
    info: "Рис, креветка отварная, сыр сливочный, лосось, огурец свежий.",
    price: 340,
    img: "prd3.jpg",
  },
  {
    id: 3,
    title: "Цезарь маки хl",
    info: "Рис, куриная грудка копченая, икра масаго, томат, айсберг, соус цезарь...",
    price: 465,
    img: "prd4.jpg",
  },
  {
    id: 4,
    title: "Ясай маки стандарт 185 г",
    info: "Рис, помидор свежий, перец болгарский, авокадо, огурец, айсберг.",
    price: 290,
    img: "prd5.jpg",
  },
  {
    id: 5,
    title: "Ролл с креветкой стандарт",
    info: "Рис, водоросли нори, креветки отварные, сыр сливочный, огурцы.",
    price: 380,
    img: "prd6.jpg",
  },
];

const getUrl = (name) => {
  return new URL(`../src/assets/images/goods/${name}`, import.meta.url);
};
</script>

<template>
  <main class="main">
    <section class="products">
      <div class="container">
        <div class="products-wrapper" id="goods-container">
          <div v-for="item in goodsArray" :key="item.id" class="products-card">
            <div class="products-card_image">
              <img :src="getUrl(item.img)" alt="изображение продукта" />
            </div>
            <div class="products-card_description">
              <div class="products-card_description--row">
                <h5 class="products-card_description--name">
                  {{ item.title }}
                </h5>
              </div>
              <div class="products-card_description--row">
                <p class="products-card_description--text">
                  {{ item.info }}
                </p>
              </div>
              <div class="products-card_description--row">
                <div class="products-card_description-controls">
                  <button class="btn btn-primary">
                    В корзину
                    <img
                      src="../src/assets/images/icons/cart.svg"
                      alt="shopping-cart"
                    />
                  </button>
                  <span class="products-card_description-controls--price">
                    {{ item.price }} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.products-card_description--name {
  color: rgba(0, 0, 0, 1);
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin: 0;
}
.products-card_description--text {
  color: rgba(140, 140, 140, 1);
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  margin: 0;
}
.products-card_description-controls {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 30px;
}
.products-card_description-controls--price {
  color: rgba(0, 0, 0, 1);
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
}
</style>