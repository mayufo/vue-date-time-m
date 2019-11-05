<template>
  <div id="app">
    <DateTimeM/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DateTimeM from './components/DateTime.vue';

@Component({
  components: {
      DateTimeM,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
