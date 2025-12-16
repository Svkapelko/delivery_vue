<script setup>


</script>

<template>
    <main class="main">
        <section class="banner">
            <div class="container">
                <div class="banner-item">
                    <h2 class="banner-item--title">Онлайн-сервис <br> доставки еды на дом</h2>
                    <p class="banner-item--subtitle">Блюда из любимого ресторана привезет курьер в перчатках, маске и с
                        антисептиком</p>
                </div>
            </div>
        </section>
        <section class="products">
            <div class="container">
                <div class="products-header">
                    <h3 class="products-header--title">Рестораны</h3>
                    <input type="text" placeholder="Поиск блюд и ресторанов" class="products-header--search">
                </div>
                <div class="products-wrapper" id="rests-container">
                    <router-link to="/rest" class="products-card" >
                        <div class="products-card_image">
                            <img src="../src/assets/images/rests/rest1.jpg" alt="rest1">
                        </div>
                        <div class="products-card_description">
                            <div class="products-card_description--row">
                                <h4 class="products-card_description--title">Пицца плюс</h4>
                                <div class="products-card_description--badge">50мин</div>
                            </div>
                            <div class="products-card_description--row">
                                <div class="products-card_description--info">
                                    <div class="products-card_description--rating">
                                        <img src="../src/assets/images/icons/star.svg" alt="star">
                                        4.5
                                    </div>
                                    <div class="products-card_description--price">
                                        От 900 ₽
                                    </div>
                                    <div class="products-card_description--group">
                                        Пицца
                                    </div>
                                </div>
                            </div>

                        </div>
                    </router-link>
                    <router-link to="/rest" class="products-card">
                        <div class="products-card_image">
                            <img src="../src/assets/images/rests/rest2.jpg" alt="rest2">
                        </div>
                        <div class="products-card_description">
                            <div class="products-card_description--row">
                                <h4 class="products-card_description--title">Тануки</h4>
                                <div class="products-card_description--badge">45мин</div>
                            </div>
                            <div class="products-card_description--row">
                                <div class="products-card_description--info">
                                    <div class="products-card_description--rating">
                                        <img src="../src/assets/images/icons/star.svg" alt="star">
                                        4.6
                                    </div>
                                    <div class="products-card_description--price">
                                        От 850 ₽
                                    </div>
                                    <div class="products-card_description--group">
                                        Суши
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/rest" class="products-card">
                        <div class="products-card_image">
                            <img src="../src/assets/images/rests/rest3.jpg" alt="rest3">
                        </div>
                        <div class="products-card_description">
                            <div class="products-card_description--row">
                                <h4 class="products-card_description--title">FoodBand</h4>
                                <div class="products-card_description--badge">30мин</div>
                            </div>
                            <div class="products-card_description--row">
                                <div class="products-card_description--info">
                                    <div class="products-card_description--rating">
                                        <img src="../src/assets/images/icons/star.svg" alt="star">
                                        4.8
                                    </div>
                                    <div class="products-card_description--price">
                                        От 1000 ₽
                                    </div>
                                    <div class="products-card_description--group">
                                        Европейская еда
                                    </div>
                                </div>
                            </div>

                        </div>
                    </router-link>
                    <router-link to="/rest" class="products-card">
                        <div class="products-card_image">
                            <img src="../src/assets/images/rests/rest4.jpg" alt="rest4">
                        </div>
                        <div class="products-card_description">
                            <div class="products-card_description--row">
                                <h4 class="products-card_description--title">Жадина-пицца</h4>
                                <div class="products-card_description--badge">45мин</div>
                            </div>
                            <div class="products-card_description--row">
                                <div class="products-card_description--info">
                                    <div class="products-card_description--rating">
                                        <img src="../src/assets/images/icons/star.svg" alt="star">
                                        4.7
                                    </div>
                                    <div class="products-card_description--price">
                                        От 750 ₽
                                    </div>
                                    <div class="products-card_description--group">
                                        Пицца
                                    </div>
                                </div>
                            </div>

                        </div>
                    </router-link>
                    <router-link to="/rest" class="products-card">
                        <div class="products-card_image">
                            <img src="../src/assets/images/rests/rest5.jpg" alt="rest5">
                        </div>
                        <div class="products-card_description">
                            <div class="products-card_description--row">
                                <h4 class="products-card_description--title">Точка еды</h4>
                                <div class="products-card_description--badge">35мин</div>
                            </div>
                            <div class="products-card_description--row">
                                <div class="products-card_description--info">
                                    <div class="products-card_description--rating">
                                        <img src="../src/assets/images/icons/star.svg" alt="star">
                                        4.7
                                    </div>
                                    <div class="products-card_description--price">
                                        От 500 ₽
                                    </div>
                                    <div class="products-card_description--group">
                                        Европейская еда
                                    </div>
                                </div>
                            </div>

                        </div>
                    </router-link>
                    <router-link to="/rest" class="products-card">
                        <div class="products-card_image">
                            <img src="../src/assets/images/rests/rest6.jpg" alt="rest6">
                        </div>
                        <div class="products-card_description">
                            <div class="products-card_description--row">
                                <h4 class="products-card_description--title">PizzaBurger</h4>
                                <div class="products-card_description--badge">50мин</div>
                            </div>
                            <div class="products-card_description--row">
                                <div class="products-card_description--info">
                                    <div class="products-card_description--rating">
                                        <img src="../src/assets/images/icons/star.svg" alt="star">
                                        4.9
                                    </div>
                                    <div class="products-card_description--price">
                                        От 600 ₽
                                    </div>
                                    <div class="products-card_description--group">
                                        Пицца, бургер
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped></style>