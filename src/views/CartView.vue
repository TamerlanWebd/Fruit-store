<style scoped>
.container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table {
  background-color: white;
  border-radius: 10px;
}

.table th,
.table td {
  vertical-align: middle;
}

.img-thumbnail {
  max-width: 100px;
}

.btn-primary, .btn-outline-danger {
  margin-right: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-outline-danger {
  color: #dc3545;
  border-color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}

.btn-outline-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-outline-success:hover {
  background-color: #218838;
  border-color: #218838;
}

h3 {
  color: #343a40;
}
</style>

<script setup>
import { useCartStore } from '@/stores/cart';
const cartStore = useCartStore();
</script>

<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Изображение</th>
              <th scope="col">Название</th>
              <th scope="col">Цена</th>
              <th scope="col">Количество</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody v-if="cartStore.cartList && cartStore.cartList.length">
            <tr v-for="(product, index) in cartStore.cartList" :key="product.productId">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <img :src="product.img" class="img-thumbnail" alt="Изображение товара"/>
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}$</td>
              <td>
                <input type="number" 
                       class="form-control" 
                       :value="product.count" 
                       @input="cartStore.updateCountCart(product.productId, parseInt($event.target.value))" />
              </td>
              <td>
                <button type="button" class="btn btn-outline-danger" @click="cartStore.deleteProduct(product.productId)">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-10 text-end">
        <button type="button" class="btn btn-outline-success btn-lg me-2" @click="$router.push('/checkout')">Перейти к оформлению</button>
      </div>
      <div class="col-md-2">
        <h3 class="text-end">Итого: ${{ cartStore.cartList.reduce((total, item) => total + item.price * item.count, 0) }}</h3>
      </div>
    </div>
  </div>
</template>
