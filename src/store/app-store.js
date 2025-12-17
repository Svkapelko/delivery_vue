// stores/app-store.js
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    isOpen: false,
    restaurants: [
      {
        id: 0,
        title: "Пицца плюс",
        time: 50,
        rating: 4.5,
        price: 900,
        type: "Пицца",
        img: "rest1.jpg",
      },
      {
        id: 1,
        title: "Тануки",
        time: 45,
        rating: 4.6,
        price: 850,
        type: "Суши",
        img: "rest2.jpg",
      },
      {
        id: 2,
        title: "FoodBand",
        time: 30,
        rating: 4.8,
        price: 1000,
        type: "Европейская еда",
        img: "rest3.jpg",
      },
      {
        id: 3,
        title: "Жадина-пицца",
        time: 45,
        rating: 4.7,
        price: 750,
        type: "Пицца",
        img: "rest4.jpg",
      },
      {
        id: 4,
        title: "Точка еды",
        time: 35,
        rating: 4.7,
        price: 500,
        type: "Европейская еда",
        img: "rest5.jpg",
      },
      {
        id: 5,
        title: "PizzaBurger",
        time: 50,
        rating: 4.9,
        price: 600,
        type: "Пицца, бургер",
        img: "rest6.jpg",
      },
    ],     
  }),

  actions: {
    toggleModal(value) { /* метод переключает переменную, принимает value и меняет состояние на то, кт мы ему передадим */
    this.isOpen = value /* обращаемся через контекст вызова this */
  },

    updateRestaurants(updatedRestaurants) {
      this.restaurants = updatedRestaurants;
    },
  },

  getters: {
    filteredByType: (state) => (type) =>
      state.restaurants.filter((r) => r.type === type),
  },
});

