<template>
  <RouterLink
    :to="`/repository/${props.id}`"
    :class="$style.card"
  >
    <div :class="$style.number">
      {{ props.number }}
    </div>
    <h3>{{ title }}</h3>
    <p>Last commit date: {{ calcDateCreation(props.pushedAt) }}</p>
    <p>★: {{ props.stargazerCount }}</p>
    <p :class="$style.description">
      <i>{{ props.description }}</i>
    </p>
    <div :class="$style.info">
      <div :class="$style.author">
        <div>
          <img :src="props.ownerAvatar" alt="" />
        </div>
        <p>{{ props.ownerName }}</p>
      </div>
      <img :src="git" alt="" />
    </div>
    <div :class="$style.img" />
    <div :class="$style.footer">
      <p> {{ props.url }}</p>
      <p>Date of creation: {{ calcDateCreation(props.createdAt) }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang='ts'>
import { RouterLink } from 'vue-router'
import git from '@/assets/img/git.png'
import { calcDateCreation } from '@/helpers/helpers'

const props = defineProps<{
  id: string;
  number: number;
  description: string;
  primaryLanguage: {
    color: string,
    name: string,
  }
  title: string;
  url: string;
  createdAt: string;
  pushedAt: string;
  ownerName: string;
  ownerAvatar: string;
  stargazerCount: number;
}>()
</script>

<style lang='scss' module>
.card {
  position: relative;
  cursor: pointer;
  padding: 15px;
  width: 615px;
  height: 440px;
  border-radius: 6px;
  background-color: #151414c5;
  color: beige;

  h3 {
    text-align: center;
    text-transform: capitalize;
    font-size: 25px;
  }

  p {
    text-align: right;
  }

  &:hover {
    border: solid 1px #943d9d;
    transform: scale(1.01);

    h3 {
      text-transform: uppercase;
      color: #f3aa4e;
    }
  }
}

.description {
  max-width: 50%;
  margin-left: auto;
  max-height: 12%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.number {
  position: absolute;
  top: 30%;
  left: 20%;
  rotate: 25deg;
  width: 50px;
  height: 50px;
  border: 2px solid #943d9d;
}

.info {
  margin-top: 20px;
  display: flex;
  align-items: flex-end;

  img {
    width: 50%;
  }
}

.author {
  width: 50%;
  height: fit-content;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 15px;

  div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #555555;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
}

.footer {
  position: absolute;
  right: 15px;
  bottom: 0;
  text-align: right;

  p:first-child {
    color: #f3aa4e;
  }
}
</style>