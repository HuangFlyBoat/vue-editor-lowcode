// 属性栏editor-right一侧的渲染规则，传入两个数据，用户最后选择的元素和全局data（包含容器宽高，单独考虑到最后选择为容器部分）

import { defineComponent, inject, watch, reactive } from "vue";
import { ElForm, ElFormItem, ElButton, ElInputNumber, ElColorPicker, ElSelect, ElOption, ElInput } from 'element-plus'
import deepcopy from "deepcopy";
import TableEditor from "./table-editor";

export default defineComponent({
    props: {
        block: { type: Object }, // 用户最后选中的元素
        data: { type: Object }, // 当前所有的数据
        updateContainer:{type:Function},
        updateBlock:{type:Function}
    },
    setup(props, ctx) {
        const config = inject('config'); // 组件的配置信息
        const state = reactive({
            editData: {}
        })
        const reset = () => {
            if (!props.block) { // 说明要绑定的是容器的宽度和高度
                state.editData = deepcopy(props.data.container)
            } else {
                state.editData = deepcopy(props.block);
            }
        }
        const apply = () =>{
            if (!props.block) { // 更改组件容器的大小
                props.updateContainer({...props.data,container: state.editData});
            } else { // 更改组件的配置
                props.updateBlock(state.editData,props.block);
            }

        }
        watch(() => props.block, reset, { immediate: true })
        // content用来存放属性栏渲染的属性，初始为空
        return () => {
            let content = []
            // 如果传入的最后选择为空则显示容器属性
            if (!props.block) {
                content.push(<>
                    <ElFormItem label="容器宽度">
                        <ElInputNumber v-model={state.editData.width}></ElInputNumber>
                    </ElFormItem>
                    <ElFormItem label="容器高度">
                        <ElInputNumber v-model={state.editData.height}></ElInputNumber>
                    </ElFormItem>
                </>)
            } else {
                // 拿到key对应的组件
                let component = config.componentMap[props.block.key];
                // 如果组件和组件里的属性都有值则渲染其属性
                if (component && component.props) { 
                    // 在config里经过工厂函数后，我们获取到组件（如t文本组件）的props内容格式是这样的，还没有样式，需要根据type内容渲染
                    // {text:{type:'xxx'},size:{},color:{}}
                    // Object.entries(component.props).map解构
                    // 把组件里的属性全部遍历一遍，propConfig为工厂函数的返回对象，内涵type，label，options等属性
                    content.push(Object.entries(component.props).map(([propName, propConfig]) => {
                        return <ElFormItem label={propConfig.label}>
                            {{
                                // 根据不同的类型type渲染不同的逻辑
                                input: () => <ElInput v-model={state.editData.props[propName]}></ElInput>,
                                color: () => <ElColorPicker v-model={state.editData.props[propName]}></ElColorPicker>,
                                select: () => <ElSelect v-model={state.editData.props[propName]}>
                                    {propConfig.options.map(opt => {
                                        
                                        return <ElOption label={opt.label} value={opt.value}></ElOption>
                                    })}
                                </ElSelect>,
                                table:()=> <TableEditor propConfig={propConfig} v-model={state.editData.props[propName]} ></TableEditor>,
                                imgupload:()=><input type="file" accept="image/*" onInput={(e)=>{
                                    // console.log('e.target.flies',e.target.files[0])
                                    // input元素 blur的时候，需要将上次图片的input元素的value设置为空字符串，否则会报错了，故不能用双向绑定
                                    const reader = new FileReader()
                                    reader.onload = () => {
                                        state.editData.props[propName] = reader.result
                                        // console.log('sss',state.editData.props[propName])
                                      }
                                    reader.readAsDataURL(e.target.files[0])
                                    
                                }}></input>,
                                radio: ()=> <ElRadio v-model={state.editData.props[propName]}>
                                    {propConfig.options.map(opt => {
                                        return <ElOption label={opt.label} value={opt.value}></ElOption>
                                    })}
                                </ElRadio>
                            }[propConfig.type]()}
                        </ElFormItem>
                    }))
                }

                if(component && component.model){
                    //                                                 default   标签名
                    content.push(Object.entries(component.model).map(([modelName,label])=>{
                        return <ElFormItem label={label}>
                            {/* model => {default:"username"} */}
                            <ElInput  v-model={state.editData.model[modelName]}></ElInput>
                        </ElFormItem>
                    }))
                }
              
            }


            return <ElForm labelPosition="top" style="padding:30px">
                {content}
                <ElFormItem>
                    <ElButton type="primary" onClick={()=>apply()}>应用</ElButton>
                    <ElButton onClick={reset} >重置</ElButton>
                </ElFormItem>
            </ElForm>
        }
    }
})