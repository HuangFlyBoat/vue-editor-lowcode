import { defineComponent, computed } from "vue";
import { ElButton, ElTag } from "element-plus";
import deepcopy from "deepcopy";
import { $addEvents } from "../components/addEvents"
import img from '../assets/remove.png'

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
        const remove = () => {
            data.value = {}
            console.log(data.value);
        }
        return () => {
            console.log(props.modelValue);
            return <div class="event-list">
                <div class="div-events">
                    {/* 无添加事件 */}
                    {/* {(!data.value || data.value.length <= 2) && <ElButton onClick={add}>添加</ElButton>} */}
                    {(data.value.key == undefined) && <ElButton onClick={add}>添加</ElButton>}

                    <br></br>
                    <div class="event">
                        <div>
                            {(data.value.key == undefined ? props.propConfig.List.eventList[0].param != '' : data.value.key != 'alert') && <ElTag onClick={add}>跳转事件</ElTag>}
                            {(data.value.key == undefined ? props.propConfig.List.eventList[0].param != '' : data.value.key != 'alert') && <img src={img} onClick={remove}></img>}
                        </div>
                        <div>
                            {(data.value.key == undefined ? props.propConfig.List.eventList[1].param != '' : data.value.key != 'redirect') && <ElTag onClick={add}>alert事件</ElTag>}
                            {(data.value.key == undefined ? props.propConfig.List.eventList[1].param != '' : data.value.key != 'redirect') && <img src={img} onClick={remove}></img>}
                        </div>
                    </div>
                </div>

            </div>
        }
    }
})