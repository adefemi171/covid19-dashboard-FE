<template>
  <la-cartesian autoresize narrow stacked :data="values" :colors="colors" :padding="[30, 0, 5, 30]">
    <template v-for="metric in metrics">
      <la-bar :prop="metric" v-bind:key="metric" :width="3" :label="metric.split(',')[0]"></la-bar>
    </template>
    <la-y-axis :nbTicks="5" :format="v => parseFloat(v).toLocaleString()"></la-y-axis>
    <la-x-axis prop="x"  :interval="15"></la-x-axis>
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
