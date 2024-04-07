import {Commit, createStore, Store} from 'vuex'
import axios from 'axios'

const URL_FOR_SEARCH = 'https://jsonplaceholder.typicode.com/users'

export interface GeneralState {
  isLoading: boolean,
  selectedEmployee: User | null
  listEmployees: User[]
  errorNotification: string,
}

interface GeoLocation {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export const store: Store<GeneralState> = createStore({
  state (): GeneralState {
    return {
      isLoading: false,
      listEmployees: [],
      selectedEmployee: null,
      errorNotification: ''
    }
  },
  actions: {
    async getUserData ({state, commit}: {state: GeneralState, commit: Commit}, {searchData}: {searchData: string}): Promise<void> {
      try {
        if (state.isLoading) return

        commit('setLoading', true)
        const {data} = await axios.get(URL_FOR_SEARCH + searchData)
        if (!data?.length) {
          commit('setErrorMessage', 'Данные не найдены, проверьте корректность запроса')
          return
        }

        commit('setListEmployees', data)
      } catch (e) {
        commit('setErrorMessage', 'Произошла ошибка при загрузке данных')
      } finally {
        commit('setLoading', false)
      }
    },
    findAndSelectUser ({state, commit}: {state: GeneralState, commit: Commit}, {id}: {id: number}): void {
      const user = state.listEmployees.find(user => user.id === id)
      commit('setUser', user || null)
    }
  },
  mutations: {
    setListEmployees (state: GeneralState, newList: User[]): void {
      state.listEmployees = newList
    },
    setLoading (state: GeneralState, isLoading: boolean): void {
      state.isLoading = isLoading
    },
    setUser (state: GeneralState, selectedEmployee: User): void {
      state.selectedEmployee = selectedEmployee
    },
    setErrorMessage (state: GeneralState, errorText: string): void {
      state.errorNotification = errorText
    }
  }
})