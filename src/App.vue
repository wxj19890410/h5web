<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{margin:0;border:0;font-size: 12px;background-color:#F2F4F8;}
div{box-sizing: border-box;}
a{text-decoration:none; color:#2D5B94; }
.ellipsis{white-space: nowrap;text-overflow:ellipsis;overflow:hidden;}
.flex-between{
  display: flex;
  justify-content: space-between;
}
.flex-center{
  display: flex;
  justify-content: center;
}


</style>
