<script setup lang="ts">
import {useStore} from 'vuex'
import {GeneralState, User} from '@/store'
import {computed} from 'vue'

const store: GeneralState = useStore<GeneralState>()
const {user} = defineProps<{
  user: User
}>()

const selectedEmployee = computed(() => {
  return store.state.selectedEmployee
})

const selectUser = (): void => {
  if (selectedEmployee.value?.id === user.id) {
    store.commit('setUser', null)
    return
  }

  store.commit('setUser', user)
}

</script>

<template>
  <div
      class="mb-4 border border-metal w-[240px] h-[70px] flex cursor-pointer rounded-lg"
      @click="selectUser"
  >
    <img src="../assets/images/img_70x70.png" class="h-full">
    <div class="border-l border-metal transition-colors duration-500 hover:bg-small-gray leading-4 pl-4 pt-4 w-full">
      <div class="font-montserrat-bold">{{user.name}}</div>
      <div class="max-w-[150px] overflow-hidden text-ellipsis">{{user.email}}</div>
    </div>
  </div>
</template>
