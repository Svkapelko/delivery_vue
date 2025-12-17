import { restArray } from "@/constants/rests";
import { reactive } from "vue";

export const store = reactive({
  isOpen: false,
  rests: restArray,
  toggleModal(value) { /* метод переключает переменную, принимает value и меняет состояние на то, кт мы ему передадим */
    this.isOpen = value /* обращаемся через контекст вызова this */
  }
})

 /* лучше использовать pinia */