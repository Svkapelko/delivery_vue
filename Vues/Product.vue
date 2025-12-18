<script setup>
import { useProductsStore} from "@/store/products"
import { useCartStore } from '@/store/cart';

const productsStore = useProductsStore();
const cartStore = useCartStore();

const getUrl = (name) => {
  return new URL(`../src/assets/images/goods/${name}`, import.meta.url);
};

const addItemToCart = (product) => {
  cartStore.addToCart(product)
};
</script>

<template>
  <main class="main">
    <section class="products">
      <div class="container">
        <div class="products-wrapper" id="goods-container">
          <div v-for="product in productsStore.products" :key="product.id" class="products-card">
            <div class="products-card_image">
              <img :src="getUrl(product.img)" alt="product.title" />
            </div>
            <div class="products-card_description">
              <div class="products-card_description--row">
                <h5 class="products-card_description--name">
                  {{ product.title }}
                </h5>
              </div>
              <div class="products-card_description--row">
                <p class="products-card_description--text">
                  {{ product.info }}
                </p>
              </div>
              <div class="products-card_description--row">
                <div class="products-card_description-controls">
                  <button class="btn btn-primary" @click="addItemToCart(product)">
                    В корзину
                    <img
                      src="../src/assets/images/icons/cart.svg"
                      alt="shopping-cart"
                    />
                  </button>
                  <span class="products-card_description-controls--price">
                    {{ product.price }} ₽
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