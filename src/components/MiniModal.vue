<!-- components/MiniModal.vue -->
<script setup>
import { useCartStore } from "@/store/cart";
import { computed } from "vue";

const cartStore = useCartStore();

const props = defineProps({
  activeProduct: Object,
})

// Используем геттер из стора для получения количества этого товара в корзине
const currentQuantity = computed(() => cartStore.getItemQuantity(props.activeProduct));

</script>

<template>
  <!-- Компонент исчезнет сам, как только currentQuantity станет 0 -->
  <div 
    v-if="currentQuantity > 0"
    class="cart-modal-mini"
  >
    <div class="cart-item__controls--quantity">
      <button
        class="btn btn-outline btn-cart-modal-mini"
        @click="cartStore.decreaseQuantity(props.activeProduct)"
      >
       -
      </button>   
      <span class="cart-item__controls--count">{{ currentQuantity }}</span>
      <button
        class="btn btn-outline btn-cart-modal-mini"
        @click="cartStore.increaseQuantity(props.activeProduct)"
      >
        +
      </button>     
    </div>
  </div>
</template>


<style>
.cart-modal-mini {
  position: absolute;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: #f9f9f9;
  border-radius:20px; 
  width: 100%;
}
.cart-item__controls--quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*margin-bottom: 10px;*/
}

.mini-modal.open {
  display: block; /* Показываем окно, если класс open активен */
}

.cart-item__controls--count {
  margin-left: 5px;
  margin-right: 10px;
}
.btn-cart-modal-mini {
  border: none;
  outline: none;
  background-color: #f9f9f9;
  box-sizing: border-box;
  border-radius: 20px;
  color: black;
  padding: 4px 8px 4px 8px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>