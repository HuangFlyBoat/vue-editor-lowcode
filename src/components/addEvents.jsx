import deepcopy from "deepcopy";
import { ElDialog, ElButton, ElTabPane, ElInput, ElTabs } from "element-plus";
import { defineComponent, reactive, createVNode, render } from "vue";



const EventComponent = defineComponent({
    props: {
        eventList: { type: Object }
    },
    setup(props, ctx) {
        const state = reactive({
            eventList: props.eventList,
            isShowEvent: false,
            eventURL: '',
            eventActiveName: 'redirect',
            editData: [] //编辑的数据
        })
        const methods = {
            show(eventList) {
                state.eventList = eventList;// 把用户的配置缓存起来
                state.isShowEvent = true;// 更改显示状态
                state.editData = deepcopy(eventList.data)// 通过渲染的数据 默认展现
            }
        }
        const onCancel = () => {
            state.isShowEvent = false;
        }
        const onConfirm = () => {
            //事件绑定导出的更新
            props.eventList.config.List.eventList[1].event = `{()=>alert(` + props.eventList.config.List.eventList[1].param + `)}`
            props.eventList.config.List.eventList[0].event = `{()=>window.location.href =` + props.eventList.config.List.eventList[0].param + `}`
            if (props.eventList.config.List.eventList[1].param != '') {
                state.editData = props.eventList.config.List.eventList[1]
            } else if (props.eventList.config.List.eventList[0].param != '') {
                state.editData = props.eventList.config.List.eventList[0]
            } else if (props.eventList.config.List.eventList[0].param == '' && props.eventList.config.List.eventList[1].param == '') {
                state.editData = []
            }
            state.eventList.onConfirm(state.editData);
            props.eventList.config.List.eventList[1].param = ''
            props.eventList.config.List.eventList[0].param = ''
            onCancel()
            // console.log(state.editData);
        }
        ctx.expose(methods)

        return () => {
            return <ElDialog v-model={state.isShowEvent} title={state.eventList.config.label}>
                {{
                    default: () => (
                        <div v-model={state.isShowEvent} >
                            <ElTabs v-model={state.eventActiveName} >
                                {state.eventList.config.List.eventList.map((item, index) => {
                                    return <ElTabPane      //标签的选择
                                        key={item.key}
                                        label={item.label}
                                        name={item.key}
                                        style={{ padding: '0 20' }}
                                    >
                                        {item.key == 'redirect' && <ElInput
                                            v-model={item.param}
                                            type="textarea"
                                            placeholder="请输入完整的 URL"
                                        ></ElInput>}
                                        {item.key == 'alert' && <ElInput
                                            v-model={item.param}
                                            type="textarea"
                                            placeholder="请输入要 alert 的内容"
                                        ></ElInput>}

                                    </ElTabPane>
                                })}

                            </ElTabs>
                        </div>
                    ),
                    footer: () => <>
                        <ElButton onClick={onConfirm}>确定</ElButton>
                        <ElButton type="danger" onClick={onCancel}>取消</ElButton>
                    </>
                }}
            </ElDialog>
        }
    }
})
let vm;
export const $addEvents = (eventList) => {
    if (!vm) {
        const el = document.createElement('div');
        vm = createVNode(EventComponent, { eventList })
        let r = render(vm, el);
        document.body.appendChild(el);
    }
    let { show } = vm.component.exposed;
    show(eventList);
}