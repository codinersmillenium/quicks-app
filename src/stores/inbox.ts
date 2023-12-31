import { ref } from "vue";
import { defineStore } from "pinia";
import { convertDate } from "../assets/ts/date";
import sort from 'array-sort';

export interface Param {
  url: string,
  headers: Object,
  row: any
}

export const inboxStore = defineStore("inbox", () => {
  const detailInbox: any = ref({
    data: [],
    header: {
      total: 0
    }
  });
  const error = ref({});

  function getDetailInbox (param: Param) {
    detailInbox.value.data = [];
    error.value = 0;
    return this.axios.get(param.url, param.headers).then(({ data }) => {
        let response: any = data.data;
        for (let obj in response) {
            let index = response[obj];
            index.time = convertDate(index.publishDate, 'time');
            index.date = convertDate(index.publishDate, 'en', 'disabled');
        }
        sort(response, 'publishDate', '');
        let groupBy = response.reduce((hash, obj) => {
          if(obj['owner']['id'] === undefined) return hash; 
          return Object.assign(hash, { [obj['owner']['id']]:( hash[obj['owner']['id']] || [] ).concat(obj)})
        }, {});
        let groupByDate = response.reduce((hash, obj) => {
          if(obj['date'] === undefined) return hash; 
          return Object.assign(hash, { [obj['date']]:( hash[obj['date']] || [] ).concat(obj)})
        }, {});        
        detailInbox.value.data = groupByDate;
        detailInbox.value.header.total = Object.keys(groupBy).length;
    }).catch((err) => {
        error.value = 1;
        console.log(err);
    });
  }

  return {
    detailInbox,
    getDetailInbox,
    error
  };
});
