<template>
    <div class="card index-2 hidden" id="inboxMessage">
        <div class="card-content m-0">
            <div class="card-header border-bottom-gray-1 between">
                <div class="chat-header">
                    <div class="flex-row flex-start">
                        <button class="btn-arrow-back" @click="close"></button>
                        <div class="chat-title">
                            <div class="p-bold-primary-1">{{ header.title }}</div>
                            <div class="p-regular-secondary-3" v-if="header.total > 0 && header.type_chat === 'group'">{{ header.total }} Participant</div>
                        </div>
                    </div>
                    <button class="btn-close-chat" @click="close"></button>
                </div>
            </div>
            <div class="card-body">
               <div class="chat-content">
                    <div class="chat-body" id="chatBody">
                        <template v-for="(_row, _i) in data" :key="_i">
                            <template v-for="(row, i) in _row" :key="i">
                                <div class="flex-row flex-end" data-id="1" v-if="row.owner.id === id_sess">
                                    <div class="chat right">
                                        <div class="chat-name right">
                                            You
                                        </div>
                                        <div class="chat-desc">
                                            <button class="btn-chat-edit" @click="showEditDropdown($event, 'edit-msg-' + i)">
                                                <img src="/icon/btn_edit_msg.svg"/>
                                                <div class="dropdown-contet none" :id="'edit-msg-' + i">
                                                    <a class="edit" @click="editMessage(row)">
                                                        <span>Edit</span>
                                                    </a>
                                                    <hr/>
                                                    <a class="delete" @click="deleteMessage(row.id)">
                                                        <span>Delete</span>
                                                    </a>
                                                </div>
                                            </button>
                                            <div class="chat-card right">
                                                <div class="chat-text">
                                                    {{ row.message }}
                                                </div>
                                                <div class="chat-time">
                                                    {{ row.time }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-row flex-start" v-else>
                                    <div class="chat left">
                                        <div class="chat-name left" :style="((header.type_chat === 'person') ? 'color: #2F80ED' : '')">
                                            {{ row.owner.firstName }}
                                        </div>
                                        <div class="chat-desc">
                                            <div class="chat-card left" :style="((header.type_chat === 'person') ? 'background-color: #F8F8F8' : '')">
                                                <div class="chat-text">
                                                    {{ row.message }}
                                                </div>
                                                <div class="chat-time">
                                                    {{ row.time }}
                                                </div>
                                            </div>
                                            <button class="btn-chat-edit" @click="showEditDropdown($event, 'reply-msg-' + i)">
                                                <img src="/icon/btn_edit_msg.svg"/>
                                                <div class="dropdown-contet left none" :id="'reply-msg-' + i">
                                                    <a class="edit">
                                                        <span>Share</span>
                                                    </a>
                                                    <hr/>
                                                    <a class="edit">
                                                        <span>Reply</span>
                                                    </a>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="row col-12 mbmt-15" v-if="_row.length > 0">
                                <div class="col-4">
                                    <hr class="line-gray-1"/>
                                </div>
                                <div class="col-4 text-center fs-3 fs-bold fs-gray-4">
                                    Today {{ _i }}
                                </div>
                                <div class="col-4">
                                    <hr class="line-gray-1"/>
                                </div>
                            </div>
                        </template>

                        <!-- fixed element -->
                        <div class="row col-12 mbmt-15">
                            <div class="col-4">
                                <hr class="line-red-1"/>
                            </div>
                            <div class="col-4 text-center fs-3 fs-bold fs-red-1">
                                New Message
                            </div>
                            <div class="col-4">
                                <hr class="line-red-1"/>
                            </div>
                        </div>

                        <div class="flex-row flex-start">
                            <div class="chat left">
                                <div class="chat-name left new">
                                    Template New Message
                                </div>
                                <div class="chat-desc">
                                    <div class="chat-card left new">
                                        <div class="chat-text">
                                            if new message ( no dynamic, but service not support)
                                        </div>
                                        <div class="chat-time">
                                            12.00
                                        </div>
                                    </div>
                                    <button class="btn-chat-edit">
                                        <img src="/icon/btn_edit_msg.svg"/>
                                    </button>
                                </div>
                            </div>
                        </div> 

                        <!-- end -->
                        <div class="body-foot mt-20">
                            <div class="card-message-loading" v-if="loading">
                                <svg viewBox="0 0 50 50">
                                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                </svg>
                                <span>
                                    Please wait while we connect you with one of our team ...
                                </span>
                            </div>
                            <div class="card-message-notif" v-if="alert.information">
                                <div class="card-new-message">
                                    <div>New Message</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-footer">
                        <div class="card-message">
                            <input type="text" class="input-message" placeholder="Type a new message" v-model="message" id="input-message">
                            <button class="btn bg-primary ml-10" @click="sendMessage" id="send-message">Send</button>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'InboxMessage', 
    data () {
        return {
            message: null,
            id_sess: localStorage.getItem('id-session'),
            alert: {
                information: false
            },
        }
    },
    emits: ['reload-data'],
    methods: {
        close () {
            document.getElementById('inboxMessage').className = 'card index-2 hidden';
        },
        showEditDropdown ($event, id) {            
            if ($event.explicitOriginalTarget.parentElement.className === 'btn-chat-edit') {
                document.querySelectorAll('.dropdown-contet').forEach((y) => {
                    if (y.getAttribute('id') !== id) {
                        y.classList.add('none');
                    }
                });
                let btnEdit = document.getElementById('send-message');
                if (btnEdit.getAttribute('data-action') === 'edit') {
                    document.getElementById('input-message').value = '';
                }
                document.getElementById('send-message').removeAttribute('data-action');
                let classId = document.getElementById(id).classList.contains('none');
                if (classId) {
                    document.getElementById(id).classList.remove('none');
                } else {
                    document.getElementById(id).classList.add('none');
                }
            }
        },
        async sendMessage () {
            let message = document.getElementById('input-message');
            if (message.value !== '') {
                let header = this.axiosHeader;
                header.headers['Content-Type'] = 'application/json';
                const post = {                    
                    post: this.header.id,
                    message: this.message,
                    owner: this.id_sess
                };
                let type = document.getElementById('send-message').getAttribute('data-action');
                switch (type) {
                    case 'edit':
                        alert('API Service in dummy.io Not ready');
                        break;
                    default:
                        await this.axios.post(Env.URL_API + 'comment/create', post, header).then(({ data }) => {
                            this.reloadData();
                            this.message = null;
                        }).catch((error) => {
                            console.log(error);
                            alert('Failed Send Message!!!!');
                        });
                        break
                }
            } else {
                document.getElementById('input-message').focus();
            }
        },
        async deleteMessage (id) {
            let header = this.axiosHeader;
            await this.axios.delete(Env.URL_API + `comment/${id}`, header).then(({ data }) => {
                this.reloadData();
            });
        },
        editMessage (row) {
            // document.querySelectorAll('.dropdown-contet').forEach((element) => {
            //     // element.style.display = 'none';
            //     element.setAttribute('data-edit', true);
            // });
            document.getElementById('send-message').setAttribute('data-action', 'edit');
            document.getElementById('input-message').value = row.message;
            document.getElementById('input-message').focus();
        },
        async reloadData () {
            let row = {
                id: this.header.id,
                header_name: this.header.title
            };
            await this.$emit('reload-data', row);
            let objDiv = document.getElementById('chatBody');
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    },
    props: {
        loading: {
          type: Boolean,
          default: false  
        },
        header: {
            type: Object,
            default: {}
        },
        data: {
            type: Array,
            default: []
        }
    }
}

</script>