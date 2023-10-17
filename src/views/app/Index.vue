<script lang="ts">
import {defineComponent} from 'vue'
import VDashboard from 'vue-material-design-icons/ViewDashboard.vue'
import HospitalBox from 'vue-material-design-icons/HospitalBox.vue'
import TooltipAccount from 'vue-material-design-icons/TooltipAccount.vue'
import AccountMultiple from 'vue-material-design-icons/AccountMultiple.vue'
import { Tooltip } from 'bootstrap'

export default defineComponent({
  components: {
    VDashboard,
    HospitalBox,
    TooltipAccount,
    AccountMultiple
  },
  data: () => ({
    closeLeftSidebar: false,
  }),
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    })
  }
})

</script>

<template>
  <div class="layout-app" :class="{ 'closed-left-sidebar': closeLeftSidebar }">
    <div class="left-sidebar">
      <div class="left-sidebar-header">
        <i class="text-white" :class="{ 'bi-x': !closeLeftSidebar, 'bi-list': closeLeftSidebar }" @click="closeLeftSidebar = !closeLeftSidebar"></i>
      </div>
      <div class="w-100">
        <div class="left-sidebar-item active" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Dashboard">
          <v-dashboard size="30"></v-dashboard>
          <span class="fw-medium font-size-20px ms-3 label-menu">Dashboard</span>
        </div>
        <div class="left-sidebar-item" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Unidades">
          <hospital-box size="30"></hospital-box>
          <span class="fw-medium font-size-20px ms-3 label-menu">Unidades</span>
        </div>
        <div class="left-sidebar-item" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Pacientes">
          <tooltip-account size="30"></tooltip-account>
          <span class="fw-medium font-size-20px ms-3 label-menu">Pacientes</span>
        </div>
        <div class="left-sidebar-item" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Usuários">
          <account-multiple size="30"></account-multiple>
          <span class="fw-medium font-size-20px ms-3 label-menu">Usuários</span>
        </div>
      </div>
    </div>
    <header class="top-appbar">
      <img src="/src/assets/images/logo-horizontal.png" alt="Hospital Medical Care"/>
      <div class="group-btns-header">
        <div class="btn-icon-header">
          <i class="bi-bell-fill text-white"></i>
        </div>
        <div class="btn-icon-header">
          <i class="bi-person-fill text-white"></i>
        </div>
      </div>
    </header>
    <div class="content-app">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">

  .layout-app {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    .left-sidebar {
      width: 225px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: #1C6F77;

      .left-sidebar-header {
        height: 110px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 90px;

        i {
          cursor: pointer;
          transition: opacity 0.3s;

          &:hover {
            opacity: 0.6;
          }
        }
      }

      .w-100 {
        .left-sidebar-item {
          width: 100%;
          height: 65px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0 15px;
          cursor: pointer;
          color: #FFF;
          border-bottom: 1px solid #FFF;

          &.active {
            background-color: #FFF;
            color: #1C6F77;

            &:hover {
              background-color: #F3F3F3;
            }
          }

          &:hover {
            background-color: #004950;
          }
        }

      }
    }

    .top-appbar {
      position: absolute;
      height: 110px;
      top: 0;
      left: 225px;
      right: 0;
      background-color: #1C6F77;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 45px;

      .group-btns-header {
        display: flex;
        justify-content: space-between;
        width: 120px;

        .btn-icon-header {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 25px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          transition: all 0.3s;

          &:hover {
            border: 1px solid #fff;
          }
        }
      }
    }

    .content-app {
      margin-left: 225px;
      margin-top: 110px;
      padding: 30px 45px;
    }

    &.closed-left-sidebar {

      .left-sidebar {
        width: 110px;

        .left-sidebar-header {
          font-size: 60px;
        }

        .w-100 {
          .left-sidebar-item {
            justify-content: center;

            .label-menu {
              display: none;
            }
          }
        }
      }

      .top-appbar {
        left: 110px;
      }

      .content-app {
        margin-left: 110px;
      }
    }
  }
</style>