<script setup>
import { ref } from 'vue'
import LandingPage from './components/LandingPage.vue'
import RegistrationForm from './components/RegistrationForm.vue'

const isLandingVisible = ref(true)
</script>

<template>
  <LandingPage 
    v-if="isLandingVisible" 
    @start-registration="isLandingVisible = false" 
  />
  <RegistrationForm v-else />
</template>

<style>

body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>