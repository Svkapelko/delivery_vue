<!-- components/GlobalLoader.vue -->
<script setup>
    import { computed } from 'vue';
    import { useAppStore } from '@/store/app-store';
    import { useCartStore } from '@/store/cart';

    const appStore = useAppStore();
    const cartStore= useCartStore();

    // Логика текста: если окно входа закрыто и в корзине что-то есть — значит, это заказ
    const loadingText = computed(()=> {
        if (!appStore.isAuthOpen && cartStore.items.length > 0) {
            return "Оформляем Ваш заказ..."
        }
        return "Пожалуйста, подождите..."
    })

</script>

<template>
    <transition name="fade">
        <!-- Показываем, только если в сторе isLoading === true -->
        <div v-if="appStore.isLoading" class="global-loader">
            <div class="loader-content">
                <div class="spinner"></div>
                <p class="loader-text"> {{ loadingText }}</p>               
            </div>
        </div>
    </transition>
</template>

<style scoped>
    .global-loader {
        position: fixed; /* Фиксирует лоадер на экране, он не уезжает при скролле */
        inset: 0; /* замена top/left/right/bottom: 0 */
        background: rgba(255, 255, 255, 0.85);
        display: flex; /* Включаем Flexbox, чтобы легко отцентрировать контент */
        justify-content: center; /* Центрируем по горизонтали */
        align-items: center; /* Центрируем по вертикали */
        z-index: 9999; /* Самый высокий индекс, чтобы быть поверх всех модалок и хедера */
        backdrop-filter: blur(8px);/* Эффект размытия заднего фона (блюр) */
    }
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f0f0f0;     /* Цвет основной окружности (светло-серый) */
        border-top: 4px solid #40a9ff; /* Цвет «бегающей» части (синий) */
        border-radius: 50%; /* Делает из квадрата идеальный круг */
        margin: 0 auto 15px;  /* Центрируем сам спиннер и даем отступ вниз к тексту */
        animation: spin 0.8s linear infinite; /* Запуск анимации: 0.8 сек, равномерно, бесконечно */
    }
    @keyframes spin {
        to {
            transform: rotate(360deg); /* Поворачивает элемент на полный круг, используем только to, так как начальное состояние (0 градусов) подразумевается по умолчанию. Это делает код короче. */
        }
    }

    .loader-content {
        text-align: center;
        color: #333;
    }
    .loader-text {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .fade-enter-active, /*работает всё время, пока элемент появляется.*/
    .fade-leave-active { /* работает всё время, пока элемент исчезает.*/
        transition: opacity 0.3s ease; /* Анимация прозрачности за 0.3 сек, ease делает анимацию мягкой (плавное начало и конец). */
    }

    .fade-enter-from, /* точка "ноль". В этот миг элемент уже создан, но еще не виден. */
    .fade-leave-to { /* финальная точка. Когда прозрачность станет 0, Vue удалит элемент из DOM.*/
        opacity: 0; /* Элемент полностью прозрачен, По умолчанию элементы имеют opacity: 1, поэтому классы .fade-enter-to и .fade-leave-from обычно не указывают. Но логически они значат:.fade-enter-to: элемент стал на 100% видимым. .fade-leave-from: элемент начал исчезать из состояния 100% видимости.*/
    }
</style>