// stores/app-store.js

/*app-store.js — это «пульт управления» всем приложением. В нем хранится глобальное состояние интерфейса (UI State), от не привязано к конкретным товарам или корзине, но нужно разным частям сайта одновременно. В нем хранятся: 

1. Глобальные флаги видимости,
Только те окна, кт открываются из разных (не связанных) компонентов): 
isCartOpen — так как корзину открывают и из Хедера, и из карточки товара, и из плавающей кнопки.
isMenuOpen — если у вас есть мобильное боковое меню (бургер-меню).
isAuthOpen — окно входа/регистрации (может всплыть в любой момент). 

2. Состояние загрузки и ошибки
Глобальные индикаторы, которые показывают пользователю, что что-то происходит:
isLoading — если этот флаг true, по центру экрана крутится лоадер (пока грузятся рестораны или отправляется заказ).
globalError — текст ошибки (например, «Проблемы с интернетом»), который выводится в специальной плашке сверху.

3. Пользовательские настройки (Preferences)
Данные, которые влияют на весь интерфейс сразу:
theme — (light/dark) если вы делаете темную тему.
language — если сайт будет на разных языках.
city — выбранный город доставки (влияет на список доступных ресторанов).

*/

import { defineStore } from 'pinia';
import { useCartStore } from './cart';
import router from '@/router';

export const useAppStore = defineStore('app', {
  state: () => {
    // 1. Сначала вычисляем данные (логика)
    /* Мы не можем сразу достать пользователя, пока не знаем его телефон. Поэтому при загрузке страницы берем только токен.*/
    const savedToken = localStorage.getItem('token');

    // 2. Затем ВОЗВРАЩАЕМ объект состояния
    return {
       // Состояние окон
      isAuthOpen: false, // Флаг для модалки авторизации
      authStep: 1, // Добавляем: 1 - ввод телефона, 2 - ввод СМС
      user: null, // Инициализируем как null
      token: savedToken || null,
      isLoading: false,  // Глобальный статус
      errorMessage: null,
    };
  },

  actions: {
    initAuth() { /*функция проверяет, залогинен ли пользователь, и если да — подтянет его данные по номеру телефона.*/ 
      
      // Если есть токен и данные о телефоне в сохраненном объекте
      const savedUser = localStorage.getItem('user');
      if (savedUser && savedUser !== "undefined") {
        this.user = JSON.parse(savedUser);
        // Если телефон есть, подгружаем профиль и историю
        if (this.user?.phone) {
          this.loadUserProfile(this.user.phone);
          const cartStore = useCartStore();
          cartStore.loadUserHistory();
        }
      }
    },

    updateUserProfile(updatedData) {
    // Обновляем объект user в сторе. Мы берем старые данные (...this.user) и накладываем новые (...updatedData). Используем пустой объект как запасной вариант: (this.user || {}) - защита "на случай пустоты". Если this.user равен null, мы должны развернуть пустой объект */
    this.user = { ...(this.user || {}), ...updatedData };

    // Сохраняем обновленного пользователя в localStorage
    // Это нужно, чтобы после обновления страницы (F5) данные не стерлись
     localStorage.setItem('user', JSON.stringify(this.user));

    // Сохраняем в ИМЕННОЙ ключ (для истории и восстановления данных именно этого номера)
    if (this.user?.phone) {
      localStorage.setItem(`profile_${this.user.phone}`, JSON.stringify(this.user));
    }

     console.log(`Профиль для номера ${this.user?.phone} успешно обновлен в Store и LocalStorage`);
  },

    // Этап 1: Отправка номера телефона, делаем запрос
    async sendSmsCode(phone) {
      try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST', // Метод запроса
          headers: { 'Content-Type': 'application/json' }, /* явно указываем серверу, что отправляем данные в формате JSON, иначе сервер может их проигнорировать,  то есть нужно указать 'Content-Type': 'application/json', «мета-информация» (тип данных, ключи доступа).*/
          body: JSON.stringify({ phone }) // Превращаем объект в строку, так как интернет-протоколы не умеют передавать живые объекты JavaScript , «полезная нагрузка» (сами данные, которые мы передаем).
        });

        if (!response.ok) throw new Error('Ошибка при отправке смс.'); /* Проверка ответа- когда сервер ответил, мы получаем объект response и проверяем if (!response.ok) - fetch не выдаст ошибку, если сервер ответил «401 Неверный код» или «500 Ошибка сервера». Он считает, что раз сервер хоть что-то ответил, то всё нормально. Поэтому мы вручную проверяем статус ответа (код от 200 до 299).*/

        // ВАЖНО: Переключаем на второй шаг (ввод СМС)
        this.authStep=2;

        return true; //флаг, который равен true, если код ответа от 200 до 299.
      } catch (error) {
        console.error(error);
        return false;
    }
  },

  // Этап 2: Проверка кода
  async verifyCode(phone, code) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code })
      });

      if (!response.ok) throw new Error('Неверный код.');

      const data = await response.json(); // Ответ от сервера приходит в виде «потока данных». Чтобы мы могли прочитать имя пользователя или токен, нам нужно превратить этот текстовый поток обратно в объект JavaScript.

      /* JSONPlaceholder возвращает только {id: 101, phone, code}. Поэтому мы вручную создаем имитацию токена и данных пользователя, в реальном проекте эти данные придут от сервера:*/
      const mockTocken = "fake-token-123";
      const mockUser = { 
        id: data.id, 
        name: "", 
        phone: phone // Сохраняем номер, который ввел юзер при входе
      }; 

      // Записываем в Store либо данные от сервера, либо наши "фейковые"
      this.token = data.token || mockTocken;
      this.user = data.user || mockUser;

       // Сохраняем в localStorage
      /* Сохраняем в браузере (Persistence) - Записываем полученный токен в localStorage и обновляем данные в Pinia Store.Зачем: Если мы просто закроем модальное окно, данные сотрутся при обновлении страницы. Запись в localStorage позволяет пользователю оставаться авторизованным даже после перезагрузки браузера.*/
      localStorage.setItem('token', this.token); /* Токен (например, JWT) сам по себе является текстовой строкой (набор случайных букв и цифр).localStorage умеет хранить только строки. Тк токен — это строка, не нужно его превращать в формат JSON. Мы сохраняем его «как есть».*/
      localStorage.setItem('user',JSON.stringify(this.user));

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } 
  },

  loadUserProfile(phone) {
    const savedProfile = localStorage.getItem(`profile_${phone}`);

    if (savedProfile && savedProfile !=="undefined") {
      this.user = JSON.parse(savedProfile);
      // Синхронизируем текущего активного пользователя
      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      // Инициализируем пустую структуру, если профиля еще нет в памяти
       // ВАЖНО: записываем в телефон переданный аргумент phone
      this.user = { 
        phone: phone,
        name: "",
        lastname: "",
        address: "",
        email: ""
      };
    }
  },

  logout() {
    // 1. Очищаем состояние в Pinia- для объектов (user) и токенов лучше использовать null. Это позволяет Vue и другим частям приложения четко понимать: «Данных нет», а не «Данные — это пустой текст».
    this.user = null;
    this.token = null;
    this.authStep = 1; // Возвращаем к вводу телефона

    // 2. Удаляем из памяти браузера ТОЛЬКО данные авторизации
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Добавляем: Очищаем массив заказов в корзине, чтобы интерфейс обнулился
    const cartStore = useCartStore();
    cartStore.orders = [];

     // 3. (Опционально) Закрываем окна и возвращаем на главную
    this.isAuthOpen = false;

    router.push('/');
  },

  toggleAuthModal(value) {
    this.isAuthOpen = value;
  },

  setLoading(status) { this.isLoading = status },
  setCity(city) { this.selectedCity = city },  
  },

});

