<script setup lang="ts">
// import AccountMultiple from "vue-material-design-icons/AccountMultiple.vue";
import TooltipAccount from "vue-material-design-icons/TooltipAccount.vue";
import HospitalBox from "vue-material-design-icons/HospitalBox.vue";
import VDashboard from "vue-material-design-icons/ViewDashboard.vue";
import {computed, watch, ref, onMounted, type Ref, type UnwrapRef} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const index: Ref<UnwrapRef<number | null>> = ref(0)

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get () {
    return props.modelValue
  },

  set (value) {
    return emit('update:modelValue', value)
  }
})

const t = computed(() => route.name)

const selectedMenu = (menu: any) => {
  switch (menu) {
    case 'dashboard':
    case '/':
      index.value = 0;
      break
    case 'units':
    case 'unit':
    case 'medical-record-unit':
      index.value = 1;
      break
    case 'patients':
    case 'patient':
    case 'medical-record-patient':
      index.value = 2;
      break
    case 'users':
    case 'user':
      index.value = 3;
      break
    default:
      index.value = null;
  }
}

watch(t, (menu) => selectedMenu(menu))

onMounted(() => {
  selectedMenu(route.name)
})

</script>

<template>
  <div class="left-sidebar">
    <div class="left-sidebar-header">
      <i class="text-white" :class="{ 'bi-x': !model, 'bi-list': model }" @click="model = !model"></i>
    </div>
    <div class="w-100">
      <router-link to="/dashboard" class="left-sidebar-item" :class="{ 'active': index === 0 }">
        <v-dashboard size="30"></v-dashboard>
        <span class="fw-medium font-size-20px ms-3 label-menu">Dashboard</span>
      </router-link>
      <router-link to="/unidades" class="left-sidebar-item" :class="{ 'active': index === 1 }">
        <hospital-box size="30"></hospital-box>
        <span class="fw-medium font-size-20px ms-3 label-menu">Unidades</span>
      </router-link>
      <router-link to="/pacientes" class="left-sidebar-item" :class="{ 'active': index === 2 }">
        <tooltip-account size="30"></tooltip-account>
        <span class="fw-medium font-size-20px ms-3 label-menu">Pacientes</span>
      </router-link>
<!--      <router-link to="/usuarios" class="left-sidebar-item" :class="{ 'active': index === 3 }">-->
<!--        <account-multiple size="30"></account-multiple>-->
<!--        <span class="fw-medium font-size-20px ms-3 label-menu">Usuários</span>-->
<!--      </router-link>-->
    </div>
  </div>
</template>

<style scoped>

</style>