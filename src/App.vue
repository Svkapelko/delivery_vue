<script setup>
import { onMounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";
import FloatingCart from "./components/FloatingCart.vue";
import AuthModal from "./components/AuthModal.vue";
import GlobalLoader from "./components/GlobalLoader.vue";
import OrderSuccessModal from "./components/OrderSuccessModal.vue";


import { useAppStore } from "./store/app-store";
import { useCartStore } from "./store/cart";

const appStore = useAppStore();
const cartStore = useCartStore();

// Как только приложение запустилось — восстанавливаем сессию
onMounted(() => {
  appStore.initAuth();
})
</script>

<template>
  <div class="page-wrapper">
    <Header />
    <!-- @click="cartStore.toggleCart(true)"  - убрали , так как при клике на хедер открывалась корзина передаем в модальное окно данные из store - при клике на кнопку передаем методу значение true--><!-- Передаем ссылку на метод toggleModal, чтобы Header мог отправлять аргументы -->

    <main class="main">
      <router-view></router-view>
    </main>
    
    <FloatingCart @open-cart="cartStore.toggleCart(true)"/>

    <Modal :isOpen="cartStore.isCartOpen" @toggleCart="cartStore.toggleCart" />
    <!-- передаем в модальное окно данные из store - при клике на иконку крестика или overlay передаем методу значение false -->
    
    <AuthModal />   <!-- Авторизация -->
    <OrderSuccessModal />
    <GlobalLoader />
    <Footer />
  </div>
</template>

<style>
</style>
