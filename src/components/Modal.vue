<!-- компонент Modal.vue -->
<script setup>
import { useCartStore } from "@/store/cart";
import { ref, onUnmounted, watch } from "vue";

const cartStore = useCartStore();

// cancelAndClearCart
const cancelAndClearCart = () => {
   // Вызываем стандартное окно подтверждения
   const confirmed = confirm("Вы уверены, что хотите полностью очистить корзину?");
   if (confirmed) {
    cartStore.clearCart(); // Очищаем корзину, если нажато "ОК"
    setTimeout(()=> {
      cartStore.toggleCart(false); // Закрываем модальное окно
    }, 2000);
  }
};


// Ссылка на DOM-элемент окна
const modalRef = ref(null) /* Позволяет Vue получить прямой доступ к HTML-элементу, чтобы узнать его начальные координаты (offsetLeft/Top)*/
const isDragging = ref(false);
const hasBeenDragged = ref(false);

// Состояние перетаскивания
const position = ref({ x: 0, y: 0});  // Текущие координаты
const offset = ref({ x: 0, y: 0}); // Смещение относительно курсора

// 1. Сброс позиции при открытии, чтобы окно не "терялось"
watch(() => cartStore.isCartOpen, (val) => {
  if (val) {
    hasBeenDragged.value = false; // Возвращаем в центр при новом открытии
  }
})

const startDrag = (event) => {
  // Если нажали на кнопку закрытия или любой интерактивный элемент - не тащим
  if (event.target.closest('.cart-modal__header--close')) return;

  // Проверка на наличие элемента перед использованием
  if (!modalRef.value) return;
  
    // 1. Сначала вычисляем текущее положение окна на экране
    const rect = modalRef.value.getBoundingClientRect();
    // 2. Устанавливаем координаты position в те, где оно стоит сейчас, xто предотвратит прыжок при переключении в fixed
    position.value = {
      x: rect.left,
      y: rect.top
    };
     // 3. Вычисляем смещение курсора относительно левого верхнего угла окна, event.clientX / clientY: это текущие координаты курсора на экране
    offset.value = { 
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    // 4. Только ТЕПЕРЬ разрешаем переключение в fixed и движение
    isDragging.value = true;
    hasBeenDragged.value = true;

    // Добавляем глобальные слушатели на всё окно, чтобы не "потерять" модалку при быстром движении
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
  }  


const onDrag = (event) => {
  if (!isDragging.value) return;

  // Рассчитываем новые координаты относительно вьюпорта для fixed позиционирования
  position.value = {
    x: event.clientX - offset.value.x,
    y: event.clientY - offset.value.y
  };
};

const stopDrag = () => {
  isDragging.value = false;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
}

// Важно добавить очистку при удалении компонента
onUnmounted(() => {
  stopDrag();
});

</script>

<template>
  <div
    :class="{ open: cartStore.isCartOpen }"
    @click.self="cartStore.toggleCart(false)"
    class="cart-modal__overlay"
  >
    <div 
      ref = "modalRef"    
      class="cart-modal"
      :style="hasBeenDragged ? {
        position: 'fixed',
        left: position.x + 'px',
        top: position.y + 'px',
        margin: 0 // Сбрасываем центрирование после начала движения
      } : {} "
      >
       <!-- Шапка окна — за неё будем таскать -->
      <div 
        class="cart-modal__header" 
        @mousedown="startDrag" 
        title="Зажмите, чтобы переместить"
      >
        <slot name="header">
          <h2 class="cart-modal__header--title">Корзина</h2>
        </slot>
        
        <span class="cart-modal__header--close" @click.stop="cartStore.toggleCart(false)">
          <img src="../assets/images/icons/close.svg" alt="close" />
        </span>
      </div>

      <!-- Блок для отображения сообщений -->
      <div v-if="cartStore.showMessage" class="cart-modal__message">
        {{ cartStore.messageText }}
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
                {{ item.product.price * item.quantity }} ₽ <!-- Индивидуальная стоимость товара -->
              </div>
              <button class="btn btn-outline" @click="cartStore.decreaseQuantity(item.product)">
                -
              </button>
              <div class="cart-item__controls--count">{{ item.quantity }}</div>
              <button class="btn btn-outline" @click="cartStore.increaseQuantity(item.product)">
                +
              </button>
              <div @click="cartStore.removeFromCart(item.product)" class="remove-icon"> 
                <img src="../assets/images/icons/trash.png" alt="trash">
              </div>
            </div>
          </div>
        </div>
        <div v-else>
            <p>Корзина пуста</p>
        </div>
      </div>
      <div class="cart-modal__footer">
        <div class="cart-modal__footer--price">{{ cartStore.totalPrice }} ₽</div>
        <div class="cart-modal__footer--controls">
          <button class="btn btn-primary">Оформить заказ</button>
          <button class="btn btn-outline" @click="cancelAndClearCart">Очистить корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-modal__overlay {
  display: none;
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.cart-modal__overlay.open {
  display: flex; /* появится на странице если у него будет класс open */
}

/* НОВОЕ: Если окно начали перетаскивать, отключаем центрирование у оверлея */
.cart-modal__overlay.has-dragged {
  display: block; /* Убираем flex, чтобы left/top работали корректно */
}

.cart-modal {
  width: 100%; /*  ширина блока 100%, она дойдет до 780px и остановится, больше она быть не может, а меньше может*/
  max-width: 780px;
  padding: 40px 45px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  /* ВАЖНО: Добавляем box-sizing, чтобы паддинги не ломали расчеты */
  box-sizing: border-box; 
  position: relative;
}

.cart-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  cursor: grab; /* Рука для перетаскивания */
  user-select: none; /* Чтобы текст не выделялся при движении */
  position: relative;
}

.cart-modal__header:active {
  cursor: grabbing; /* Кулачок при захвате */
}
.cart-modal__header::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background: #e8e8e8;
  border-radius: 10px;
}

.cart-modal__header--title {
  color: rgba(0, 0, 0, 1);
  font-size: 36px;
  font-weight: 700;
  line-height: 42px;
  margin: 0;
}

/* Убедимся, что иконка закрытия всегда сверху и кликабельна */
.cart-modal__header--close {
  position: relative;
  z-index: 10; /* Кнопка должна быть выше области перетаскивания */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: transform 0.2s;
}
.cart-modal__header--close:hover {
  transform: scale(1.1);
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
.remove-icon {
  margin-left: 15px;
  cursor: pointer;
  flex-shrink: 0; /* Запрещаем иконке мусора сжиматься */
}
.remove-icon img {
  width: 100%;     /* Пытается занять всё место */
  max-width: 24px;   /* Но не больше этого */
  min-width: 18px;   /* И НИКОГДА не меньше этого */
  height: auto;      /* Сохраняет пропорции */
  min-height: 20px;  /* Минимальная высота */
}
</style>