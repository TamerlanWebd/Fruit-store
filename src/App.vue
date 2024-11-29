<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand fw-bold text-primary">Магазин</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link text-primary active">Дом</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cart" class="nav-link text-primary">Корзина</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/orders" class="nav-link text-primary">Ваши заказы</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<RouterView />
</template>
<style>
body{
  background-color: wheat;
}</style>
<style scoped>
.navbar {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
}
.navbar-brand {
  font-size: 1.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.nav-link {
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: #0d6efd;
}
.nav-link.active {
  font-weight: bold;
  border-bottom: 2px solid #0d6efd;
}
</style>
