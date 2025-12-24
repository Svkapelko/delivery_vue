<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";
import FloatingCart from "./components/FloatingCart.vue";

import { useAppStore } from "./store/app-store";

const appStore = useAppStore();
</script>

<template>
  <div class="page-wrapper">
    <Header @toggleModal="appStore.toggleModal" />
    <!-- передаем в модальное окно данные из store - при клике на кнопку передаем методу значение true--><!-- Передаем ссылку на метод toggleModal, чтобы Header мог отправлять аргументы -->

    <main class="main">
      <router-view></router-view>
    </main>

    <FloatingCart @open-cart="isModalOpen = true"/>

    <Modal :isOpen="appStore.isOpen" @toggleModal="appStore.toggleModal" />
    <!-- передаем в модальное окно данные из store - при клике на иконку крестика или overlay передаем методу значение false -->
    <Footer />
  </div>
</template>

<style>
</style>
