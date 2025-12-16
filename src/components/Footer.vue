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
                        <li>Ресторанам </li>
                        <li>Курьерам</li>
                        <li>Пресс-центр</li>
                        <li>Контакты</li>
                    </ul>
                </div>
                <div class="footer-social">
                    <img src="../assets/images/social/inst.png" alt="INST">
                    <img src="../assets/images/social/fb.png" alt="FB">
                    <img src="../assets/images/social/vk.png" alt="VK">
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
}

.footer-nav ul li {
    color:rgba(89, 89, 89, 1);
    font-size: 18px;
    font-weight: 400;
}

.footer-social {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
}

</style>