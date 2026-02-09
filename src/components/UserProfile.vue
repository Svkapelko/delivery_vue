<!-- компонент UserProfile.vue -->
<script setup>
import { ref, computed } from "vue";
import { useAppStore } from "@/store/app-store";
import { useCartStore } from "@/store/cart";
import { useRouter } from "vue-router";


const appStore = useAppStore();
const cartStore = useCartStore();
const router = useRouter();

const goBack = () => {
  router.back(); // Вернуться назад в историю (как кнопка "назад" в браузере)
};

// Инициализируем поля текущими данными из стора
const name = ref(appStore.user?.name || "");
const lastname = ref(appStore.user?.lastname || "");
const address = ref(appStore.user?.address || "");
const email = ref(appStore.user?.email || "");
/* Для имени и адреса лучше исп-ть ref (так как их можно менять), а для телефона — просто выводить :value="appStore.user?.phone", чтобы пользователь видел актуальный номер, под кт он вошел в систему прямо сейчас. Телефон не даем возможности редактировать в целях безопасности.*/

const saveProfile = () => {
  console.log("Доступные методы стора:", Object.keys(appStore));
  if (!name.value.trim()) return alert("Поле Имя обязательно.");

  /* Регулярное выражение для проверки почты - Проверяет наличие текста до и после @, и домена (минимум 2 символа после точки)*/
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Проверка почты (если она заполнена)
  if (email.value && !emailPattern.test(email.value)) {
    return alert("Пожалуйста введите корректный адрес электронной почты");
  }

  // Если проверки пройдены — сохраняем
  appStore.updateUserProfile({
    name: name.value,
    lastname: lastname.value,
    address: address.value,
    email: email.value,
  });

  alert("Профиль успешно обновлен!");
  router.push("/"); // Возврат на главную страницу;
};

const orderHistoryTotalPrice = computed(() => {
  // Если cartStore.orders еще не загружен или равен null/undefined, возвращаем 0
  if (!cartStore.orders) return 0;

  return cartStore.orders.reduce((sum, order) => sum + Number(order.totalPrice), 0)
})

</script>

<template>
  <div class="profile-page">
    <div class="profile-edit">
      <h2>Ваш профиль</h2>
      <button @click="goBack" aria-label="Закрыть" class="close-btn">
        &times;
      </button>
      <div class="input-group">
        <label for="user-name">Ваше имя</label>
        <input
          id="user-name"
          v-model="name"
          type="text"
          placeholder="Введите Ваше имя"
        />
      </div>
      <div class="input-group">
        <label for="user-lastname">Ваша фамилия</label>
        <input
          id="user-lastname"
          v-model="lastname"
          type="text"
          placeholder="Введите Вашу фамилию"
        />
      </div>
      <div class="input-group">
        <label for="user-address">Адрес доставки</label>
        <input
          id="user-address"
          v-model="address"
          type="text"
          placeholder="Город, улица, дом, квартира"
        />
      </div>
      <div class="input-group">
        <label for="user-email">Ваш адрес электронной почты</label>
        <input
          id="user-email"
          v-model="email"
          type="email"
          :class="{
            'input-error': email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
          }"
          placeholder="example@mail.com"
        />
      </div>
      <div class="input-group">
        <label for="phone">Номер телефона (подтвержден)</label>
        <input
          id="phone"
          :value="appStore.user?.phone"
          type="text"
          disabled
          class="input-disabled"
        />
        <small>Номер нельзя изменить, он привязан к Вашему аккаунту</small>
      </div>
      <div class="profile-action">
        <button @click="saveProfile" class="btn btn-primary">
          Сохранить изменения
        </button>
        <button @click="goBack" class="btn btn-outline btn-cancel">
          Отмена
        </button>
      </div>
    </div>

    <!-- Показываем только авторизованным -->
    <div v-if="appStore.user" class="order-history">
        <h3>История заказов</h3>

      <!-- Состояние: Заказов нет -->
      <div v-if="!cartStore.orders || cartStore.orders.length === 0" class="no-orders">
        Вы еще ничего не заказывали.
      </div>

      <!-- Состояние: Заказы есть -->
      <div v-else class="order-list">
        <div v-for="order in cartStore.orders" :key="order.id" class="order-item">
          <div class="order-header">
            <span class="order-id"> Заказ № {{ order.id }}</span>
            <span class="order-date"> от {{ order.date }}</span>
          </div>
          <div class="order-body">
            <div v-for="item in order.items" :key="item.product.id" class="order-product">
              {{ item.product.title }} - {{ item.quantity }} шт.
            </div>
          </div>
          <div class="order-footer">
            <strong> Итого: {{ order.totalPrice }} ₽</strong>
          </div>
        </div>
         <!-- Итоговая сумма -->
         <div class="total-spend"> Общая сумма покупок: {{ orderHistoryTotalPrice }} ₽</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-edit {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); /* Мягкая глубокая тень */
}

h2 {
  text-align: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.input-group label {
  font-size: 14px;
  margin-bottom: 5px;
  color: #888;
  font-weight: 500;
  transition: color 0.3s ease;
}

.input-group input {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 16px;
  background: #fafafa;
  color: #262626;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
/* Эффект при фокусе (вводе) */
.input-group input:focus {
  outline: none;
  background: #fff;
  border-color: #1890ff;
  box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.1);
}

.input-group input.input-error {
  color: #ff4d4f !important;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2) !important;
  background-color: #fff2f0;
}

.input-group input.input-error:focus {
  border-color: #ff4d4f;
  background-color: #fff; /* Делаем фон чисто белым для удобства чтения */
  box-shadow: 0 0 0 4px rgba(255, 77, 79, 0.1);
  outline: none; /* Убираем стандартную браузерную обводку */
}

.input-disabled {
  background-color: #f5f5f5 !important; /* Серый фон */
  color: #8c8c8c !important; /* Тусклый текст */
  cursor: not-allowed; /* Курсор в виде знака запрета */
  border: dashed !important; /* Пунктирная рамка подчеркивает, что поле нельзя менять */
}

.small {
  margin-top: 6px;
  font-size: 12px;
  color: #bfbfbf;
}

.btn-primary {
  border-radius: 8px;
  padding: 13px 18px;
  transition: all 0.2s ease;
  font-size: 14px;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
  background: #096dd9;
}

.profile-action {
  display: flex;
  justify-content: center;
  gap: 35px;
  padding-top: 10px;
}
.btn-cancel {
  border-radius: 8px;
  padding: 13px 18px;
}

.btn-cancel:hover {
  border-color: #1890ff;
  color: #1890ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(24, 144, 255, 0.15);
}
h3 {
  font-size: 20px;
}


.order-history {
  margin-top: 40px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.order-item {
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease;
}
.order-item:hover {
  transform: translateY(-4px); /* Вместо увеличения — легкий подъем вверх */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08); /* Более мягкая тень */
  border-color: #1890ff; /* Подсвечиваем рамку синим */
}
.order-header {
  display: flex;
  gap: 5px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  margin-bottom: 12px;
  align-items: center;
}
.order-id {
  font-weight: 700;
  color: #1890ff;
}
.order-date {
  font-size: 15px;
  color: #8c8c8c;
}
.order-product {
  font-size: 14px;
  color: #595959;
  margin-bottom: 8px;
  padding: 4px 0;
  border-bottom: 1px solid #f5f5f5; /* Тонкая разделительная линия между блюдами */
}
.order-product:last-child {
  border-bottom: none;
}
.order-footer {
  margin-top: 10px;
  border-top: 1px solid #ddd;
  padding-top: 8px;
  text-align: right; 
}
.total-spend {
  font-weight: 700;
  color: #262626; 
  margin-left: 5px;
  margin-top: 25px;
  padding: 20px;
  /*background: #fafafa;*/
  background: #f0f7ff; /* Нежно-синий фон лучше выделяет итог, чем серый */
  border-radius: 12px;
/*border: 1px solid #f0f0f0;*/
  border: 1px solid #bae7ff;
  text-align: right; 
}

@media (max-width: 480px) {
  .profile-edit {
    padding: 15px;
    margin: 15px;
    border-radius: none;
    box-shadow: none;
  }
}
</style>