<script setup>
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';
    import Modal from './components/Modal.vue';

    import { store } from './store';
    

</script>

<template>
    <div class="page-wrapper">
        <Header @toggleModal="store.toggleModal(true)"/> <!-- передаем в модальное окно данные из store - при клике на кнопку передаем методу значение true-->

        <main class="main">
           <router-view></router-view>
        </main>

        <Modal :isOpen="store.isOpen" @toggleModal="store.toggleModal(false)"/> <!-- передаем в модальное окно данные из store - при клике на иконку крестика или overlay передаем методу значение false -->
        <Footer />
    </div>
</template>

<style>
  
</style>
