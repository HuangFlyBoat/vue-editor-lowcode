import { defineComponent, computed } from "vue";
import { ElButton, ElTag } from "element-plus";
import deepcopy from "deepcopy";
import { $addEvents } from "../components/addEvents"

export default defineComponent({
    props: {
        propConfig: { type: Object },
        modelValue: { type: Array }
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
        const data = computed({
            get() {
                return props.modelValue || []
            },
            set(newValue) {
                ctx.emit('update:modelValue', deepcopy(newValue))
            }
        })
        const add = () => {
            $addEvents({
                config: props.propConfig,
                data: data.value,
                onConfirm(value) {
                    data.value = value // 当点击确认的时候 将数据更新

                }
            })
        }
        return () => {
            console.log(props.modelValue);
            return <div class="event-list">
                <div class="div-events">
                    {/* 无添加事件 */}
                    {/* {(!data.value || data.value.length <= 2) && <ElButton onClick={add}>添加</ElButton>} */}
                    <ElButton onClick={add}>添加</ElButton>

                    <br></br>
                    {(props.modelValue == undefined ? props.propConfig.List.eventList[0].param != '' : props.modelValue.key != 'alert') && <ElTag onClick={add}>跳转事件</ElTag>}
                    {(props.modelValue == undefined ? props.propConfig.List.eventList[1].param != '' : props.modelValue.key != 'redirect') && <ElTag onClick={add}>alert事件</ElTag>}
                    {/* {(props.modelValue != undefined && props.propConfig.List.eventList[0].param != '') && <ElTag onClick={add}>跳转事件</ElTag>}
                    {(props.modelValue != undefined && props.propConfig.List.eventList[1].param != '') && <ElTag onClick={add}>alert事件</ElTag>} */}
                </div>

            </div>
        }
    }
})