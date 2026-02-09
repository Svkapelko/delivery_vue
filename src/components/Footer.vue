<script setup>

</script>

<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-box">
                <router-link to="/" class="footer-logo logo">
                    <img src="../assets/images/logo.png" alt="logo">
                </router-link>
                <div class="footer-nav">
                    <ul>
                        <!-- Используем router-link для страниц внутри сайта -->
                        <li><router-link to="/for-restaurants">Ресторанам</router-link></li>
                        <li><router-link to="/for-couriers">Курьерам</router-link></li>
                        <li><router-link to="/press">Пресс-центр</router-link></li>
                        <li><router-link to="/contacts">Контакты</router-link></li>
                    </ul>
                </div>
                <div class="footer-social">
                    <!-- target="_blank" открывает в новой вкладке, rel="noopener" для безопасности -->
                    <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="../assets/images/social/inst.png" alt="INST">
                    </a>
                    <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="../assets/images/social/fb.png" alt="FB">
                    </a>
                    <a href="http://vk.com" target="_blank" rel="noopener noreferrer">
                        <img src="../assets/images/social/vk.png" alt="VK">
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
    .footer{
    min-height: 156px;
    display: flex;
    align-items: center;
    padding: 60px 0;
}

.footer-box {
    height: 100%;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    gap: 36px;
    flex-wrap: wrap; /* при уменьшении экрана строки будут переноситься в футере */
}

.footer-nav {
    flex-grow: 1; /* увеличивает ширину флекса - растягивает блок*/
}

.footer-nav ul {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0; 
    padding: 0;
    gap: 15px;
    flex-wrap: wrap;
    list-style: none;
}

.footer-nav a {
    text-decoration: none;
    transition: color 0.2s ease;
    color:rgba(89, 89, 89, 1);
    font-size: 18px;
    font-weight: 400;
}
.footer-nav a:hover {
    color:#1890ff;
}
.footer-social {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
}
.footer-social a {
    transition: transform 0.2s ease, opacity 0.2x ease;
}
.footer-social a:hover {
    transform: scale(1.1); /* Легкое увеличение иконок */
    opacity: 0.8;
}

</style>