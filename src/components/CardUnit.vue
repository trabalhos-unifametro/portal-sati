<script setup lang="ts">

const props = defineProps({
  title: String,
  items: {
    type: Array<any>,
    default: []
  },
  progress: Number,
  unitId: Number
})

const returnOnlyThreeItems = (): Array<any> => {
  if (props.items?.length <= 3) {
    return props.items
  } else {
    return [props.items[0], props.items[1], props.items[2]]
  }
}
const returnPercent = (): string => {
  let percent: number = 0;
  if (props?.progress !== undefined) {
    if (!isNaN(props?.progress)) {
      if (props?.progress >= 0 && props?.progress <= 100) {
        percent = props?.progress;
      }
    }
  }
  return `${percent}%`;
}

</script>

<template>
  <router-link class="card card-units" :to="`/unidades/${props.unitId}`">
    <div class="card-units-header">
      <span class="font-size-22px fw-semibold">{{ props.title }}</span>
    </div>
    <div class="card-units-body">
      <div class="card-units-text">
        <span class="text-center font-size-14px"
              v-for="(item, index) in returnOnlyThreeItems()"
              :key="`item-card-unit-${index}`">
          <b>{{ item?.total }}</b><br/>
          {{ item?.label }}
        </span>
      </div>
      <div class="card-progress-bar">
        <div class="card-progress" :style="{ 'width': returnPercent() }">
          <span>
            {{ returnPercent() }}
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.card-units {
  border: none;
  border-left: 4px solid #1C6F77;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #fff;
    box-shadow: 0 2px 5px 2px rgba(0,0,0,0.1);
    transform: scale(1.01, 1.02);
  }

  .card-units-header {
    width: 100%;
    padding: 15px 10px;
    border-bottom: 2px solid #1C6F77;
  }

  .card-units-body {
    width: 100%;
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    .card-units-text {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .card-progress-bar {
      width: 100%;
      height: 25px;
      border-radius: 20px;
      background-color: #32CDD6;
      margin-top: 20px;

      .card-progress {
        height: 100%;
        border-radius: 20px;
        background-color: #1C6F77;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          color: #fff;
          font-weight: 700;
          font-size: 12px;
        }
      }
    }
  }
}
</style>