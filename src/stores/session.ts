import {defineStore} from 'pinia'
import {computed, type Ref, ref} from 'vue'
import { type UserSession } from "@/interfaces"

const convertSessionToInterface = (): Ref<UserSession | null> => {
    const sessionSati = localStorage.getItem('session-sati');
    const user: Ref<UserSession | null> = ref(null);
    if (sessionSati !== null) {
        try {
            user.value = JSON.parse(sessionSati)
        } catch (_) {
            user.value = null;
        }
    }
    return user;
}

export const session = defineStore('session', () => {
    const user: Ref<UserSession | null> = convertSessionToInterface()

    const isLoggedIn = computed(() => user.value !== null)

    function saveSession(newUser: UserSession) {
        user.value = newUser
        localStorage.setItem('session-sati', JSON.stringify(newUser))
    }

    function updateSession(newUser: UserSession) {
        user.value = newUser
        localStorage.setItem('session-sati', JSON.stringify(newUser))
    }

    function logout() {
        user.value = null
        localStorage.removeItem('session-sati')
        localStorage.clear()
    }

    return {
        user,
        isLoggedIn,
        logout,
        saveSession,
        updateSession,
    } as const
})
