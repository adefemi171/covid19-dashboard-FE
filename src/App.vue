<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-4">
        <query-builder :cubejs-api="cubejsApi" :query="deathsQuery">
          <template v-slot="{ loading, resultSet }">
            <Chart title="Total Deaths" type="number" :loading="loading" :result-set="resultSet"/>
          </template>
        </query-builder>
      </div>
      <div class="col-sm-4">
        <query-builder :cubejs-api="cubejsApi" :query="covidDeathStateQuery">
          <template v-slot="{ loading, resultSet }">
            <Chart title="Covid Deaths by State" type="number" :loading="loading" :result-set="resultSet"/>
          </template>
        </query-builder>
      </div>
    </div>
    <br>
    <br>
    <div class="row">
      <div class="col-sm-6">
        <query-builder :cubejs-api="cubejsApi" :query="lineQuery">
          <template v-slot="{ loading, resultSet }">
            <Chart
              title="New Deaths"
              type="line"
              :loading="loading"
              :result-set="resultSet"
            />
          </template>
        </query-builder>
      </div>
      <div class="col-sm-6">
        <query-builder :cubejs-api="cubejsApi" :query="barQuery">
          <template v-slot="{ loading, resultSet }">
            <Chart
              title="Orders by State"
              type="stackedBar"
              :loading="loading"
              :result-set="resultSet"
            />
          </template>
        </query-builder>
      </div>
    </div>
  </div>
</template>

<script>
import cubejs from "@cubejs-client/core";
import { QueryBuilder } from "@cubejs-client/vue";

import Chart from "./components/Chart";


const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTYxNTc0NDYsImV4cCI6MTU5Nzg4NTQ0Nn0.yFj7B4rE5oSRGSQ9DbUW_vhtp1ljgjnZDpFE0A1eG5I",
  { apiUrl: `https://covid19-us-dashboard.herokuapp.com/cubejs-api/v1` }
);

export default {
  name: "App",
  components: {
    Chart,
    QueryBuilder
  },
 data() {
    return {
      cubejsApi,
      deathsQuery: { 
        measures: ["CovidTimeseries.count"],
        filters: [
          {
            "dimension": "CovidTimeseries.state",
            "operator": "contains",
            "values": [
              "A"
            ]
          }
        ]      
      },
      covidDeathStateQuery: {
        measures: ["CovidTimeseries.count"],
         dimensions: [
          "CovidTimeseries.state"
        ],
        filters: [ ]
      },
      lineQuery: {
        limit: 150,
        measures: ["CovidTimeseries.count"],
        dimensions: [
          "CovidTimeseries.sex"
        ],
        timeDimensions: [
          {
            dimension: "CovidTimeseries.dataAsOf",
            granularity: 'week',
            dateRange: "This month"
          }
        ]
      },
      barQuery: {
        limit: 50,
        measures: ["CovidTimeseries.count"],
        dimensions: ["CovidTimeseries.state"],
        timeDimensions: []
      }
    };
  }
};
</script>

<style>
html {
  -webkit-font-smoothing: antialiased;
}

body {
  padding-top: 30px;
  padding-bottom: 30px;
  background: #f5f6f7;
}
</style>
