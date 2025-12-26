<!-- компонент ProductDetailModal.vue -->
<script setup>
import { useCartStore } from "@/store/cart";
import { computed } from "vue";
import FloatingCart from "./FloatingCart.vue";

const props = defineProps({
  isDetailOpen: Boolean,
  product: Object,
});

const cartStore = useCartStore();
const emit = defineEmits(["close"]);

// Используем геттер из стора для получения количества этого товара в корзине
const currentQuantity = computed(() => {
  if (!props.product) return 0;
  return cartStore.getItemQuantity(props.product);
});

const getUrl = (name) => {
  return new URL(`../assets/images/goods/${name}`, import.meta.url);
};
</script>

<template>
  <!-- Открываемся только если isOpen и есть данные продукта -->
  <transition name="fade">
    <!-- встроенный в Vue 3 компонент для создания анимаций при появлении или исчезновении элементов (когда срабатывают v-if или v-show), способ сделать интерфейс «живым», чтобы модальные окна плавно проявлялись. -->
    <div
      v-if="isDetailOpen && product"
      @click.self="emit('close')"
      class="product-detail-overlay"
    >
      <div class="product-detail-content">
        <button class="close-btn" @click="$emit('close')">&times;</button>
        <div class="product-detail-grid">
          <!-- Левая колонка: Изображение -->
          <div class="product-detail-image">
            <img :src="getUrl(product.img)" alt="product.title" />
          </div>
          <!-- Правая колонка: Информация -->
          <div class="product-detail-info">
            <h2 class="product-detail-title">
              {{ product.title }}
            </h2>
            <p class="products-detail-description">
              {{ product.title }}
            </p>

            <div class="product-detail-specs">
              <p class="products-detail-description">
                <strong>Состав:</strong>
                {{
                  product.info || "Классический рецепт из свежих ингредиентов"
                }}
              </p>
            </div>

            <!-- Блок КБЖУ -->
            <div class="kbju-container">
              <div class="kbju-card">
                <span class="product-detail-description">Ккал</span>
                {{ product.kcal || 350 }}
              </div>
              <div class="kbju-card">
                <span class="product-detail-description">Белки</span>
                {{ product.proteins || 12 }}г
              </div>
              <div class="kbju-card">
                <span class="product-detail-description">Жиры</span>
                {{ product.fats || 15 }}г
              </div>
              <div class="kbju-card">
                <span class="product-detail-description">Углеводы</span>
                {{ product.carbs || 45 }}г
              </div>
              <div class="kbju-card">
                <span class="product-detail-description">Вес</span>
                {{ product.weight || 115 }}г
              </div>
            </div>

            <!-- УПРАВЛЕНИЕ КОЛИЧЕСТВОМ (над футером) -->
            <div v-if="currentQuantity > 0" class="quantity-controls-wrap">
              <div class="quantity-controls">
                <button
                  class="btn btn-outline"
                  @click="cartStore.decreaseQuantity(product)"
                >
                  -
                </button>
                <span class="quantity-number">{{ currentQuantity }}</span>
                <button
                  class="btn btn-outline"
                  @click="cartStore.increaseQuantity(product)"
                >
                  +
                </button>
              </div>
            </div>

            <div class="product-detail-footer">
             <!-- Состояние 1: Товара НЕТ в корзине -->
              <template v-if="currentQuantity === 0">
                <p class="product-detail-price">{{ product.price }} ₽</p>
                <button
                  @click="cartStore.addToCart(product)"
                  class="btn btn-primary btn-large"
                >
                  В корзину
                </button>
              </template>

              <!-- Состояние 2: Товар ДОБАВЛЕН (показываем FloatingCart) -->
              <FloatingCart
                v-else
                :active-product="product"
                :is-static="true"
                @open-cart="emit('close')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scope>
.product-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000; /* гарантирует, что окно будет поверх хедера (у которого обычно 100-1000) и поверх плавающей кнопки корзины на главной. */
  backdrop-filter: blur(4px); /* современный эффект матового стекла. Размывает всё, что находится ПОД оверлеем*/
}
.product-detail-content {
  background: white;
  width: 95%;
  max-width: 850px;
  border-radius: 15px;
  padding: 30px;
  position: relative;
  animation: slideUp 0.3s ease-out; /* при открытии окно не просто появится, а плавно "подпрыгнет" снизу вверх. */
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  outline: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #aaa;
}

.product-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 30px;
}
.product-detail-image img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.product-detail-title {
  color: rgba(0, 0, 0, 1);
  font-size: 32px;
  font-weight: 400;
  line-height: 32px;
  margin-bottom: 10px;
}
.product-detail-description {
  color: #666;
  line-height: 1.5;
}

.kbju-container {
  display: flex;
  gap: 10px;
  margin: 10px 0px;
}
.kbju-card {
  flex: 1;
  background: #f4f4f4;
  padding: 8px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
}
.kbju-card span {
  font-size: 11px;
  display: block;
  font-size: 14px;
  font-weight: 700;
}

.quantity-controls-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.product-detail-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  min-height: 60px; /* Чтобы высота не прыгала при смене кнопок */
}
.product-detail-price {
  font-size: 26px;
  font-weight: bold;
}
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}
.quantity-number {
  font-weight: bold;
  font-size: 20px;
}
.quantity-controls button {
  box-sizing: border-box;
  border: 1px solid rgba(64, 169, 255, 1);
  border-radius: 2px;
  background: rgba(255, 255, 255, 1);
  color: rgba(64, 169, 255, 1);
}

/* Анимации */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .product-detail-grid {
    grid-template-columns: 1fr;
  }
  .product-detail-content {
    max-height: 90vh;
    overflow-y: auto;
  }
}
</style>