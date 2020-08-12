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
            <Chart title="Total Covid Death" type="number" :loading="loading" :result-set="resultSet"/>
          </template>
        </query-builder>
      </div>
    </div>
    <br>
    <br>
    <div class="row">
      <div class="col-sm-6">
        <query-builder :cubejs-api="cubejsApi" :query="lineSexQuery">
          <template v-slot="{ loading, resultSet }">
            <Chart
              title="Covid Deaths by Sex"
              type="line"
              :loading="loading"
              :result-set="resultSet"
            />
          </template>
        </query-builder>
      </div>
      <div class="col-sm-6">
        <query-builder :cubejs-api="cubejsApi" :query="lineAgeQuery">
          <template v-slot="{ loading, resultSet }">
            <Chart
              title="Covid Deaths by Age Group"
              type="line"
              :loading="loading"
              :result-set="resultSet"
            />
          </template>
        </query-builder>
      </div>
      <div class="col-sm-6">
        <query-builder :cubejs-api="cubejsApi" :query="barMaleQuery">
          <template v-slot="{ loading, resultSet }">
            <Chart
              title="Male filtering of Covid 19 death by State"
              type="stackedBar"
              :loading="loading"
              :result-set="resultSet"
            />
          </template>
        </query-builder>
      </div>
      <div class="col-sm-6">
        <query-builder :cubejs-api="cubejsApi" :query="barFemaleQuery">
          <template v-slot="{ loading, resultSet }">
            <Chart
              title="Female filtering of Covid 19 death by State"
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
        measures: ["CovidTimeseries.totalDeath"],
        dimensions: [],
        filters: []      
      },
      covidDeathStateQuery: {
        measures: ["CovidTimeseries.covidDeath"],
         dimensions: [
          
        ],
        filters: []
      },
      lineSexQuery: {
        limit: 5,
        measures: ["CovidTimeseries.totalDeath"],
        dimensions: [
          "CovidTimeseries.sex",
          "CovidTimeseries.allCovidDeath"
        ],
        timeDimensions: []
      },
      lineAgeQuery: {
        limit: 10,
        measures: ["CovidTimeseries.totalDeath"],
        dimensions: [
          "CovidTimeseries.ageGroup",
          "CovidTimeseries.allCovidDeath"
        ],
        timeDimensions: [],
        order:{
          "CovidTimeseries.ageGroup": "asc"
        },
      },
      barMaleQuery: {
        limit: 50,
        measures: ["CovidTimeseries.totalDeath"],
        dimensions: [
          "CovidTimeseries.allCovidDeath",
          "CovidTimeseries.state"
          ],
        timeDimensions: [],
        order:{
          "CovidTimeseries.state": "asc"
        },
        filters: [
          {
            dimension: "CovidTimeseries.sex",
            operator: "equals",
            values: [
              "Male"
            ]
          }
        ]
      },
      barFemaleQuery: {
        limit: 50,
        measures: ["CovidTimeseries.totalDeath"],
        dimensions: [
          "CovidTimeseries.allCovidDeath",
          "CovidTimeseries.state"
          ],
        timeDimensions: [],
        order:{
          "CovidTimeseries.state": "asc"
        },
        filters: [
          {
            dimension: "CovidTimeseries.sex",
            operator: "equals",
            values: [
              "Female"
            ]
          }
        ]
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
