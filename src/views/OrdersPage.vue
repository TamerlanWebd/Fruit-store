<script setup>
import { ref } from "vue";

const orders = ref(JSON.parse(localStorage.getItem("orders")) || []);

const toggleOrderDetails = (order) => {
  order.showDetails = !order.showDetails;
};

const deleteOrder = (orderId) => {
  if (confirm("Are you sure you want to delete this order?")) {
    orders.value = orders.value.filter(order => order.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(orders.value));
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4 text-primary font-weight-bold">My Orders</h1>
    <div v-if="orders.length === 0">
      <p class="text-center text-muted">You have no orders yet.</p>
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="card shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5 class="card-title text-dark">Order #{{ order.id }}</h5>
              <p class="card-text text-muted">Date: {{ order.date }}</p>
              <p class="card-text text-muted">Total amount: <strong>{{ order.total }}$</strong></p>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-info" @click="toggleOrderDetails(order)">
                {{ order.showDetails ? "Hide details" : "Show details" }}
              </button>
              <button class="btn btn-danger" @click="deleteOrder(order.id)">
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </div>
          <div v-if="order.showDetails" class="mt-3">
            <h6 class="font-weight-bold text-dark">Items:</h6>
            <ul class="list-group">
              <li v-for="item in order.items" :key="item.productId" class="list-group-item d-flex justify-content-between">
                <span>{{ item.name }} - {{ item.count }} pieces</span>
                <span>{{ item.price }}$</span>
              </li>
              <h6>Customer Details:</h6>
            <ul class="list-group">
              <li class="list-group-item"><strong>Name:</strong> {{ order.items[0].fullName }}</li>
              <li class="list-group-item"><strong>Gender:</strong> {{ order.items[0].gender }}</li>
              <li class="list-group-item"><strong>Country:</strong> {{ order.items[0].country }}</li>
              <li class="list-group-item"><strong>Address:</strong> {{ order.items[0].address }}</li>
              <li class="list-group-item"><strong>Phone:</strong> {{ order.items[0].phone }}</li>
              <li class="list-group-item"><strong>Delivery:</strong> {{ order.items[0].delivery }}</li>
              <li class="list-group-item"><strong>Payment:</strong> {{ order.items[0].payment }}</li>
            </ul>
            </ul>
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
.card {
  border-radius: 10px;
  background-color: #f8f9fa;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.5rem;
  color: #333;
}

.card-text {
  font-size: 1rem;
}

/* Buttons */
.btn {
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
}

.btn-info {
  background-color: #17a2b8;
  color: #fff;
}

.btn-info:hover {
  background-color: #138496;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn:focus {
  box-shadow: none;
}

/* Header */
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #007bff;
}

h6 {
  font-size: 1.1rem;
  font-weight: bold;
}

.list-group-item {
  font-size: 1rem;
  color: #555;
}

.list-group-item span {
  font-weight: 600;
}
.mt-3 {
  margin-top: 1rem;
}

.mt-4 {
  margin-top: 2rem;
}

.text-muted {
  color: #6c757d;
}
</style>
