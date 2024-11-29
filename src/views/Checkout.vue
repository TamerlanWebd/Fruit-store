<style scoped>
.container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #343a40;
}

.form-label {
  font-weight: bold;
}

.form-control, .form-select {
  border-radius: 5px;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
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

.btn-outline-danger {
  color: #dc3545;
  border-color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}
</style>

<script setup>
import { ref } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

const genders = ["Мужчина", "Женщина"];
const countries = ["Казахстан", "Россия", "США"];
const deliveryMethods = ["Курьерская доставка", "Самовывоз", "Почтовая служба"];
const paymentMethods = ["Наличные", "Карта", "Онлайн-оплата"];


const form = ref({
  fullName: "",
  gender: "",
  country: "",
  address: "",
  phone: "",
  delivery: "",
  payment: "",
});

const submitOrder = () => {
  if (Object.values(form.value).some((field) => !field)) {
    alert("Please fill in all fields.");
    return;
  }

  const order = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: cartStore.cartList.map(item => ({
      ...item, 
      fullName: form.value.fullName,
      gender: form.value.gender,
      country: form.value.country,
      address: form.value.address,
      phone: form.value.phone,
      delivery: form.value.delivery,
      payment: form.value.payment
    })),
    total: cartStore.cartList.reduce((total, item) => total + item.price * item.count, 0),
  };

  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  existingOrders.push(order);
  localStorage.setItem("orders", JSON.stringify(existingOrders));

  alert("The order has been placed!");

  form.value = {
    fullName: "",
    gender: "",
    country: "",
    address: "",
    phone: "",
    delivery: "",
    payment: "",
  };

  cartStore.clearCart();
};

const cancelOrder = () => {
  if (confirm("Are you sure you want to cancel your order?")) {
    form.value = {
      fullName: "",
      gender: "",
      country: "",
      address: "",
      phone: "",
      delivery: "",
      payment: "",
    };
    cartStore.clearCart();
  }
};
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Оформление заказа</h1>
    <form @submit.prevent="submitOrder" class="mb-5">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="fullName" class="form-label">Ф.И.O</label>
          <input type="text" class="form-control" id="fullName" v-model="form.fullName" required />
        </div>
        <div class="col-md-6">
          <label for="gender" class="form-label">Пол</label>
          <select id="gender" class="form-select" v-model="form.gender" required>
            <option value="" disabled selected>Выбор пола</option>
            <option v-for="gender in genders" :key="gender" :value="gender">{{ gender }}</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="country" class="form-label">Страна</label>
          <select id="country" class="form-select" v-model="form.country" required>
            <option value="" disabled selected>Выбор страны</option>
            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="address" class="form-label">Адрес</label>
          <input type="text" class="form-control" id="address" v-model="form.address" required />
        </div>
        <div class="col-md-6">
          <label for="phone" class="form-label">Телефон</label>
          <input type="text" class="form-control" id="phone" v-model="form.phone" required />
        </div>
        <div class="col-md-6">
          <label for="delivery" class="form-label">Способ доставки</label>
          <select id="delivery" class="form-select" v-model="form.delivery" required>
            <option value="" disabled selected>Выбери способ</option>
            <option v-for="method in deliveryMethods" :key="method" :value="method">{{ method }}</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="payment" class="form-label">Способ покупки</label>
          <select id="payment" class="form-select" v-model="form.payment" required>
            <option value="" disabled selected>Выбери способ</option>
            <option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}</option>
          </select>
        </div>
        <div class="col-md-6 text-end">
          <h4>Конечная цена: {{ cartStore.cartList.reduce((total, item) => total + item.price * item.count, 0) }}$</h4>
        </div>
      </div>
      <div class="text-end mt-3">
        <button type="submit" class="btn btn-success me-2">Оплатить</button>
        <button type="button" class="btn btn-danger" @click="cancelOrder">Закрыть</button>
      </div>
    </form>

    <h3>Ваши товара</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Фото</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cartStore.cartList" :key="product.productId">
          <td>{{ product.name }}</td>
          <td><img :src="product.img" alt="..." class="img-thumbnail" /></td>
          <td>{{ product.price }}$</td>
          <td>
            <input
              type="number"
              class="form-control"
              :value="product.count"
              @input="cartStore.updateCountCart(product.productId, parseInt($event.target.value))"
            />
          </td>
          <td>
            <button class="btn btn-danger" @click="cartStore.deleteProduct(product.productId)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>