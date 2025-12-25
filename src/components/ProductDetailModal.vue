<!-- компонент ProductDetailModal.vue -->
<script setup>
import { useCartStore } from "@/store/cart";
import { computed } from "vue";

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
  <div
    v-if="isDetailOpen && product"
    @click.self="emit('close')"
    class="detail-overlay"
  >
    <div class="detail-content">
      <button class="close-btn" @click="$emit('close')">&times;</button>
      <div class="detail-grid">
        <!-- Левая колонка: Изображение -->
        <div class="detail-image">
          <img :src="getUrl(product.img)" alt="product.title" />
        </div>
        <!-- Правая колонка: Информация -->
        <div class="detail-info">
          <h2 class="products-card_description--name">
            {{ product.title }}
          </h2>
          <p class="products-card_description--text">
            {{ product.info }}
          </p>

          <div class="detail-specs">
            <p>
              <strong>Состав:</strong>
              {{
                product.ingredients ||
                "Классический рецепт из свежих ингредиентов"
              }}
            </p>
          </div>

          <!-- Блок КБЖУ -->
          <div class="kbju-container">
            <div class="kbju-card">
              <span>Ккал</span><strong>{{ product.kcal || 350 }}</strong>
            </div>
            <div class="kbju-card">
              <span>Белки</span><strong>{{ product.proteins || 12 }}г</strong>
            </div>
            <div class="kbju-card">
              <span>Жиры</span><strong>{{ product.fats || 15 }}г</strong>
            </div>
            <div class="kbju-card">
              <span>Угл.</span><strong>{{ product.carbs || 45 }}г</strong>
            </div>
          </div>

          <div class="detail-footer">
            <p class="detail-price">{{ product.price }} ₽</p>

            <!-- Логика кнопок: Добавить или +/- -->
            <div class="-detail-controls">
              <button
                v-if="currentQuantity === 0"
                class="btn btn-primary btn-large"
                @click="cartStore.addToCart(product)"
              >
                В корзину
              </button>

              <div v-else class="qty-manager">
                  <button class="btn btn-outline" @click="cartStore.decreaseQuantity(product)">-</button>
                  <span class="qty-num">{{ currentQuantity }}</span>
                  <button class="btn btn-outline" @click="cartStore.increaseQuantity(product)">+</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scope>
    .detail-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex; justify-content: center; align-items: center;
  z-index: 3000;
  backdrop-filter: blur(4px);
}

.detail-content {
  background: white;
  width: 95%; max-width: 850px;
  border-radius: 15px;
  padding: 30px;
  position: relative;
  animation: slideUp 0.3s ease-out;
}
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 30px;
}

.detail-image img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.detail-title { font-size: 32px; margin-bottom: 10px; }
.detail-description { color: #666; margin-bottom: 20px; line-height: 1.5; }

</style>