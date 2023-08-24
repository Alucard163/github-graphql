<template>
  <div :class="$style.arrow">
    <div
      :class="$style.left"
      @click="handlePage('left')"
    />
    <template v-for='elem in pagination' :key='elem'>
      <NumberPaginator
        :active="elem === currentPage"
        :elem="elem"
        @click="handlePage"
      />
    </template>

    <div
      :class="$style.right"
      @click="handlePage('right')"
    />
  </div>
</template>

<script setup lang='ts'>
import { defineProps, ref, defineEmits } from 'vue'
import NumberPaginator from '@/components/UI/Pagination/NumberPaginator.vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  sumRepo: number;
  searchValue?: string;
  searchParams: URLSearchParams;
  location: string;
  getList?: (quantityRepo: number) => Promise<void>;
}>()

const emit = defineEmits(['setSearchParams', 'setPageNumber'])

const route = useRoute();
const currentPage = ref(Number(route.params?.pageNumber) || 1);
const sumPage = ref(Math.min(Math.max(Math.ceil(props.sumRepo / 10), 1), 10))

const pagination = ref<number[]>([]);
for (let i = 1; i <= sumPage.value; i++) {
  pagination.value.push(i);
}

const handlePage = (direction: string | number) => {
  if (direction === "left" && currentPage.value > 1) {
    if (props.location === "search") {
      emit('setSearchParams',`search=${props.searchValue}&pageNumber=${currentPage.value - 1}`);
    } else if (props.location === "myRepo") {
      emit('setSearchParams',`pageNumber=${currentPage.value - 1}`);
    }
    emit('setPageNumber', currentPage.value - 1);
  } else if (direction === "right" && currentPage.value < sumPage.value) {
    if (props.location === "search") {
      emit('setSearchParams',`search=${props.searchValue}&pageNumber=${currentPage.value + 1}`);
    } else if (props.location === "myRepo") {
      emit('setSearchParams',`pageNumber=${currentPage.value + 1}`);
    }
    emit('setPageNumber', currentPage.value + 1);
  } else if (typeof direction === "number") {
    if (props.location === "search") {
      emit('setSearchParams',`search=${props.searchValue}&pageNumber=${direction}`);
    } else if (props.location === "myRepo") {
      emit('setSearchParams',`pageNumber=${direction}`);
    }
    emit('setPageNumber', direction);
  }
};
</script>

<style lang='scss' module>
@mixin Side($degree) {
  width: 13px;
  height: 13px;
  border: solid #f3aa4e;
  border-width: 0 3px 3px 0;
  background: none;
  transform: rotate($degree);
  -webkit-transform: rotate($degree);

  &:hover {
    transition: 0.3s;
    scale: 1.3;
  }

  &:active {
    transition: 0.01s;
    scale: 1;
  }
}

.arrow {
  cursor: pointer;
  margin: 50px auto;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 15px;
}

.right {
  @include Side(-45deg);
}

.left {
  @include Side(135deg);
}
</style>