<!-- components OrderSucessModal.vue -->
<script setup>
    import { useCartStore } from '@/store/cart';
    const cartStore = useCartStore();

    // Закрытие окна и сброс состояния заказа
    const close = () => {
        cartStore.lastOrderId = null;
    }
</script>

<template>
    <transition name="fade">
        <div v-if="cartStore.lastOrderId" class="modal-overlay" @click.self="close">
            <div class="modal-content">
                <div class="success-icon">✓</div>
                <h2>Заказ успешно оформлен!</h2>
                <p class="order-number">Номер Вашего заказа: {{ cartStore.lastOrderId }}</p>
                <p class="thanks-text">Спасибо, что выбрали нас. Мы уже начали готовить Ваш заказ...</p>
                <button class="btn btn-primary" @click="close">Отлично</button>
                <button @click="close" aria-label="Закрыть" class="close-btn">&times;</button>
            </div>
        </div>
    </transition>
</template>
<style scoped>
    .modal-overlay {
        position: fixed; /* Фиксирует лоадер на экране, он не уезжает при скролле */
        inset: 0; /* замена top/left/right/bottom: 0 */
        background: rgba(0, 0, 0, 0.6);
        display: flex;/* Включаем Flexbox, чтобы легко отцентрировать контент */
        justify-content: center; /* Центрируем по горизонтали */
        align-items: center;/* Центрируем по вертикали */
        z-index: 10000;/* Самый высокий индекс, чтобы быть поверх всех модалок и хедера */
        backdrop-filter: blur(4px);/* Эффект размытия заднего фона (блюр) */
    }

    .modal-content{
        position: relative;/* Обязательно для позиционирования крестика */
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .success-icon {
        width: 60px;
        height: 60px;
        background: #52c41a;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        margin: 0 auto 20px;
    }

    .order-number {
        font-size: 18px;
        margin: 15px 0;
    }

    .order-number span{
        font-weight: bold;
        color: #1890ff;
    }

    .thanks-text {
        color: #666;
        margin-bottom: 20px;
    }
    .btn {
        display: inline-block;
    }
    .close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        outline: none;
        border: none;
        font-size: 28px;
        color: #aaa;
        cursor: pointer;
        transition: color 0.2s;
        line-height: 1;
    }
    .close-btn:hover {
        color: #333;
    }
</style>