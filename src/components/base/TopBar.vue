<script setup lang="ts">
import AccountCircle from "vue-material-design-icons/AccountCircle.vue";
import Logout from "vue-material-design-icons/Logout.vue";
import Key from "vue-material-design-icons/Key.vue";
</script>

<template>
  <header class="top-appbar">
    <img src="/src/assets/images/logo-horizontal.png" alt="Hospital Medical Care"/>
    <div class="group-btns-header">
      <button type="button" class="btn-icon-header">
        <i class="bi-bell-fill text-white"></i>
        <div class="menu-notifications">
          <div class="item-notification">
            <div class="item-notification-check"></div>
            <div class="item-notification-body">
              <div class="item-notification-message">
                <div>O paciente <b>PACIENTE 1</b> já atingiu o tempo previsto na <b>UTI 1</b>.</div>
              </div>
              <div class="item-notification-footer">
                <span>Não lida</span> <span>12/12/2023</span>
              </div>
            </div>
          </div>
          <div class="item-notification">
            <div class="item-notification-check"></div>
            <div class="item-notification-body">
              <div class="item-notification-message">
                <div>O paciente <b>PACIENTE 1</b> já atingiu o tempo previsto na <b>UTI 1</b>.</div>
              </div>
              <div class="item-notification-footer">
                <span>Não lida</span> <span>12/12/2023</span>
              </div>
            </div>
          </div>
          <div class="item-notification">
            <div class="item-notification-check"></div>
            <div class="item-notification-body">
              <div class="item-notification-message">
                <div>O paciente <b>PACIENTE 1</b> já atingiu o tempo previsto na <b>UTI 1</b>.</div>
              </div>
              <div class="item-notification-footer">
                <span>Não lida</span> <span>12/12/2023</span>
              </div>
            </div>
          </div>
          <div class="item-notification">
            <div class="item-notification-check"></div>
            <div class="item-notification-body">
              <div class="item-notification-message">
                <div>O paciente <b>PACIENTE 1</b> já atingiu o tempo previsto na <b>UTI 1</b>.</div>
              </div>
              <div class="item-notification-footer">
                <span>Não lida</span> <span>12/12/2023</span>
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
          <div class="menu-item">
            <div class="menu-item-prefix">
              <logout size="25"></logout>
            </div>
            <div class="menu-item-suffix">
              <div class="font-size-16px">Sair</div>
            </div>
          </div>
        </div>
      </button>
    </div>
  </header>
</template>
<style scoped></style>