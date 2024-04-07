<script setup lang="ts">

import {onMounted} from 'vue'
import {useStore} from 'vuex'
const store = useStore()

defineProps<{
  message: string
}>()

onMounted(() => {
  setTimeout(() => {
    store.commit('setErrorMessage', '')
  }, 3000)
})

</script>

<template>
  <transition name="fade" mode="out-in" appear>
    <div
        v-if="message"
        class="fixed max-w-[400px] p-3 bg-red text-white text-center left-1/2 -translate-x-1/2 top-[50px] rounded-lg"
    >
      {{message}}
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
