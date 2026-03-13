<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const successMessage = ref(false);
const errors = reactive({})

const form = reactive({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  placeOfBirth: '',
  gender: 'Male',
  nationality: '',
  maritalStatus: '',
  settlementCamp: '',
  dateOfJoining: ''
})

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/beneficiaries/register', form)
    // alert('Beneficiary Registered Successfully!')
    successMessage.value = true
    // Reset form
    Object.keys(form).forEach(key => form[key] = key === 'gender' ? 'Male' : '')
  } catch (error) {
    alert('Error: ' + (error.response?.data?.error || 'Server error'))
  }
}
</script>

<template>
  <div class="registration-layout">
    <div class="left-panel">
      <div class="logo-wrapper">
        <img src="../assets/fca-logo.jpg" alt="FCA Logo" class="logo" />
      </div>
      <h2 class="program-title">Refugee Support Program</h2>
    </div>

    <div class="right-panel">

      <Transition name="slide">
        <div v-if="successMessage" class="success-toast">
          <span>Beneficiary registered successfully</span>
          <button @click="successMessage = false" class="close-toast">&times;</button>
        </div>
      </Transition>
      <h1 class="form-title">BENEFICIARY REGISTRATION FORM</h1>
      
      <form @submit.prevent="submitForm" class="registration-form">
        <div class="form-row">
          <div class="form-group">
            <label>First Name <span class="required">*</span></label>
            <input type="text" v-model="form.firstName" placeholder="Enter your First name" required />
          </div>
          <div class="form-group">
            <label>Last name <span class="required">*</span></label>
            <input type="text" v-model="form.lastName" placeholder="Enter your Last name" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Date of birth <span class="required">*</span></label>
            <input type="date" v-model="form.dateOfBirth" required />
          </div>
          <div class="form-group">
            <label>Place of Birth <span class="required">*</span></label>
            <input type="text" v-model="form.placeOfBirth" placeholder="Enter your place of residence" required />
          </div>
        </div>

        <div class="form-group full-width">
          <label>Gender</label>
          <div class="radio-group">
            <label><input type="radio" value="Male" v-model="form.gender" /> Male</label>
            <label><input type="radio" value="Female" v-model="form.gender" /> Female</label>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Nationality <span class="required">*</span></label>
            <select v-model="form.nationality" required>
              <option value="" disabled>-- Select Nationality --</option>
              <option value="Ugandan">Ugandan</option>
              <option value="Congolese">Congolese</option>
              <option value="South Sudanese">South Sudanese</option>
            </select>
          </div>
          <div class="form-group">
            <label>Marital status <span class="required">*</span></label>
            <select v-model="form.maritalStatus" required>
              <option value="" disabled>-- Select Marital status --</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Settlement camp <span class="required">*</span></label>
            <select v-model="form.settlementCamp" required>
              <option value="" disabled>-- Select settlement camp --</option>
              <option value="Bidi Bidi">Bidi Bidi</option>
              <option value="Nakivale">Nakivale</option>
              <option value="Kyangwali">Kyangwali</option>
            </select>
          </div>
          <div class="form-group">
            <label>Date of joining Settlement camp <span class="required">*</span></label>
            <input type="date" v-model="form.dateOfJoining" required />
          </div>
        </div>

        <div class="actions">
          <button type="submit" class="submit-btn">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>


.success-toast {
  background-color: #00B050; /* Exact green from screenshot 6 */
  color: white;
  padding: 12px 20px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.close-toast {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 0 5px;
}

.close-toast:hover {
  opacity: 0.8;
}

/* Transition animation for a smooth entrance */
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}


.registration-layout {
  display: flex;
  min-height: 100vh;
  font-family: sans-serif;
}

/* Left Panel Styling */
.left-panel {
  flex: 1;
  background-color: #97C73A;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.logo-wrapper {
  background: white;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.logo { width: 70%; }

/* Right Panel Styling */
.right-panel {
  flex: 2;
  padding: 50px;
  background: #fdfdfd;
}

.form-title {
  color: #3B5B28;
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.required { color: red; }

input, select {
  padding: 12px;
  border: 1px solid #B2D469;
  border-radius: 4px;
  font-size: 1rem;
}

.radio-group {
  display: flex;
  gap: 40px;
  padding: 10px;
  border: 1px solid #B2D469;
  border-radius: 4px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.submit-btn {
  background-color: #97C73A;
  color: white;
  border: none;
  padding: 12px 60px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.submit-btn:hover { background-color: #86b433; }
</style>