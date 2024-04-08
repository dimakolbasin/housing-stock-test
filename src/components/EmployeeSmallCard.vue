<script setup lang="ts">
import {useStore} from 'vuex'
import {GeneralState} from '@/store'
import {computed} from "vue";

const store: GeneralState = useStore<GeneralState>()
const {id} = defineProps<{
  name: string
  email: string
  id: number
}>()

const selectedEmployee = computed(() => {
  return store.state.selectedEmployee
})

const selectUser = (): void => {
  if (selectedEmployee.value) {
    store.commit('setUser', null)
    return
  }

  store.dispatch('findAndSelectUser', {id})
}

</script>

<template>
  <div
      class="mb-4 border border-metal w-[240px] h-[70px] flex cursor-pointer rounded-lg"
      @click="selectUser"
  >
    <img src="../assets/images/img_70x70.png" class="h-full">
    <div class="border-l border-metal transition-colors duration-500 hover:bg-small-gray leading-4 pl-4 pt-4 w-full">
      <div class="font-montserrat-bold">{{name}}</div>
      <div class="max-w-[150px] overflow-hidden text-ellipsis">{{email}}</div>
    </div>
  </div>
</template>
