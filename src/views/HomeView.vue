<script setup>
import { useCategoryStore } from '@/stores/category';
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import { ref } from 'vue';

const productsStore = useProductStore();
const categoryStore = useCategoryStore();
const category = ref(null);
const searchText = ref("");
const products = ref([]);
products.value = productsStore.products;

const filterCategory = () => {
  products.value = productsStore.filterProductsByCategoryName(category.value, null);
};

const searchName = () => {
  category.value = null;
  products.value = productsStore.filterProductsByCategoryName(null, searchText.value);
};

const resetFilters = () => {
  category.value = null;
  searchText.value = '';
  products.value = productsStore.products;
};

const cartStore = useCartStore();
</script>

<template>
  <div class="container my-4">
    <div class="row mb-4">
      <div class="col-md-4">
        <select class="form-select" v-model="category" @change="filterCategory">
          <option value="" selected>Выбор категории</option>
          <option v-for="category in categoryStore.categories" :value="category" :key="category">{{ category }}</option>
        </select>
      </div>
      <div class="col-md-6">
        <input type="text" class="form-control" v-model="searchText" @input="searchName" placeholder="Название товара" />
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-danger w-100" @click="resetFilters">Очистить</button>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100 shadow-sm">
          <img :src="product.img" class="card-img-top" alt="Product image" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-muted">Category: {{ product.category }}</p>
            <p class="card-text fw-bold text-primary">${{ product.price }}</p>
            <p class="card-text text-muted">Date: {{ product.publish_at }}</p>
            <div class="mt-auto d-flex justify-content-between">
              <router-link :to="`/product/${product.id}`" class="btn btn-outline-info">Detail</router-link>
              <button class="btn btn-outline-success" @click="cartStore.addToCart(product.id)">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}
.form-select, .form-control {
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 0.375rem;
}
.btn {
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
}

.btn-outline-danger, .btn-outline-info, .btn-outline-success {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-outline-danger:hover, .btn-outline-info:hover, .btn-outline-success:hover {
  background-color: #dc3545;
  color: white;
}

.btn-outline-info:hover {
  background-color: #17a2b8;
}

.btn-outline-success:hover {
  background-color: #28a745;
}

/* Product Card Styles */
.card {
  border-radius: 10px;
  overflow: hidden;
}

.card-body {
  padding: 1.25rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.card-text {
  font-size: 1rem;
  color: #666;
}

.card-text.fw-bold {
  font-weight: 700;
  color: #007bff;
}

.card-footer {
  background-color: #f8f9fa;
}
@media (max-width: 768px) {
  .col-md-4, .col-md-6, .col-md-2 {
    margin-bottom: 15px;
  }

  .btn-outline-danger {
    width: 100%;
  }
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.card-img-top {
  object-fit: cover;
  height: 200px;
}
</style>
