<!-- компонент FloatingCart.vue -->
<script setup>
import { useCartStore } from "@/store/cart";
const cartStore = useCartStore();

// Эмит для открытия большой модалки при клике на плашку
const emit = defineEmits(["open-cart"]);
</script>

<template>
  <div
    v-if="!cartStore.isCartEmpty"
    @click="emit('open-cart')"
    class="floating-cart"
  >
    <div class="floating-cart-content">
        <div class="floating-cart--left">
            <div class="floating-cart-icon">
                <img src="../assets/images/icons/cart.svg" alt="cart" />
            </div>
            <span class="floating-cart__controls--count">
                {{ cartStore.totalCount }} товара
            </span>
        </div>      
      <div class="floating-cart__controls--price">
        {{ cartStore.totalPrice }} ₽
      </div>
    </div>
  </div>
</template>

<style scoped>
.floating-cart {
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
.floating-cart:hover {
  background: #1890ff;
  transform: translateX(-50%) translateY(-2px);
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