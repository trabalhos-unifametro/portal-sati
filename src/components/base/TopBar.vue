<script setup lang="ts">
import AccountCircle from "vue-material-design-icons/AccountCircle.vue";
import Logout from "vue-material-design-icons/Logout.vue";
import Key from "vue-material-design-icons/Key.vue";
import {session} from "@/stores/session";
import {useRouter} from 'vue-router'
import {getListNotifications, readNotifications} from "@/services/notification_service";
import {onMounted, ref, type Ref, type UnwrapRef} from "vue";
import type {NotificationItem} from "@/interfaces";
import {formatDate} from "@/utils";
import {SelectedNotification} from "@/stores/notifications";

const s = session()
const router = useRouter()
const selectedNotification = SelectedNotification()
const notifications: Ref<UnwrapRef<NotificationItem[]>> = ref([])
const wasNotRead: Ref<UnwrapRef<number>> = ref(0)
const intervalNotifications: Ref<UnwrapRef<number | undefined>> = ref(undefined)

const listNotifications = async () => {
  if (s.user?.id !== undefined) {
    await getListNotifications(s.user?.id).
    then(response => {
      notifications.value = []
      wasNotRead.value = 0

      const list: NotificationItem[] = response.data ?? []
      for (const item of list) {
        if (!item.read) wasNotRead.value++

        notifications.value.push({
          id: item.id,
          title: item.title,
          message: item.message,
          read: item.read,
          type: item.type,
          created_at: formatDate(item.created_at),
          patient_id: item?.patient_id,
          unit_id: item?.unit_id
        })
      }
    }).
    catch(err => console.log(err))
  }
}

const redirectNotification = async (notification: NotificationItem) => {
  if (s.user?.id !== undefined) {
    await readNotifications(s.user.id, notification.id).
    then(async () => {
      await listNotifications()
      if (notification.type.toUpperCase() === "PATIENT") {
        await router.push({name: 'patients'})
        selectedNotification.setPatientID(notification?.patient_id)
      } else if (notification.type.toUpperCase() === "UNIT" && notification?.unit_id !== undefined) {
        await router.push({name: 'unit', params: {id: notification?.unit_id}})
      } else if (notification.type.toUpperCase() === "UNIT" && notification?.unit_id === undefined) {
        await router.push({name: 'units'})
      }
    }).
    catch(err => console.log(err))
  }
}

const logOut = () => {
  s.logout();
  router.replace('/auth/login')
}

onMounted(async () => {
  if (intervalNotifications.value !== undefined) clearInterval(intervalNotifications.value)
  intervalNotifications.value = undefined
  await listNotifications()
  intervalNotifications.value = setInterval(listNotifications, 5000)
})

</script>

<template>
  <header class="top-appbar">
    <img src="/src/assets/images/logo-horizontal.png" alt="Hospital Medical Care"/>
    <div class="group-btns-header">
      <button type="button" class="btn-icon-header">
        <i class="bi-bell-fill text-white"></i>
        <div class="count-notifications" v-if="wasNotRead > 0">{{ wasNotRead }}</div>
        <div class="menu-notifications" v-if="notifications.length > 0">
          <div class="item-notification"
             v-for="(notification, index) in notifications"
             :key="`notification-${notification.id}-${index}`"
             :class="{ 'was-not-read': notification.read }"
             @click="redirectNotification(notification)"
          >
            <div class="item-notification-check"></div>
            <div class="item-notification-body">
              <div class="item-notification-message">
                <div v-html="notification.message"></div>
              </div>
              <div class="item-notification-footer">
                <span>{{ notification.read ? 'Lida' : 'Não lida' }}</span> <span>{{ notification.created_at }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-notifications" v-else>
          <div class="item-notification">
            <div class="item-notification-body">
              <div class="item-notification-message">
                <div class="w-100 text-center">Não há notificações.</div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button type="button" class="btn-icon-header">
        <i class="bi-person-fill text-white"></i>
        <div class="menu-user">
          <div class="header-menu">
            <div class="header-menu-prefix">
              <div class="header-menu-icon">
                <i class="bi-person-fill text-white"></i>
              </div>
            </div>
            <div class="header-menu-suffix">
              <div class="font-size-14px text-white">NOME DO USUÁRIO AQUI</div>
              <div class="font-size-12px text-white">função/cargo</div>
            </div>
          </div>
          <router-link :to="{ name: 'my-data' }" class="menu-item">
            <div class="menu-item-prefix">
              <account-circle size="30"></account-circle>
            </div>
            <div class="menu-item-suffix">
              <div class="font-size-14px">Meus dados</div>
              <div class="font-size-12px">Clique para visualizar seus dados</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'redefine-password' }" class="menu-item">
            <div class="menu-item-prefix">
              <div style="transform: rotate(-45deg)">
                <key size="25"></key>
              </div>
            </div>
            <div class="menu-item-suffix">
              <div class="font-size-14px">Alterar senha</div>
              <div class="font-size-12px">Clique para redefinir sua senha</div>
            </div>
          </router-link>
          <button type="button" @click="logOut()" class="menu-item">
            <div class="menu-item-prefix">
              <logout size="25"></logout>
            </div>
            <div class="menu-item-suffix">
              <div class="font-size-16px">Sair</div>
            </div>
          </button>
        </div>
      </button>
    </div>
  </header>
</template>
<style scoped></style>