<template>
<v-app id="app">

    <v-main>
        <router-view />
    </v-main>
</v-app>
</template>

  
<script>
export default {
    name: 'App',
    data: () => ({

    }),
};
</script>
  
  
<style>
#app {
    background-color: rgba(240, 242, 245, 0.9);
}
</style>
