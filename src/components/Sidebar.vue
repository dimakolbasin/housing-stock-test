<script setup lang="ts">
import {useStore} from 'vuex'
import {computed} from 'vue'
import EmployeeSmallCard from '@/components/EmployeeSmallCard.vue'

const numericListingRegex = /^(\d+,\s*)+(\d+)$/
const numericRegex = /^\d+$/
const alphabetListingRegex = /^([a-zA-Z\s]+,\s)+[a-zA-Z\s]+$/
const alphabetRegex = /^[a-zA-Z\s]+$/

const searchValue = defineModel<string>()
const store = useStore()


const findProcess = () => {
  switch (true) {
    case numericRegex.test(searchValue.value) || numericListingRegex.test(searchValue.value):
      findByIdListing()
      break
    case alphabetRegex.test(searchValue.value) || alphabetListingRegex.test(searchValue.value):
      findByNameListing()
      break
    default:
      store.commit('setErrorMessage', 'Введены некорректные данные поиска(Скорее всего Id + Имя в одном запросе)');
      break
  }
}

const listEmployees = computed(() => {
  return store.state.listEmployees
})

const processSearchData = (name: string) => {
  const arr = searchValue.value.split(',')
  const queryParams = arr.map(item => `${name}=${item.trim()}`).join('&')
  return '?' + queryParams
}

const findByIdListing = async () => {
  store.dispatch('getUserData', {searchData: processSearchData('id')})
}

const findByNameListing = async () => {
  store.dispatch('getUserData', {searchData: processSearchData('name')})
}

</script>

<template>
  <aside class="border-r border-white-gray pl-6 pt-7 w-[355px] h-full">
    <div class="font-montserrat-bold">Поиск сотрудников</div>

    <div class="flex items-center">
      <input
          v-model="searchValue"
          class="border border-metal w-full text-[14px] my-6 py-3 pl-4 rounded-lg"
          type="text"
          placeholder="Введите Id или имя"
          autofocus
          @keyup.enter="findProcess"
      >

      <button
          class="border border-metal transition-colors duration-500 hover:bg-small-gray w-[70px] h-[48px] mx-1 rounded-lg"
          @click="findProcess"
      >
        Go
      </button>
    </div>

    <div class="font-montserrat-bold mb-2">Результаты</div>
    <div class="max-h-[400px] overflow-auto text-[14px]">
      <div v-if="!searchValue">Начните поиск</div>
      <template v-else>
        <template v-if="listEmployees.length">
          <transition-group name="list" tag="div" appear>
            <employee-small-card
                v-for="user in listEmployees"
                :key="user.name"
                :name="user.name"
                :email="user.email"
                :id="user.id"
            />
          </transition-group>
        </template>
        <div v-else>Ничего не найдено</div>
      </template>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-move {
  transition: transform 1.5s ease;
}
</style>
