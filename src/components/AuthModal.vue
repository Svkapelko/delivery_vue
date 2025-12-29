<!-- components/AuthModal.vue -->
<script setup>
import { useAppStore } from "@/store/app-store";
import { ref } from "vue";
import { watch } from "vue";

const appStore = useAppStore();

const phoneNumber = ref("");
const smsCode = ref("");
const step = ref(1); // 1 - ввод телефона, 2 - ввод кода из СМС

/* Чтобы курсор всегда оказывался в конце (после +7 или введенных цифр) и пользователь не мог случайно начать писать перед плюсом, нужно использовать метод setSelectionRange. */
const moveCursorToEnd = (e) => {
  const el = e.target; // Устанавливаем курсор в самый конец текста
  console.log(el);

  //setTimeout нужен, чтобы браузер успел отрисовать текст перед перемещением курсора
  setTimeout(() => {
    const length = el.value.length;
    el.setSelectionRange(length, length);
  }, 0);
};
/* Метод setSelectionRange(selectionStart, selectionEnd) — это встроенный инструмент JavaScript для управления выделением текста внутри полей ввода (input и textarea). 
1. Как он работает технически
Этот метод принимает два числа:
selectionStart: Индекс символа, с которого начинается выделение.
selectionEnd: Индекс символа, на котором выделение заканчивается.
Если вы вводите разные числа, например (0, 3), браузер выделит (подсветит синим) первые три символа.

2. Секрет «эффекта курсора»
Если передать одинаковые числа в оба параметра, выделение превращается в обычную каретку (мигающую палочку курсора).
Когда мы пишем: el.setSelectionRange(length, length); Мы говорим браузеру: «Начни выделение на позиции №13 и закончи его на позиции №13». В итоге ничего не выделяется, а курсор просто перепрыгивает в эту точку.

3. Почему мы используем length?
Переменная length — это текущая длина всей строки в инпуте (например, "+7 9991234567" имеет длину 13 символов).
Символы в строке нумеруются с 0.
Позиция, равная длине строки (length), — это всегда место сразу после последнего символа.

Пример:
В строке +7 длина равна 3.
Индекс 0 — это +
Индекс 1 — это 7
Индекс 2 — это (пробел)
Индекс 3 — это пустое место сразу после пробела.
Именно туда мы и «приземляем» курсор.

Итог:
Эта строчка нужна для того, чтобы отобрать контроль у браузера. По умолчанию браузер может поставить курсор туда, куда кликнул пользователь (например, в начало или середину префикса +7). Но с помощью setSelectionRange(length, length) вы принудительно возвращаете пользователя в конец строки, чтобы он продолжал вводить номер правильно
*/

const handlePhoneInput = (e) => {
  // Берем то, что пользователь только что ввел в поле (через событие 'input')  Берем СТРОКУ из поля ввода
  const inputElement = e.target; // Ссылка на сам HTML-инпут
  let input = inputElement.value;
  console.log(input);

  /* .replace(/\D/g, "") — это регулярное выражение, оно находит всё, что НЕ является цифрой (буквы, пробелы, скобки) и заменяет это на "пустоту" (удаляет).*/
  let digits = input.replace(/\D/g, "");

  // Если первая цифра 7 или 8, мы её отрезаем. startsWith() — это встроенный метод строки в JavaScript, проверяет, начинается ли строка с определенных символов указанных в скобках.*/
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }

  // Формируем итоговую строку. Номер телефона (без кода страны) состоит из 10 цифр. Ограничиваем длину (10 цифр после +7)
  const result = digits.length > 0 ? "+7 " + digits.slice(0, 10) : "+7";

  //Принудительно обновляем значение в самом инпуте, чтобы стереть лишние цифры, которые ввел пользователь.
  inputElement.value =
    result; /* Мы напрямую говорим браузеру: «Забудь, что ввел пользователь, и напиши в поле вот эту строку». Это мгновенно удаляет 11-ю, 12-ю и все последующие цифры.*/

  // Обновляем реактивную переменную Vue
  phoneNumber.value = result;

  // Передвигаем курсор в конец после обновления значения
  moveCursorToEnd(e);
};

const preparePhone = (e) => {
  if (!phoneNumber.value) {
    phoneNumber.value = "+7";
  }
  // Передвигаем курсор в конец при фокусе
  moveCursorToEnd(e);
};

const handleSmsInput = (e) => {
  // Оставляем только цифры и ограничиваем длину до 4 символов
  const input = e.target;
  const cleanValue = input.value.replace(/\D/g, "").slice(0, 4);

  // Принудительно обновляем значение в инпуте и в переменной
  input.value = cleanValue;
  smsCode.value = cleanValue;
};

const handleAuth = () => {
  // Считаем только цифры, чтобы не зависеть от пробелов и плюса
  const digitsOnly = phoneNumber.value.replace(/\D/g, "").length;

  if (step.value === 1) {
    // Проверка для первого шага (ввод телефона)
    if (digitsOnly === 11) {
      step.value = 2; // Переходим к вводу кода
    } else {
      alert("Введите корректный номер телефона");
    }
  } else if (step.value === 2) {
    // Проверка для второго шага (ввод СМС-кода)
    const isOnlyDigits = /^\d+$/.test(
      smsCode.value
    ); /*.test(...) — это встроенная функция JavaScript. Она берет шаблон (регулярку) и применяет его к строке в скобках.*/
    if (smsCode.value.length === 4 && isOnlyDigits) {
      // Здесь будет логика авторизации через Store
      console.log("Авторизация успешна.");
      appStore.toggleAuthModal(false); // Закрываем окно
    } else {
      alert("Код должен состоять из 4 цифр.");
    }
  }
};

/* Следим за состоянием открытия модального окна в сторе,  Мы следим за свойством isAuthOpen в store,newValue — это новое состояние окна (стало открыто или стало закрыто) */
watch(
  () => appStore.isAuthOpen,
  (newValue) => {
    if (newValue === true) {
      phoneNumber.value = "";
      smsCode.value = "";
      step.value = 1;
    }
  }
);
</script>

<template>
  <transition name="fade">
    <!-- Используем appStore.isAuthOpen для управления видимостью -->
    <div
      v-if="appStore.isAuthOpen"
      @click.self="appStore.toggleAuthModal(false)"
      class="auth-overlay"
    >
      <div class="auth-content">
        <button @click="appStore.toggleAuthModal(false)" class="close-btn">
          &times;
        </button>

        <div class="auth-header">
          <h2>{{ step === 1 ? "Вход на сайт" : "Подтверждение" }}</h2>
          <p>
            {{
              step === 1
                ? "Введите свой номер телефона для входа"
                : "Мы отправили смс-код на " + phoneNumber
            }}
          </p>
        </div>

        <!-- по умолчанию (без .prevent): когда форма отправляется, браузер пытается перезагрузить страницу и отправить данные по адресу, указанному в атрибуте action, но мы хотим обработать данные не обновляя страницу, с помощью функции, кт мы написали -->
        <form @submit.prevent="handleAuth" class="auth-form">
          <!-- Шаг 1: Телефон -->
          <div v-if="step === 1" class="input-group">
            <input
              :value="phoneNumber"
              @input="handlePhoneInput"
              @focus="preparePhone"
              type="tel"
              pattern="\+7 \d{10}"
              placeholder="+7 999 111 11 11"
              required
              class="auth-input"
            />
          </div>
          <!-- Мы разделили v-model. Теперь значение в поле синхронизируется через :value, а функция handlePhoneInput обрабатывает каждый ввод, прежде чем обновить переменную. -->

          <!-- Шаг 2: Код из СМС -->
          <div v-if="step === 2" class="input-group">
            <input
              :value="smsCode"
              @input="handleSmsInput"
              type="text"
              inputmode="numeric"
              placeholder="1 1 1 1"
              maxlength="4"
              required
              class="auth-input code-input"
            />
          </div>

          <button type="submit" class="btn btn-primary auth-submit">
            {{ step === 1 ? "Получить смс-код" : "Войти" }}
          </button>
        </form>

        <p v-if="step === 1" class="auth-footer">
          Продолжая, Вы соглашаетесь с условиями пользования
        </p>

        <!-- одинарное равенство используется потому, что это не сравнение, а присваивание(=)
                Когда вы пишете @click="step = 1", вы даете команду: «Возьми переменную step и запиши в неё число 1» Это происходит в момент клика. Это меняет состояние приложения (вы перекидываете пользователя с шага ввода кода обратно на шаг ввода телефона).
                Когда вы пишете v-if="step === 1", вы задаете вопрос: «Правда ли, что сейчас step равен 1?» Это происходит постоянно (Vue следит за условием). Это ничего не меняет в данных, а просто проверяет их текущее состояние, чтобы решить — показывать блок или нет.-->
        <button v-else @click="step = 1" class="btn-link">
          Изменить номер
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.auth-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000; /* Самый высокий индекс */
  backdrop-filter: blur(4px);
}

.auth-content {
  background: white;
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
}

.auth-header h2 {
  margin-bottom: 10px;
  font-size: 24px;
}

.auth-header p {
  font-size: 14px;
  margin-bottom: 20px;
  color: #666;
}

.auth-input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 5px 10px 5px 10px;
  text-align: center;
  box-sizing: border-box;
  font-size: 18px;
  outline: none;
}

.auth-submit {
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  justify-content: center;
}
.auth-submit:hover {
  background: #40a9ff;
}

.auth-footer {
  font-size: 12px;
  color: #999;
  margin-top: 20px;
}

.btn-link {
  margin-top: 15px;
  color: #40a9ff;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}
</style>