<template>
    <div :class="'card' + ((card === 'Task') ? ' show' : ' hidden')">
        <div class="card-content">
            <div class="card-header">
                <div class="flex-row flex-between">
                    <div>
                        <button class="task-option" @click="showClass('option-list')">
                            <div class="flex-row flex-center">
                                <a>New Tasks</a>
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.5981 6.91248L10.7731 10.7291L6.94807 6.91248L5.77307 8.08748L10.7731 13.0875L15.7731 8.08748L14.5981 6.91248Z" fill="#4F4F4F"/>
                                </svg>
                            </div>
                        </button>
                        <div class="task-option-list display-none" id="option-list">
                            <div class="b-1"><p>delete</p></div>
                            <div><p>delete</p></div>
                        </div>
                    </div>
                   <button class="btn bg-primary" @click="clone">New Task</button>
                </div>
            </div>
            <div class="card-body scroll" id="card-task-body">
                <div class="loading-card none">
                    <svg class="loading" viewBox="0 0 50 50">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg>
                    <span class="loading-title">Loading Tasks...</span>  
                </div>

                <div class="task-cart">
                    <div class="list-inbox">
                        <div class="flex-row flex-start">
                            <input type="checkbox" class="check-task"/>
                            <div>
                                <div class="inbox-title ml-20" @click="collapse($event, 1)">
                                    <div class="task-title close" id="title-1">
                                        Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]
                                    </div>
                                    <!-- <input type="text" class="task-input" placeholder="Type Task Title"/> -->

                                    <div class="inbox-time task red-1">2 days left</div>
                                    <div class="inbox-time task gray-1">12/06/2021</div>
                                    <button class="btn-action-task">
                                        <img src="/icon/expand_more_24px_outlined.svg" />
                                    </button>
                                    <button class="btn-action-task edit-task" @click="showClass('delete-1')">
                                        <img src="/icon/btn_edit_msg.svg" />
                                        <a class="delete edit-task display-none" id="delete-1">
                                            <span>Delete</span>
                                        </a>
                                    </button>
                                </div>

                                <div class="inbox-desc column ml-20 mt-10 none" id="desc-1">
                                    <!-- <span class="datepicker-toggle">
                                <span class="datepicker-toggle-button"></span>
                                <input type="date" class="datepicker-input">
                                </span> -->

                                    <div class="flex-row flex-start task-desc">
                                        <img src="/icon/schedule_24px_outlined.svg" />
                                        <input type="date" class="input-date ml-15" />
                                    </div>
                                    <div class="flex-row flex-start task-desc mt-10">
                                        <img src="/icon/edit_24px.svg" />
                                        <textarea class="b-0 fs-3 ml-15">
                                            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi placeat, porro expedita ut aspernatur obcaecati ex reprehenderit velit nostrum sapiente. Natus aperiam quos dicta repellendus deleniti totam quisquam necessitatibus dolores?"
                                        </textarea>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Task',
    methods: {
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
        clone () {
            const node = document.querySelector(".task-cart:last-child");
            // var elements = document.getElementById('main_iframe').contentDocument.querySelectorAll(".optdel, .optbold");
            // var editsummary = document.getElementById("opteditsum");
            // for (var i = 0, im = elements.length; im > i; i++) {
            //     editsummary.appendChild(elements[i].cloneNode(true));
            // }
            const clone = node.cloneNode(true);
            document.getElementById('card-task-body').appendChild(clone);
        }
    },
    props: {
        card: {
          type: String,
          default: ''  
        },
        data: {
            type: Array,
            default: []
        }
    }
}

</script>