<template>
  <div class="backdrop" v-if="initLoad">
    <div class="loading-card">
        <svg class="loading" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
        <span class="loading-title">Initial User ID</span>  
    </div>
  </div>
  <div>
    
  </div>
  <div class="app-container">

    <div class="app-sidebar">
    </div>

    <div class="app-header">
        <input type="text">
    </div>

    <div class="app-content">
      <Inbox
        :card="card"
      />
      <Task
        :card="card"
      />
    </div>

    <div class="app-footer">
        <div class="footer-right">
          <div class="btn-action-menu">
            <template v-for="(row, i) in btn_action_footer.data" :key="i">
              <div :class="'btn-action-group ' + row.order">
                <span class="title-action display-none">{{ row.name }}</span>
                <button :class="row.class + ' ' + row.size" @click="actionFooter(row.type)">
                  <svg :width="row.svg.size[0]" :height="row.svg.size[1]" :viewBox="row.svg.size[3]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" :d="row.svg.d" :fill="row.svg.fill"/>
                  </svg>
                </button>
              </div>
            </template>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<script>
  
  import Inbox from './components/cards/Inbox/Inbox.vue';
  import Task from './components/cards/Task.vue';
  import { generateStr } from './assets/ts/string';

  let btnActionDefault = [
    { 
      order: 'icon-second',
      name: 'Task',      
      type: 'btn-task',
      class: 'btn-task',
      size: 'icon-size-child',
      svg: {
        d: 'M3.92984 4.40063H26.5614C27.9445 4.40063 29.076 5.53221 29.076 6.91526V23.2603C29.076 24.6433 27.9445 25.7749 26.5614 25.7749H3.92984C2.5468 25.7749 1.41522 24.6433 1.41522 23.2603V6.91526C1.41522 5.53221 2.5468 4.40063 3.92984 4.40063ZM3.9298 6.91528V23.2603H13.9883V6.91528H3.9298ZM26.5614 23.2603H16.5029V6.91528H26.5614V23.2603ZM25.3042 11.3158H17.7603V13.2018H25.3042V11.3158ZM17.7603 14.4591H25.3042V16.3451H17.7603V14.4591ZM25.3042 17.6024H17.7603V19.4883H25.3042V17.6024Z',
        fill: '#F8B76B',
        size: ['31', '31', '0 0 31 31']
      },
      visible: false, 
      enabled: false 
    },
    { 
      order: 'icon-first',
      name: 'Inbox', 
      type: 'btn-inbox',
      class: 'btn-inbox', 
      size: 'icon-size-child',
      svg: {
        d: 'M20.8187 2.51453H4.47368C3.78216 2.51453 3.21637 3.08032 3.21637 3.77184V21.3742L8.24561 16.3449H20.8187C21.5102 16.3449 22.076 15.7791 22.076 15.0876V3.77184C22.076 3.08032 21.5102 2.51453 20.8187 2.51453ZM19.5614 5.02908V13.8302H7.20201L6.46019 14.5721L5.73095 15.3013V5.02908H19.5614ZM24.5907 7.54381H27.1053C27.7968 7.54381 28.3626 8.10959 28.3626 8.80112V27.6608L23.3334 22.6315H9.50296C8.81144 22.6315 8.24565 22.0657 8.24565 21.3742V18.8596H24.5907V7.54381Z',
        fill: '#8885FF',
        size: ['31', '31', '0 0 31 31']
      },
      visible: false, 
      enabled: false 
    },
    { 
      order: 'icon-parent',
      name: '', 
      type: 'btn-expand',
      class: 'btn-expand',
      size: 'icon-size-parent',
      svg: {
        d: 'M12.4427 0.335868C13.3618 0.948573 13.6101 2.19031 12.9974 3.10937L5.73704 14H16C16.7376 14 17.4153 14.4059 17.7634 15.0563C18.1114 15.7066 18.0732 16.4957 17.6641 17.1094L8.33077 31.1094C7.71807 32.0284 6.47633 32.2768 5.55727 31.6641C4.63821 31.0514 4.38986 29.8096 5.00257 28.8906L12.263 18H2C1.26241 18 0.584692 17.594 0.236654 16.9437C-0.111384 16.2934 -0.0732391 15.5043 0.335902 14.8906L9.66924 0.890568C10.2819 -0.0284895 11.5237 -0.276837 12.4427 0.335868Z',
        fill: 'white',
        size: ['18', '32', '0 0 18 32']
      },
      visible: true, 
      enabled: true 
    }
  ];


  export default {
    components: {
      Inbox, Task
    },
    created () {
      this.initUser();
    },    
    data() {
        return {
            btn_action_footer: {
              temp: {
                order: [ 'icon-second', 'icon-first', '' ],
                class: ['btn-task', 'btn-inbox', 'btn-expand'],
                size: ['icon-size-child', 'icon-size-parent'],
                fill: ['#F8B76B', '#8885FF', 'white']
              },
              data: btnActionDefault
            },
            card: null,
            initLoad: false,
            id: localStorage.getItem('id-session')
        };
    },
    methods: {
      async initUser () {
        if (!this.id) {
          this.initLoad = true;
          let header = this.axiosHeader;
          header.headers['Content-Type'] = 'application/json';
          let str = generateStr(8);
          const post = {
            "firstName": "user_" + str, 
            "lastName": "dummy",
            "email": str + "@xhr.com"
          };
          await this.axios.post(Env.URL_API + 'user/create', post, header).then(({ data }) => {
            localStorage.setItem('id-session', data.id);
            location.reload();
          }).catch((error) => {
            this.initLoad = false;
            console.log(error);
          });
        }
      },
      actionFooter(type) {
        const LbtnActionFooter = this.btn_action_footer.data.length;
        document.getElementById('inboxMessage').className = 'card index-2 hidden';
        switch (type) {
            case 'btn-expand':
                this.card = '';                  
                for (let i = 0; i < LbtnActionFooter; i++) {
                    var btn = this.btn_action_footer.data[i];
                    if (btn.type !== type && btn.type !== 'btn-expand') {
                      btn.class = this.btn_action_footer.temp.class[i];
                      btn.svg.fill = this.btn_action_footer.temp.fill[i];
                      btn.size = 'icon-size-child';
                      btn.enabled = false;
                      if (btn.visible === false) {
                            btn.order = this.btn_action_footer.temp.order[i] + ' expand';
                            btn.visible = true;
                      } else {
                          btn.order = this.btn_action_footer.temp.order[i] + ' unexpand';
                          btn.visible = false;
                      }
                      this.showTitleAction(btn.visible);
                    }
                }
                break;
            case 'btn-inbox':
              let inboxClass = {
                class_open: 'btn-inbox open',
                fill_open: 'white'
              };
              this.actionOpenCard(type, inboxClass);
              break;
            case 'btn-task':
              let taskClass = {
                class_open: 'btn-task open',
                fill_open: 'white'
              };
              this.actionOpenCard(type, taskClass);
                break;
        }
      },
      showTitleAction (visible) {
          const titleAction = document.getElementsByClassName('title-action');
          let showClass = (visible === true) ? 'display-block' : 'display-none';
          for (let i = 0; i < titleAction.length; i++) {
              const element = titleAction[i];
              element.className = 'title-action ' + showClass;
          }
      },
      actionOpenCard (type, element) {
        const btnClass = element;
        let key = {
          obj: null,
          enable: false
        };
        this.card = '';
        for (let obj in this.btn_action_footer.data) {
          let index = this.btn_action_footer.data[obj];
          if (index.type !== 'btn-expand') {
            if (index.type === type) {
              if (index.enabled === true) {
                index.class = this.btn_action_footer.temp.class[obj];
                index.svg.fill = this.btn_action_footer.temp.fill[obj];
                index.size = 'icon-size-child';
                index.enabled = false;
                key.enable = true;
              } else {
                index.class = btnClass.class_open;
                index.svg.fill = btnClass.fill_open;
                index.order = this.btn_action_footer.temp.order[1] + ' expand';
                index.size = 'icon-size-parent';
                index.enabled = true;
                key.obj = obj;
                this.card = index.name;
              }
            } else {
              let numb = (obj > 0) ? (obj - 1) : obj;
              index.order = this.btn_action_footer.temp.order[numb] + ' expand';
              index.class = this.btn_action_footer.temp.class[obj] + ' mr-open';
              index.svg.fill = this.btn_action_footer.temp.fill[obj];
              index.size = 'icon-size-child';
              index.enabled = false;
            }
          }
        }

        // hidden title
        this.showTitleAction(key.enable);
        // set margin
        for (let obj in this.btn_action_footer.temp.class) {
          if (key.enable === true && this.btn_action_footer.temp.class[obj] !== key.obj) {
            this.btn_action_footer.data[obj].class = this.btn_action_footer.temp.class[obj];
          }
        }
      }
    }
  }
</script>