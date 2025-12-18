<script setup>
import { useCartStore } from "@/store/cart";
import { ref, computed } from "vue";
const cartStore = useCartStore();

// Пропы для передачи статуса модального окна
const props = defineProps({
  isOpen: Boolean,
});

// Эмиттер для отправки события закрытия модального окна
const emit = defineEmits(["toggleModal"]);

// Метод закрытия модального окна
const closeModal = () => emit("toggleModal");

// Увеличение количества товара
const increaseQuantity = (item) => {
  item.quantity ++;
};
// Уменьшение количества товаров
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity --;
  } else {  // Полностью удаляем товар из корзины
    cartStore.items.splice(cartStore.items.indexOf(item), 1);
  }
};

// Сумма всех товаров в корзине
const totalPrice = computed(() => {
  return cartStore.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
    );
});
// Метод очистки корзины и закрытия модального окна
const cancelAndClearCart = () => {
    cartStore.clearCart();  // Очищаем корзину
    closeModal(); // Закрываем модальное окно
}
</script>

<template>
  <div
    :class="{ open: isOpen }"
    @click.self="closeModal()"
    class="cart-modal__overlay"
  >
    <div class="cart-modal">
      <div class="cart-modal__header">
        <h2 class="cart-modal__header--title">Корзина</h2>
        <span class="cart-modal__header--close" @click="closeModal()">
          <img src="../assets/images/icons/close.svg" alt="close" />
        </span>
      </div>
      <div class="cart-modal__body">
        <div v-if="cartStore.items.length > 0">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="cart-item"
          >
            <p class="cart-item--title">{{ item.product.title }}</p>
            <div class="cart-item__controls">
              <div class="cart-item__controls--price">
                {{ item.product.price }} ₽
              </div>
              <button class="btn btn-outline" @click="increaseQuantity(item)">
                +
              </button>
              <div class="cart-item__controls--count">{{ item.quantity }}</div>
              <button class="btn btn-outline" @click="decreaseQuantity(item)">
                -
              </button>
            </div>
          </div>
        </div>
        <div v-else>
            <p>Корзина пуста</p>
        </div>
      </div>
      <div class="cart-modal__footer">
        <div class="cart-modal__footer--price">{{ totalPrice}} ₽</div>
        <div class="cart-modal__footer--controls">
          <button class="btn btn-primary">Оформить заказ</button>
          <button class="btn btn-outline" @click="cancelAndClearCart()">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-modal__overlay {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
}

.cart-modal__overlay.open {
  display: flex; /* появится на странице если у него будет класс open */
}

.cart-modal {
  width: 100%; /*  ширина блока 100%, она дойдет до 780px и остановится, больше она быть не может, а меньше может*/
  max-width: 780px;
  padding: 40px 45px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
}

.cart-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
}

.cart-modal__header--title {
  color: rgba(0, 0, 0, 1);
  font-size: 36px;
  font-weight: 700;
  line-height: 42px;
  margin: 0;
}

.cart-modal__header--close {
  cursor: pointer;
}

.cart-modal__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 50px;
}

.cart-modal__footer--price {
  color: rgba(250, 250, 250, 1);
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  border-radius: 5px;
  background: rgba(38, 38, 38, 1);
  padding: 15px 20px;
}

.cart-modal__footer--controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.cart-item:not(:last-child) {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
}

.cart-item--title {
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
  margin: 0;
}

.cart-item__controls {
  display: flex;
  align-items: center;
}

.cart-item__controls--price {
  color: rgba(0, 0, 0, 1);
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  margin-right: 47px;
}

.cart-item__controls--count {
  margin-right: 15px;
  margin-left: 15px;
}

.cart-item__controls button {
  box-sizing: border-box;
  border: 1px solid rgba(64, 169, 255, 1);
  border-radius: 2px;
  background: rgba(255, 255, 255, 1);
  color: rgba(64, 169, 255, 1);
}
</style>