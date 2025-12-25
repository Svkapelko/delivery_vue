<script setup>
import { defineEmits } from "vue";
import { useCartStore } from "@/store/cart";

const cartStore = useCartStore();

const emit = defineEmits(["toggleCart"]); // Определяем доступные события
const openModal = () => {
  emit("toggleCart", true); // Передаем true, чтобы показать модальное окно
};
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-box">
        <router-link to="/" class="header-logo logo">
          <img src="../assets/images/logo.png" alt="logo" />
        </router-link>
        <div class="header-controls">
          <button class="btn btn-primary">
            <img src="../assets/images/icons/user.png" alt="user" />
            Войти
          </button>
          <button class="btn btn-outline" @click="cartStore.toggleCart(true)">
            <img src="../assets/images/icons/shopping-cart.png" alt="cart" />
            Корзина
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  min-height: 124px;
  display: flex;
  align-items: center;
}

.header-box {
  height: 100%;
  display: flex; /* делает блоки флексовыми*/
  justify-content: space-between;
  align-items: center;
}

.header-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}
</style>