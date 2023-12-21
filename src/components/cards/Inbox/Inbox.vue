<template>
    <InboxMessage 
        :loading="loadingMsg"
        :header="detailItem.header"
        :data="detailItem.data"
        @reload-data="getDetailInbox"
    />
    <div :class="'card ' + showCard">
        <div class="card-content">
            <div class="card-header">
                <div class="element-inline">
                    <input class="search-bar" placeholder="Search" v-model="search"/>
                    <button>
                        <img :src="'/icon/search_24px.svg'"/>
                    </button>
                </div>
            </div>
            <div class="card-body scroll">
                <div class="loading-card" v-if="loading">
                    <svg class="loading" viewBox="0 0 50 50">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg>
                    <span class="loading-title">Loading Chats...</span>  
                </div>

                <template v-for="(row, i) in item" :key="i">
                    <div class="list-inbox-group" @click="cardMessage(row, i)">
                        <div class="list-inbox">
                            <div class="inbox-icon-group" v-if="i % 2 === 0">
                                    <button class="secondary rounded-circle">
                                        <img src="/icon/person_gray.svg"/>
                                    </button>
                                    <button class="primary rounded-circle">
                                        <img src="/icon/person_white.svg"/>
                                    </button>
                                </div>
                            <button class="inbox-icon" v-else>
                                <!-- <span>F</span> -->
                                <img :src="row.owner.picture"/>
                            </button>
                            <div class="inbox-title">
                                <div class="inbox-people">
                                    {{ ((i % 2 === 0) ? row.image : row.id ) }}
                                </div>
                                <div class="inbox-time">{{ dateParser(row.publishDate, row.id) }}</div>
                            </div>
                            <div class="inbox-desc">
                                <div>
                                    <div class="inbox-name">{{ row.owner.firstName + ' ' + row.owner.lastName }} :</div>
                                    <div class="inbox-text">{{ row.text }} </div>
                                </div>
                                <div class="inbox-notify"></div>
                            </div>
                        </div>
                        <div class="line"></div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>

import InboxMessage from './InboxMessage.vue';
import { convertDate } from '../../../assets/ts/date';
import { inboxStore } from '../../../stores/inbox';

export default {
    components: { InboxMessage },
    name: 'Inbox',
    data () {
        return {
            item: [],
            detailItem: {
                data: [],
                header: {
                    id: null,
                    title: null,
                    total: 0
                }
            },
            loading: false,
            loadingMsg: false,
            search: null
        }
    },
    computed: {
        showCard () {
            if (this.card == 'Inbox') {
                this.getInbox();
                return 'show';
            } else {
                return 'hidden';
            }
        }
    },
    methods: {
        getInbox (limit = 6) {
            this.item = [];
            this.loading = true;
            setTimeout(async () => {
                await this.axios.get(
                    Env.URL_API + `post?limit=${limit}`, 
                    setHeaders
                ).then(({ data }) => {
                    let response = data.data;
                    this.item = response;
                    for (let obj in response) {
                        response[obj].image = (response[obj].image === '') ? 'Undefined Group' : response[obj].image;
                    }
                    this.loading = false;
                }).catch((error) => {
                    this.loading = false;
                    console.log(error);
                });
            }, 1000);
        },
        async getDetailInbox (row) {
            try {
                let param = {                
                    url: Env.URL_API + 'post/' + row.id + '/comment',
                    headers: setHeaders,
                    row: row
                }
                this.loadingMsg = true;
                this.detailItem.header.id = row.id;
                this.detailItem.header.title = row.header_name;
                this.detailItem.header.total = 0;
                this.detailItem.data = [];
                await inboxStore().getDetailInbox(param);
                if (inboxStore().error === 0) {
                    this.detailItem.data = inboxStore().detailInbox.data;
                    this.detailItem.header.total = inboxStore().detailInbox.header.total;
                }
                this.loadingMsg = false;                
            } catch {
                this.loadingMsg = false;
            }
        },
        async cardMessage (row, i) {
            document.getElementById('inboxMessage').className = 'card index-2 show';
            row.header_name = ((i % 2 === 0) ? row.image : row.id );
            await this.getDetailInbox(row);
            let objDiv = document.getElementById('chatBody');
            objDiv.scrollTop = objDiv.scrollHeight;
        },
        dateParser (date, id) {
            let format = 'en';
            if (id % 2 === 0) {
                format = 'number';
            }
            return convertDate(date, format);
        }
    },
    props: {
        card: {
          type: String,
          default: ''  
        }
    }
}

</script>