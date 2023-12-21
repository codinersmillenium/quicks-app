<template>
    <div :class="'card ' + showCard">
        <div class="card-content">
            <div class="card-header">
                <div class="flex-row flex-between">
                    <div>
                        <button class="task-option" 
                            @click="() => { showClass('option-list'); icontOptionTask(); }">
                            <div class="flex-row flex-end">
                                <a>{{ task_selected?.text }}</a>
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="task_selected.open === true">
                                    <path d="M14.5981 6.91248L10.7731 10.7291L6.94807 6.91248L5.77307 8.08748L10.7731 13.0875L15.7731 8.08748L14.5981 6.91248Z" fill="#4F4F4F"/>
                                </svg>
                                <svg width="21" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
                                    <g id="expand_more_24px">
                                    <path id="icon/navigation/expand_more_24px" d="M6.175 13.0875L10 9.27083L13.825 13.0875L15 11.9125L10 6.9125L5 11.9125L6.175 13.0875Z" fill="#4F4F4F"/>
                                    </g>
                                </svg>
                            </div>
                        </button>
                        <div 
                            class="task-option-list display-none" 
                                id="option-list" >
                                <template v-for="(val, k) in list_task_type" :key="k">
                                    <div :class="((k < list_task_type.length) ? 'b-1' : '')"
                                        :style="((val.id === task_selected.id ) ? 'background-color: #4F4F4F;color: #FFFF;' : '')"
                                        @click="selectTask(val)">
                                        <p>{{ val.text }}</p>
                                    </div>
                                </template>
                        </div>
                    </div>
                   <button class="btn bg-primary" @click="clone">New Task</button>
                </div>
            </div>
            <div class="card-body scroll" id="card-task-body">
                <div class="loading-card" v-if="loading">
                    <svg class="loading" viewBox="0 0 50 50">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg>
                    <span class="loading-title">Loading Tasks...</span>  
                </div>
                <div class="task-cart">
                    <template v-for="(row, i) in dataTemp" :key="i">
                        <template v-if="row.type_id === task_selected.id">
                            <template v-for="(_row, j) in row.list" :key="j">
                                <div class="list-inbox" :id="'list-inbox-' + _row.id">
                                    <div class="flex-row flex-start">
                                        <input type="checkbox" class="check-task" 
                                            :checked="((_row.status === 1) ? true : false)"
                                            @change="collapse($event, _row.id);checkCard($event)"
                                        />
                                        <div>
                                            <div class="inbox-title ml-20">
                                                <input type="text" class="task-input" placeholder="Type Task Title" 
                                                    :style="(_row.status === 1) ? 'display: none': ''"
                                                    v-model="_row.title"
                                                    :id="'title-input-' + _row.id"
                                                />
                                                <div class="task-title close" 
                                                :style="(_row.status === 0) ? 'display: none': ''"
                                                :id="'title-' + _row.id">
                                                    {{ _row.title }}
                                                </div>

                                                <div class="inbox-time task red-1">{{ countDateEnd(_row.date) + ' days left' }}</div>
                                                <div class="inbox-time task gray-1">{{ dateParser(_row.date, 'number', 'disabled') }}</div>
                                                <button class="btn-action-task" @click="collapse($event, _row.id)">
                                                    <img src="/icon/expand_more_24px_outlined.svg" />
                                                </button>
                                                <button class="btn-action-task edit-task" @click="showClass('delete-' + _row.id)">
                                                    <img src="/icon/btn_edit_msg.svg" />
                                                    <a class="delete edit-task display-none" 
                                                        :id="'delete-' + _row.id"
                                                    >
                                                        <span @click="deleteTask(_row.id)">
                                                            Delete
                                                        </span>
                                                    </a>
                                                </button>
                                            </div>

                                            <div :class="'inbox-desc column ml-20 mt-10' + ((_row.status === 1) ? ' none': '')" :id="'desc-' + _row.id">

                                                <div class="flex-row flex-start task-desc">
                                                    <img src="/icon/schedule_24px_outlined.svg" />
                                                    <input type="date" class="input-date ml-15" v-model="_row.date"/>
                                                </div>
                                                <div class="flex-row flex-start task-desc mt-10">
                                                    <img src="/icon/edit_24px.svg" />
                                                    <textarea class="b-0 fs-3 ml-15" v-model="_row.desc">
                                                        {{ _row.desc }}
                                                    </textarea>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="line" :id="'line-inbox-' + _row.id"></div>
                            </template>
                        </template>
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { convertDate } from "../../assets/ts/date";

export default {
    name: 'Task',
    data () {
        return {
            loading: false,
            list_task_type: [
                { id: 1, text: 'Personal Errands' },
                { id: 2, text: 'Urgent To-Do' }
            ],
            task_selected: {
                id: 1, text: 'Personal Errands', open: false
            },
            data_task: [
              {
                type_id: 1,
                list: [
                  {
                    id: 1,
                    data_id: 1111,
                    title: 'Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ] ',
                    date: '2023-11-05',
                    desc: 'value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi placeat, porro expedita ut aspernatur obcaecati ex reprehenderit velit nostrum sapiente. Natus aperiam quos dicta repellendus deleniti totam quisquam necessitatibus dolores?"',
                    status: 0
                  },
                  {
                    id: 2,
                    data_id: 2222,
                    title: 'Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ] ',
                    date: '2023-11-07',
                    desc: 'value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi placeat, porro expedita ut aspernatur obcaecati ex reprehenderit velit nostrum sapiente. Natus aperiam quos dicta repellendus deleniti totam quisquam necessitatibus dolores?"',
                    status: 1
                  }
                ]
             },
             {
                type_id: 2,
                list: [
                  {
                    id: 3,
                    data_id: 3333,
                    title: 'Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ] ',
                    date: '2023-11-09',
                    desc: 'value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi placeat, porro expedita ut aspernatur obcaecati ex reprehenderit velit nostrum sapiente. Natus aperiam quos dicta repellendus deleniti totam quisquam necessitatibus dolores?"',
                    status: 0
                  },
                  {
                    id: 4,
                    data_id: 4444,
                    title: 'Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ] ',
                    date: '2023-12-12',
                    desc: 'value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi placeat, porro expedita ut aspernatur obcaecati ex reprehenderit velit nostrum sapiente. Natus aperiam quos dicta repellendus deleniti totam quisquam necessitatibus dolores?"',
                    status: 1
                  }
                ]
             }
            ],
            dataTemp: []
        }
    },
    computed: {
        showCard () {
            if (this.card == 'Task') {
                this.dataPush();
                return 'show';
            } else {
                return 'hidden';
            }
        }
    },
    methods: {
        dataPush () {
            this.loading = true;
             setTimeout(() => {
                this.loading = false;
                this.dataTemp = this.data_task;
            }, 2000);
        },
        collapse ($event, id) {
            let arrayList = $event.explicitOriginalTarget.parentElement.classList.contains('edit-task');
            if (!arrayList) {
                if (document.getElementById('desc-' + id).classList.contains('none')) {
                    document.getElementById('desc-' + id).classList.remove('none');
                    document.getElementById('desc-' + id).classList.add('show');
                    document.getElementById('title-' + id).classList.remove('close');
                    document
                } else {
                    document.getElementById('desc-' + id).classList.remove('show');
                    document.getElementById('desc-' + id).classList.add('none');
                    document.getElementById('title-' + id).classList.add('close');
                }
            }
        },
        showClass (id) {
            let classId = document.getElementById(id).classList.contains('display-none');
            if (classId) {
                document.getElementById(id).classList.remove('display-none');
            } else {
                document.getElementById(id).classList.add('display-none');
            }
        },
        selectTask (item) {
            this.task_selected.id = item.id; 
            this.task_selected.text = item.text;         
        },
        deleteTask (id) {
            const deleteElem = document.getElementById('list-inbox-' + id);
            const deleteElemLine = document.getElementById('line-inbox-' + id);
            if (deleteElem && deleteElemLine)
                deleteElem.classList.add('display-none');
                deleteElemLine.classList.add('display-none');
        },
        checkCard (event) {
            
        },
        icontOptionTask () {
            let classId = document.getElementById('option-list').classList.contains('display-none');
            if (classId) {
                this.task_selected.open = false;
            } else {
                this.task_selected.open = true;
            }
        },
        clone () {
            //js
            // const node = document.querySelector(".task-cart:last-child");
            // const clone = node.cloneNode(true);
            // document.getElementById('card-task-body').appendChild(clone);

            // with vue
            let cloneData = {
                id: Math.floor(Math.random() * 100) + 10,
                title: null,
                date: new Date(),
                desc: null,
                status: 0
            }
            for (let obj in this.data_task) {
                let element = this.data_task[obj];
                if (element.type_id === this.task_selected.id) {
                    element.list.push(cloneData);
                    break;
                }
            }

        },
        dateParser (date, format = null, time = null) {
            return convertDate(date, format, time);
        },
        countDateEnd (date) {
            var dateEnd = new Date(date);
            var dateNow = new Date();
            dateEnd.setHours(0, 0, 0, 0);
            dateNow.setHours(0, 0, 0, 0);
            var Range = Math.abs(dateEnd - dateNow);
            if ((dateEnd - dateNow) < 0) {
                return 0;
            }
            return Math.round(Range / (1000 * 60 * 60 * 24));
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