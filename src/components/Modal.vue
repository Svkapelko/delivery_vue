<script setup>
    const props = defineProps({
        isOpen: Boolean,
    })

    const emit = defineEmits(['toggleModal']);
    const closeModal = () => emit('toggleModal')
</script>

<template>
    <div class="cart-modal__overlay" :class="{open: isOpen}" @click.self="closeModal()">
        <div class="cart-modal">
            <div class="cart-modal__header">
                <h2 class="cart-modal__header--title">Корзина</h2>
                <span class="cart-modal__header--close" @click="closeModal()">
                    <img src="../assets/images/icons/close.svg" alt="close">
                </span>
            </div>
            <div class="cart-modal__body">
                <div class="cart-item">
                    <p class="cart-item--title"> Ролл угорь стандарт</p>
                    <div class="cart-item__controls">
                        <div class="cart-item__controls--price">250 ₽</div>
                        <button class="btn btn-outline">+</button>
                        <div class="cart-item__controls--count">1</div>
                        <button class="btn btn-outline">-</button>
                    </div>
                </div>
                <div class="cart-item">
                    <p class="cart-item--title"> Ролл угорь стандарт</p>
                    <div class="cart-item__controls">
                        <div class="cart-item__controls--price">250 ₽</div>
                        <button class="btn btn-outline">+</button>
                        <div class="cart-item__controls--count">1</div>
                        <button class="btn btn-outline">-</button>
                    </div>
                </div>
                <div class="cart-item">
                    <p class="cart-item--title"> Ролл угорь стандарт</p>
                    <div class="cart-item__controls">
                        <div class="cart-item__controls--price">250 ₽</div>
                        <button class="btn btn-outline">+</button>
                        <div class="cart-item__controls--count">1</div>
                        <button class="btn btn-outline">-</button>
                    </div>
                </div>
                <div class="cart-item">
                    <p class="cart-item--title"> Ролл угорь стандарт</p>
                    <div class="cart-item__controls">
                        <div class="cart-item__controls--price">250 ₽</div>
                        <button class="btn btn-outline">+</button>
                        <div class="cart-item__controls--count">1</div>
                        <button class="btn btn-outline">-</button>
                    </div>
                </div>
                <div class="cart-item">
                    <p class="cart-item--title"> Ролл угорь стандарт</p>
                    <div class="cart-item__controls">
                        <div class="cart-item__controls--price">250 ₽</div>
                        <button class="btn btn-outline">+</button>
                        <div class="cart-item__controls--count">1</div>
                        <button class="btn btn-outline">-</button>
                    </div>
                </div>
            </div>
            <div class="cart-modal__footer">
                <div class="cart-modal__footer--price">
                    1250 ₽
                </div>
                <div class="cart-modal__footer--controls">
                    <button class="btn btn-primary">
                        Оформить заказ
                    </button>
                    <button class="btn btn-outline">
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .cart-modal__overlay {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
}

.cart-modal__overlay.open {
    display: flex; /* появится на странице если у него будет класс open */
}

.cart-modal {
    width: 100%; /*  ширина блока 100%, она дойдет до 780px и остановится, больше она быть не может, а меньше может*/
    max-width: 780px;
    padding: 40px 45px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
}

.cart-modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
}

.cart-modal__header--title {
    color: rgba(0, 0, 0, 1);
    font-size: 36px;
    font-weight: 700;
    line-height: 42px;
    margin: 0;
}

.cart-modal__header--close {
    cursor: pointer;
}

.cart-modal__footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 50px;
}

.cart-modal__footer--price {
    color: rgba(250, 250, 250, 1);
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
    border-radius: 5px;
    background: rgba(38, 38, 38, 1);
    padding: 15px 20px;
}

.cart-modal__footer--controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.cart-item:not(:last-child) {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(217, 217, 217, 1);
}

.cart-item--title {
    color: rgba(0, 0, 0, 1);
    font-size: 18px;
    font-weight: 400;
    line-height: 32px;
    margin: 0;
}

.cart-item__controls {
    display: flex;
    align-items: center;
}

.cart-item__controls--price {
    color: rgba(0, 0, 0, 1);
    font-size: 20px;
    font-weight: 700;
    line-height: 32px;
    margin-right: 47px;
}

.cart-item__controls--count {
    margin-right: 15px;
    margin-left: 15px;

}

.cart-item__controls button {
    box-sizing: border-box;
    border: 1px solid rgba(64, 169, 255, 1);
    border-radius: 2px;
    background:rgba(255, 255, 255, 1);
    color: rgba(64, 169, 255, 1);
}

</style>