import mitt from 'mitt';
const events = mitt(); // 导出一个发布订阅的对象 

// 编辑器自定义事件
const custom = {
    redirect(url) {
        if (url) {
            window.location.href = url
        }
    },

    alert(msg) {
        if (msg) {
            // eslint-disable-next-line no-alert
            alert(msg)
        }
    },
}

const mixins = {
    methods: custom,
}

const event_list = [
    {
        event: `{}`,
    },
    {
        event: `{}`,
    },
]
//获取一下param值
function getParam(props) {
    if (props.eventList) {
        if (props.eventList.key == 'alert') {
            custom.alert(props.eventList.param)
        } else if (props.eventList.key == 'redirect') {
            custom.redirect(props.eventList.param)
        }
    }
}


export {
    mixins,
    custom,
    event_list,
    events,
    getParam
}