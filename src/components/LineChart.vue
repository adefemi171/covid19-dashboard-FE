<template>
  <la-cartesian autoresize :data="values" :colors="colors" :padding="[20, 20, 20, 20]">
    <la-line curve :width="1" color="#7DB3FF" :prop="metrics[0]"/>
    <la-y-axis :nbTicks="5"></la-y-axis>
    <la-x-axis prop="x" :interval="30"></la-x-axis>
    <la-tooltip/>
  </la-cartesian>
</template>

<script>

export default {
  name: "LineChart",
  props: {
    values: Array,
    metrics: Array
  },

  data() {
    return {
      colors: [
        "#7DB3FF",
        "#49457B",
        "#FF7C78",
        "#FED3D0",
        "#6F76D9",
        "#9ADFB4",
        "#2E7987"
      ]
    };
  }
};
</script>

<style scoped>
</style>
