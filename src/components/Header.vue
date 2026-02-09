<script setup>
import { useAppStore } from "@/store/app-store";
import { useCartStore } from "@/store/cart";

const appStore = useAppStore();
const cartStore = useCartStore();

const openAuth = () => {
  cartStore.toggleCart(false);    // 1. Сначала закрываем корзину
  appStore.toggleAuthModal(true); // 2. Затем открываем вход
}

</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-box">
        <router-link to="/" class="header-logo logo">
          <img src="../assets/images/logo.png" alt="logo" />
        </router-link>

        <div class="header-controls">
          <!-- Анимация только для смены "Войти" на "Профиль" -->
          <transition name="fade-slide" mode="out-in">
            <!-- Если пользователь вошел — показываем его имя -->
            <div v-if="appStore.user" class="user-profile" key="user">
              <!-- Статичный текст вне ссылки -->
              <span calss="user-welcome-text">Рады Вас видеть,</span>
              <!-- key атрибут: Внутри transition при использовании v-if/v-else на разных тегах (div и button) рекомендуется ставить уникальные ключи (key="user", key="login"). Это помогает Vue безошибочно понять, какой элемент заменяет другой. 
              mode="out-in": Гарантирует, что старая кнопка сначала полностью исчезнет, и только потом появится имя пользователя. Без этого они могут на мгновение оказаться на экране одновременно. -->
               <!-- Только имя является ссылкой -->
              <router-link to="/profile" class="user-name-link">
                 {{ appStore.user?.name || 'Гость' }}
              </router-link>
              <button class="btn btn-outline" @click="appStore.logout()">Выйти</button>
            </div>

            <!-- Если пользователя нет, показываем обычную кнопку Войти, тк кнопка входа теперь открывает окно авторизации.  -->
            <button v-else class="btn btn-primary" @click="openAuth">
             <img src="../assets/images/icons/user.png" alt="user" />
                Войти
            </button>
          </transition>


           <!-- Кнопка Корзины всегда на своем месте  -->
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
.header-controls .btn-primary {
  border-radius: 2px;
  background: rgba(24, 144, 255, 1);
  color: rgba(255, 255, 255, 1);
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 0 rgb(0, 0, 0, 0.45);  /* Тень "лежит" на поверхности */
}
.header-controls .btn-primary:hover {
  background: #40a9ff;
  transform: translateY(-2px); /* Кнопка "всплывает" */
  box-shadow: 0 6px 16px rgba(24, 144, 255, 0.3); /* Тень становится мягче и глубже */
}
.header-controls .btn-primary:active {
  transform: translateY(0); /* Возвращается на место при клике */
  background: #096dd9; /* Темнеет, имитируя нажатие */
  box-shadow: 0 3px 5px rgb(0, 0, 0, 0.12); /* Внутренняя тень: кнопка "вдавилась" */
}

.btn-outline:hover {
    border-color: #1890ff;
    color:#1890ff;
    transform: translateY(-1px); /* Смещение вверх */
    box-shadow: 0 4px 8px rgba(24, 144, 255, 0.15); /* Мягкое свечение */
}
.btn-outline:active{
    transform: translateY(0) scale(0.98); /* Возврат при нажатии + легкое сжатие (scale) при клике */
}

/* Анимация: появление со скольжением */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fase-slide-enter-from {
  opacity: 0;
  transform: translateY(10px); /* Появляется сверху */
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px); /* Уходит вниз */
}
.user-profile {
  display: flex;
  align-items: center;
  gap: 15px; /* Расстояние между именем и кнопкой Выйти */
}
.user-welcome-text {
  color:#595959;
  cursor: default; /* Обычный курсор для текста */
}

.user-name-link {
  text-decoration: none;
  font-weight: 500;
  color: #1890ff;
  transition: all 0.2s ease;
  border-bottom: 1px border transparent; /* Резервируем место под подчеркивание */
}
.user-name-link:hover {
  color: #40a9ff; /* Светлеет при наведении */
  border-bottom: 1px solid #40a9ff; /* Тонкое подчеркивание только у имени */;
}

</style>