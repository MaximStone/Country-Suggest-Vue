<template>
  <div id="app">
    <CountrySuggest />
  </div>
</template>

<script>

import CountrySuggest from './components/Country-Suggest'
export default {
  name: 'app',
  components: {
    CountrySuggest
  }
}
</script>

<style>
#app {
    margin-top: 60px;
}
</style>
