//store/cart.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    showMessage: false, // Флаг отображения сообщения
    messageText: "", // Текущее сообщение
    isCartOpen: false, // «корзина» - то самое «модальное окно», кт открывается из хедера.
  }),

  /*  геттеры (без аргументов, кэшируются) Геттеры автоматически «подписываются» на изменения state.items. Как только массив изменится, все кнопки на странице мгновенно переключатся*/
  getters: {
    // Общее количество товаров
    totalCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    // Проверка, пуста ли корзина
    isCartEmpty: (state) => {
      return state.items.length === 0;
    },

    // геттер-функция - реактивное свойство, принимающее аргумент
    isInCart: (state) => (product) => {
        return state.items.some((item) => item.product.id === product.id)
    },

    // геттер-функция - реактивное свойство, принимающее аргумент
    getItemQuantity: (state) => (product) => {
        const item = state.items.find((item) => item.product.id === product.id);
        return item ? item.quantity : 0;
    },

    // Общая сумма заказа
    totalPrice: (state) => {
      return state.items.reduce((sum, item) => {
        // Number(), чтобы гарантировать расчеты
        const price = Number(item.product.price) || 0;
        return sum + price * item.quantity;
      }, 0);
    },
  },

  // Методы (принимают аргумент, отлично подходит для v-if)
  actions: {
    toggleCart(value) {
      this.isCartOpen = value; /* обращаемся через контекст вызова this */
    },

    addToCart(product) {
      const currentItemIndex = this.items.findIndex(
        (item) => item.product.id === product.id
      ); // используется метод findIndex, кт ищет индекс первого элемента массива (this.items), у кт product.id равен id добавляемого товара. Если найден подходящий элемент, existingItemIndex получит его индекс, иначе — -1.
      if (currentItemIndex >= 0) {
        this.items[currentItemIndex].quantity++; // Если товар уже есть в корзине (currentItemIndex >= 0), увеличивается количество товара на единицу
      } else {
        this.items.push({ product, quantity: 1 }); // Если товар впервые добавляется в корзину (currentItemIndex === -1), yовый товар добавляется в массив с начальной единицей (quantity: 1).
        console.log("Добавлен товар:", product); // Добавим вывод в консоль
      }

      (this.showMessage = true),
        (this.messageText = `${product.title} добавлен в корзину`);
      setTimeout(() => {
        this.showMessage = false;
        this.messageText = "";
      }, 3000); // Скрывает сообщение через 3 секунды
    },

    // Удаление товара из корзины
    removeFromCart(product) {
      const index = this.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (index >= 0) {
        this.items.splice(index, 1);
      }
      this.showMessage = true;
      this.messageText = `${product.title} удален из корзины`;
      setTimeout(() => {
        this.showMessage = false;
        this.messageText = "";
      }, 3000);
    },

    // Увеличение количества товара
    increaseQuantity(product) {
      const item = this.items.find((item) => item.product.id === product.id);
      if (item) {
        item.quantity++;
      }
    },

    // Уменьшение количества товара
    decreaseQuantity(product) {
      const item = this.items.find((item) => item.product.id === product.id);
      if (item && item.quantity > 1) {
        item.quantity--; // Уменьшаем количество, если больше 1
      } else if (item && item.quantity === 1) {
        this.removeFromCart(product); // Если осталось 1 единица, удаляем товар
      } /* в хранилище проверка item.quantity === 1 выполняется некорректно, при первой итерации вы уже уменьшаете количество товара до 1, и вторая проверка item.quantity === 1 не успевает запуститься. Поэтому, чтобы удалить товар, нужно написать специальную логику, которая учтёт, что после уменьшения количества нужно проверить, не равно ли оно 1.*/
    },

    // Очистка корзины
    clearCart() {
      this.items = []; // Очищаем корзину
      this.showMessage = true;
      this.messageText = "Заказ отменен";
      setTimeout(() => {
        this.showMessage = false;
        this.messageText = "";
      }, 3000);
    },
  },
});
