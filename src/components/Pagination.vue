<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    rows: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.rows / this.perPage)
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.currentPage === this.rows) {
        return this.rows - this.maxVisibleButtons;
      }
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = 1;
        i <= this.totalPages;
        i++
      ) {
        if ((this.currentPage+1) > this.totalPages) {
          if ((this.currentPage - 2) === i) {
            range.push({
              name: i,
              isActive: false
            });
          }
        } else if ((this.currentPage-1) === 0) {
          if ((this.currentPage + 2) === i) {
            range.push({
              name: i,
              isActive: false
            });
          }
        }
        if ((this.currentPage - 1) === i) {
          range.push({
            name: i,
            isActive: false
          });
        }
        if (this.currentPage === i) {
          range.push({
            name: i,
            isActive: true
          });
        }
        if ((this.currentPage + 1) === i) {
          range.push({
            name: i,
            isActive: false
          });
        }
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page: number) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    }
  }
});
</script>

<template>
  <ul class="pagination">
    <li>
      <button
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >
        <i class="bi-chevron-double-left"></i>
      </button>
    </li>

    <li>
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        <i class="bi-chevron-left"></i>
      </button>
    </li>

    <li
      v-for="page in pages"
      :key="page.name"
    >
      <button
        type="button"
        @click="onClickPage(page.name)"
        :class="{ 'active': page.isActive }"
        :disabled="page.isActive"
      >
        {{ page.name }}
      </button>
    </li>

    <li>
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        <i class="bi-chevron-right"></i>
      </button>
    </li>

    <li>
      <button
        type="button"
        @click="onClickLastPage"
        :disabled="isInLastPage"
      >
        <i class="bi-chevron-double-right"></i>
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  ul {
    &.pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        button {
          cursor: pointer;
          width: 35px;
          height: 35px;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
          border: none;

          &.active {
            background-color: #1C6F77;
            color: #fff;
          }
        }

        &:not(:first-child) {
          margin-left: 15px;
        }
      }
    }
  }
</style>