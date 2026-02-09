//store/cart.js
import { defineStore } from "pinia";
import { useAppStore } from "./app-store";

export const useCartStore = defineStore("cart", {
  state: () => {
     // 1. Сначала выполняем логику (нужны фигурные скобки {})
     // ВАЖНО: Вызываем useAppStore() ПРЯМО ТУТ, внутри функции
    const appStore = useAppStore();
    const storageKey = appStore.user ? `orders_${appStore.user.phone}` : 'guest';
    const savedOrders = JSON.parse(localStorage.getItem(storageKey)) || [];// Загружаем историю из памяти
    
    // 2. Затем возвращаем объект состояния через return
    return {
      items: [],
      orders: savedOrders,
      lastOrderId: null,// переменная для хранения номера последнего заказа
      showMessage: false, // Флаг отображения сообщения
      messageText: "", // Текущее сообщение
      isCartOpen: false, // «корзина» - то самое «модальное окно», кт открывается из хедера.
    }
  },

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

    // Этот метод вызовем сразу после успешной авторизации
     loadUserHistory() {
      // 1. Сначала инициализируем стор
      const appStore = useAppStore(); 
      // 2. Теперь проверяем телефон
      if (appStore.user?.phone) {
        const storageKey = `orders_${appStore.user.phone}`;
        this.orders = JSON.parse(localStorage.getItem(storageKey)) || [];
        console.log(`История загружена для ключа: ${storageKey}`);
      } else {
        // 3. Если телефона нет (юзер не вошел), обнуляем массив
        this.orders = [];
      }
     },

    // В сторе корзины создается действие, кт отправляет данные о товарах и токене пользователя на сервер.
    async createOrder() {
      try {
        const appStore = useAppStore();

        // Проверка: если токена нет, заказ создать нельзя (защита)
        if (!appStore.token) throw new Error("Пользователь не авторизован.");

         // 1. Формируем расширенный объект данных для сервера
         const orderBody = {
          items: this.items,
          totalPrice: this.totalPrice,
          // Добавляем данные из профиля пользователя
          customer: {
            name: appStore.user?.name || 'Имя не указано',
            lastname: appStore.user?.lastname || 'Фамилия не указана',
            phone: appStore.user?.phone,
            address: appStore.user?.address || 'Адрес не указан',
            email: appStore.user?.email || 'Email не указан'
          },
         createdAt: new Date().toISOString() // Хорошая практика — добавлять дату
        };

        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${appStore.token}`
          },
          // Отправляем обновленный объект
          body: JSON.stringify(orderBody)
        });

        if (!response.ok) throw new Error("Сервер вернул ошибку");

        // ПИШЕМ ЛОГИКУ СОХРАНЕНИЯ В ИСТОРИЮ
        // 1. Генерируем номер заказа - вернее ,имитируем (например, #5521), тк JSONPlaceholder его не пришлет
        const fakeOrderId = Math.floor(Math.random() * 10000) + 100;

        // 2. Формируем объект для истории (берем данные, пока корзина не пуста)
        const newOrder = {
          id: fakeOrderId,
          date: new Date().toLocaleString('ru-RU'),
          totalPrice: this.totalPrice,
          items: [...this.items] /* Обязательно делаем копию массива через [... ] - Если просто написать items: this.items, то при очистке корзины данные могут исчезнуть и из истории (из-за особенностей ссылок в JS).*/
        }

        // ИСПРАВЛЕНИЕ: Проверяем, существует ли массив. Если нет — создаем его.
        if (!this.orders) {
          this.orders = [];
        }
        // 3. Сохраняем в массив заказов (в начало списка)
        this.orders.unshift(newOrder); /* добавляем заказ в начало массива, чтобы в профиле пользователь видел самый свежий заказ первым.*/ 

        // 4. Синхронизируем с LocalStorage - УНИКАЛЬНЫЙ КЛЮЧ: привязываем сохранение к телефону пользователя
        const storageKey = `orders_${appStore.user?.phone || 'guest'}`;
        localStorage.setItem(storageKey, JSON.stringify(this.orders));

        // КОНЕЦ ЛОГИКИ ИСТОРИИ 

        // Теперь можно очищать корзину
        this.items = [];

        const data = await response.json();
        this.lastOrderId = fakeOrderId;

        return {success: true, orderId: data.id || fakeOrderId};
      } catch (e) {
        console.error("Ошибка оформления заказа:", e);
        return {success: false};
      }
    }
  },
});
