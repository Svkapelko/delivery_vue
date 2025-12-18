//store/cart.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: [],
    }),

    actions: {
        addToCart(product) {
            this.items.push({ product, quantity: 1 })
            console.log('Добавлен товар:', product); // Добавим вывод в консоль
        },
        clearCart() {
            this.items = []; // Очищаем корзину
        }
    }
})
