<!-- компонент FloatingCart.vue -->
<script setup>
import { useCartStore } from "@/store/cart";
import { computed } from "vue";

const cartStore = useCartStore();

const props = defineProps({
  activeProduct: Object, // Конкретный товар из окна описания
  isStatic: Boolean, // Флаг для отображения внутри модалки
});

// Эмит для открытия большой модалки при клике на плашку
const emit = defineEmits(["open-cart"]);

// Умный расчет количества
const displayCount = computed(() => {
  // Если передан конкретный активный товар, считаем только его
  if (props.activeProduct) {
    return cartStore.getItemQuantity(props.activeProduct);
  }
  return cartStore.totalCount; // Общее количество для плашки на главной
});

// Умный расчет стоимости
const displayPrice = computed(() => {
  // Если передан конкретный активный товар, считаем стоимость ТОЛЬКО для этого количества этого товара
  if (props.activeProduct) {
    return Number(props.activeProduct.price) * displayCount.value;
  }
  return cartStore.totalPrice; // Общая сумма для плашки на главной
});

const handleClick = () => {
  emit("open-cart"); // Сигнал родителю (закрыть окно описания)
  cartStore.toggleCart(true); // Открыть большую корзину
};

const getPlural = (count) => {
  /* Math.abs делает число положительным. % 100 берет две последние цифры. Для числа 125 это будет 25. Это нужно, чтобы понять, не попадает ли число в диапазон от 11 до 19.*/
  const n = Math.abs(count) % 100; 

  /* % 10 берет только самую последнюю цифру. Для числа 25 это будет 5. По этой цифре мы будем определять большинство окончаний. */
  const n1 = Math.abs(count) % 10; 

  /* Проверка исключения: в русском языке числа от 11 до 19 всегда требуют форму "товаров".Если мы нашли, что последние две цифры 11, 12, 13...19, функция сразу возвращает результат и прекращает работу.*/
  if (n > 10 && n < 19 ) return 'товаров' ;

  /* Проверка на "несколько" (2, 3, 4) - Если последняя цифра 2, 3 или 4 (но не 12, 13, 14 — их мы отсекли выше),то это всегда форма "товара".*/
  if (n1 > 1 && n1 < 5) return 'товара'; 


  /* Проверка на единственное число (1) - Если последняя цифра 1 (но не 11), то это форма "товар".*/ 
  if (n1 === 1) return 'товар'; 

  /*  Дефолт - если число не подошло ни под одно условие выше (например: 0, 5, 6, 7, 8, 9, 10, 20), возвращаем "товаров".*/
  return 'товаров'; 
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
          {{ displayCount }} {{ getPlural(displayCount) }}
        </span>
      </div>

      <!-- Текст меняется в зависимости от контекста -->
      <span class="floating-cart__text"> Оформить заказ </span>

      <div class="floating-cart__controls--price">{{ displayPrice }} ₽</div>
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
  width: 100%; /* Растягиваем на всю ширину футера */
  max-width: none;
  margin-top: 20px;
  background: #40a9ff; /* Добавьте цвет сюда тоже, так как :not его отменил */
  color: white;
  border-radius: 12px;
  padding: 16px 24px;
  cursor: pointer;
}

/* Эффект наведения для СТАТИЧНОЙ  и ПЛАВАЮЩЕЙ версии */
.floating-cart:hover {
  background: #1890ff;
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
.floating-cart__controls--price {
  font-size: 20px;
  font-weight: 700;
}
</style>