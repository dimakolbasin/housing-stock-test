<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import AboutEmployee from '@/components/AboutEmployee.vue'

import {computed} from 'vue'
import {useStore} from 'vuex'
import Notification from "@/components/Notification.vue";

const store = useStore()

const selectedEmployee = computed(() => {
  return store.state.selectedEmployee
})

const errorNotification = computed(() => {
  return store.state.errorNotification
})


</script>

<template>
  <div class="mx-auto w-[1266px]">
    <notification :message="errorNotification" />
    <header class="h-[72px] flex justify-between items-center">
      <h1 class="font-montserrat-bold text-[32px] text-red" >Жилфонд</h1>
      <span>Пользователь</span>
    </header>
    <div class="border border-white-gray flex w-full h-[580px]">
      <sidebar />
      <div class="h-full w-full relative">
         <span
             v-if="!selectedEmployee"
             class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] text-gray"
         >
           Выберите сотрудника, чтобы посмотреть его профиль
         </span>
        <about-employee
            v-else
            :name="selectedEmployee.name"
            :email="selectedEmployee.email"
            :phone="selectedEmployee.phone"
        />
      </div>
    </div>
  </div>
</template>
