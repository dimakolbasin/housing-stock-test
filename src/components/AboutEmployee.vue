<script setup lang="ts">
defineProps<{
  name: string
  email: string
  phone: string
}>()

</script>

<template>
  <div class="flex h-[286px] ml-5 mt-6">
    <img src="../assets/images/img_245x286.png" class="h-full mr-14 main-photo">
    <div>
      <div class="font-montserrat-bold mb-3">{{ name }}</div>
      <div class="mb-3">
        <span class="font-montserrat-bold mr-3">Email:</span>
        <span>{{ email }}</span>
      </div>
      <div class="mb-3">
        <span class="font-montserrat-bold mr-3">Phone:</span>
        <span>{{ phone }}</span>
      </div>
      <div class="h-[420px] overflow-auto">
        <div class="font-montserrat-bold mb-3">О себе:</div>
        <span class="max-h-[490px] overflow-hidden text-ellipsis">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
      </div>
    </div>
  </div>
</template>
