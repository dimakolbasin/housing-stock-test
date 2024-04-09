<script setup lang="ts">
import {useStore} from 'vuex'
import {computed, ref} from 'vue'
import EmployeeSmallCard from '@/components/EmployeeSmallCard.vue'
import {GeneralState} from '@/store'

const NUMERIC_LISTING_REGEX = /^(\d+,\s*)+(\d+)$/
const NUMERIC_REGEX = /^\d+$/
const ALPHABET_LISTING_REGEX = /^([a-zA-Z\s]+,\s)+[a-zA-Z\s]+$/
const ALPHABET_REGEX = /^[a-zA-Z\s]+$/

const searchValue = defineModel<string>()
const isFocus = ref(false)
const store: GeneralState = useStore<GeneralState>()


const findProcess = (): void => {
  if (!searchValue.value) {
    store.commit('setErrorMessage', 'Введите данные для поиска')
    return
  }

  if (searchValue.value?.endsWith(',')) {
    searchValue.value = searchValue.value.slice(0, -1)
  }

  switch (true) {
    case NUMERIC_REGEX.test(searchValue.value) || NUMERIC_LISTING_REGEX.test(searchValue.value):
      findByIdListing()
      break
    case ALPHABET_REGEX.test(searchValue.value) || ALPHABET_LISTING_REGEX.test(searchValue.value):
      findByNameListing()
      break
    default:
      store.commit('setErrorMessage', 'Введены некорректные данные поиска(Скорее всего Id + Имя в одном запросе)')
      break
  }
}

const listEmployees = computed(() => {
  return store.state.listEmployees
})

const processSearchData = (name: string): string => {
  const searchValueList = searchValue.value?.split(',') || []
  if (!searchValueList.length) return ''

  const queryParams = searchValueList.map(item => `${name}=${item.trim()}`).join('&')
  return '?' + queryParams
}

const changeStateFocus = (value: boolean): void => {
  isFocus.value = value
}

const findByIdListing = async (): Promise<void> => {
  store.dispatch('getUserData', {searchData: processSearchData('id')})
}

const findByNameListing = async (): Promise<void> => {
  store.dispatch('getUserData', {searchData: processSearchData('name')})
}

</script>

<template>
  <aside class="border-r border-white-gray pl-6 pt-7 w-[355px] h-full">
    <div class="font-montserrat-bold">Поиск сотрудников</div>

    <div class="flex items-center">
      <input
          v-model.trim="searchValue"
          class="border border-metal w-full text-[14px] my-6 py-3 pl-4 rounded-lg"
          type="text"
          placeholder="Введите Id или имя"
          @keyup.enter="findProcess"
          @focusin="changeStateFocus(true)"
          @focusout="changeStateFocus(false)"
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
      <div v-if="!isFocus && !listEmployees.length">Начните поиск</div>
      <template v-if="listEmployees.length">
        <transition-group name="list" tag="div" appear>
          <employee-small-card
              v-for="user in listEmployees"
              :key="user.id"
              :name="user.name"
              :email="user.email"
              :id="user.id"
          />
        </transition-group>
      </template>
      <div v-else-if="isFocus">Пока ничего не найдено</div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-move {
  transition: transform 0.5s ease;
}
</style>
