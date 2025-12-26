<!-- компонент FloatingCart.vue -->
<script setup>
import { useCartStore } from "@/store/cart";
import { computed } from 'vue';

const cartStore = useCartStore();

const props = defineProps({
  activeProduct: Object,  // Конкретный товар из окна описания
  isStatic: Boolean  // Флаг для отображения внутри модалки
});

// Эмит для открытия большой модалки при клике на плашку
const emit = defineEmits(["open-cart"]);

// Умный расчет количества
const displayCount = computed(()=> {
   // Если передан конкретный активный товар, считаем только его
   if (props.activeProduct) {
    return cartStore.getItemQuantity(props.activeProduct);
   }
   return cartStore.totalCount;  // Общее количество для плашки на главной

})

// Умный расчет стоимости
const displayPrice = computed(() => {
   // Если передан конкретный активный товар, считаем стоимость ТОЛЬКО для этого количества этого товара
   if (props.activeProduct) {
    return Number(props.activeProduct.price) * displayCount.value;
   }
   return cartStore.totalPrice;  // Общая сумма для плашки на главной
}) 

const handleClick = () => {
  emit('open-cart'); // Сигнал родителю (закрыть окно описания)
  cartStore.toggleCart(true); // Открыть большую корзину
}

</script>

<template>

   <!-- Показываем только если количество конкретного товара > 0 -->
  <div
    v-if="displayCount > 0"
    @click="handleClick"
    :class="{ 'is-static': isStatic }"
    class="floating-cart"
  >
    <div class="floating-cart-content">
        <div class="floating-cart--left">
            <div class="floating-cart-icon">
                <img src="../assets/images/icons/cart.svg" alt="cart" />
            </div>
            <span class="floating-cart__controls--count">
                {{ displayCount }} товара
            </span>
        </div> 

        <!-- Текст меняется в зависимости от контекста -->
        <span class="floating-cart__text">
          Оформить заказ
        </span>

      <div class="floating-cart__controls--price">
        {{ displayPrice }} ₽
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Обычное состояние (плавает внизу экрана) */
.floating-cart:not(.is-static) {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  background: #40a9ff; /* Яркий синий цвет из вашего стиля */
  color: white;
  border-radius: 12px;
  padding: 16px 24px;
  box-shadow: 0 8px 24px rgba(64, 169, 255, 0.4);
  cursor: pointer;
  z-index: 900; /* Ниже модалки, но выше всего остального */
  transition: transform 0.2s, background-color 0.2s;
}

/* СТАЦИОНАРНОЕ СОСТОЯНИЕ (внутри модалки) */
.floating-cart.is-static {
  width: 100%;
  position: relative; /* Отменяем fixed */
  bottom: 0;
  left: 0;
  transform: none;
  width: 100%;        /* Растягиваем на всю ширину футера */
  max-width: none;
  margin-top: 20px;
  background: #40a9ff; /* Добавьте цвет сюда тоже, так как :not его отменил */
  color: white;
  border-radius: 12px;
  padding: 16px 24px;
  cursor: pointer;
}

/* Эффект наведения только для ПЛАВАЮЩЕЙ версии */
.floating-cart:not(.is-static):hover {
  background: #1890ff;
  transform: translateX(-50%) translateY(-2px);
}
/* Эффект наведения для СТАТИЧНОЙ версии (внутри модалки) */
.floating-cart.is-static:hover {
  background: #1890ff;
  transform: translateY(-2px); /* Убираем translateX(-50%)! */
}

.floating-cart-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.floating-cart--left {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    align-items: center;
}

</style>