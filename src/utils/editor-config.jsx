// 列表区可以显示所有的物料
// key对应的组件映射关系

import {
  ElButton,
  ElDivider,
  ElInput,
  ElOption,
  ElSelect,
  ElRadio,
  CircleClose,
  ElRadioGroup,
  ElForm,
} from 'element-plus'
import Range from '../components/Range'
import img from '../assets/caption.png'
import dateRange from '../components/dateRange'
import { getParam, event_list } from '../packages/events.js'
import { handleBlur } from '../packages/form-validation'

function createEditorConfig() {
  const componentList = []
  const componentMap = {}

  return {
    componentList,
    componentMap,
    // 注册函数，所有新的组件都要通过注册函数进行注册
    register: (component) => {
      // 存放组件的一个数组，用于记录所有组件
      componentList.push(component)
      // key与组件一一映射的表，方便通过key值来寻找对应组件
      componentMap[component.key] = component
    },
  }
}
export let registerConfig = createEditorConfig()

// 通过工厂函数来实现复用，用于属性栏的单个属性渲染，返回值为对象
// 分别有输入框工厂，颜色选择工厂，下拉框工厂和表格工厂
const createInputProp = (label) => ({ type: 'input', label })
const createColorProp = (label) => ({ type: 'color', label })
const createSelectProp = (label, options) => ({
  type: 'select',
  label,
  options,
})
const createFormProp = (label, options, id) => ({
  type: 'select',
  label,
  options,
  id
})
const createTableProp = (label, table) => ({ type: 'table', label, table })
const createImguploadProp = (label) => ({ type: 'imgupload', label })
const createSwitchProp = (label) => ({ type: 'switch', label })
const creatEventListProp = (label, List) => ({ type: 'button', label, List })
// 组件区域的注册 label 标签（显示在物料区的左上角），
// preview为预览区的展示，render为画布区的展示，需要将属性传入，key为关键字，props存储属性区的内容
//添加单选框属性
const createRadioProp = (label, options) => ({ type: 'radio', label, options })
// 下拉框组件注册
registerConfig.register({
  label: '下拉框',
  preview: () => <ElSelect modelValue=""></ElSelect>,
  render: ({ props, model }) => {
    return (
      <ElSelect {...model.default}>
        {(props.options || []).map((opt, index) => {
          return (
            <ElOption
              label={opt.label}
              value={opt.value}
              key={index}></ElOption>
          )
        })}
      </ElSelect>
    )
  },
  key: 'select',
  props: {
    // [{label:'a',value:'1'},{label:'b',value:2}]
    options: createTableProp('下拉选项', {
      options: [
        { label: '显示值', field: 'label' },
        { label: '绑定值', field: 'value' },
      ],
      key: 'label', // 显示给用户的值 是label值
    }),
  },
  model: {
    // {default:'username'}
    default: '绑定字段',
  },
})

// 文本组件注册
registerConfig.register({
  label: '文本',
  preview: () => '预览文本',
  render: ({ props }) => (
    <span style={{ color: props.color, fontSize: props.size }}>
      {props.text || '渲染文本'}
    </span>
  ),
  key: 'text',
  props: {
    text: createInputProp('文本内容'),
    color: createColorProp('字体颜色'),
    size: createSelectProp('字体大小', [
      { label: '14px', value: '14px' },
      { label: '20px', value: '20px' },
      { label: '24px', value: '24px' },
    ]),
  },
})

// 按钮组件注册
registerConfig.register({
  label: '按钮',
  resize: {
    width: true,
    height: true,
  },
  preview: () => <ElButton>预览按钮</ElButton>,
  render: ({ props, size }) => (
    <ElButton
      style={{ height: size.height + 'px', width: size.width + 'px', color: props.color, backgroundColor: props.backgroundColor }}
      type={props.type}
      size={props.size}
      disabled={props.switch1}
      onClick={() => getParam(props)}>
      {props.text || '渲染按钮'}
    </ElButton>
  ),
  key: 'button',
  props: {
    text: createInputProp('按钮内容'),
    type: createSelectProp('按钮类型', [
      { label: '基础', value: 'primary' },
      { label: '成功', value: 'success' },
      { label: '警告', value: 'warning' },
      { label: '危险', value: 'danger' },
      { label: '链接', value: 'text' },
    ]),
    size: createSelectProp('按钮尺寸', [
      { label: '默认', value: '' },
      { label: '中等', value: 'medium' },
      { label: '小', value: 'small' },
      { label: '极小', value: 'mini' },
    ]),
    switch1: createSwitchProp('Disabled'),
    color: createColorProp('文字颜色'),
    backgroundColor: createColorProp('按钮颜色'),
    eventList: creatEventListProp('添加事件', {
      eventList: [
        { label: '跳转事件', param: '', key: 'redirect', event: event_list[0] },
        { label: 'alert 事件', param: '', key: 'alert', event: event_list[1] },
      ],
    }),
  },
})

// 输入框组件注册
registerConfig.register({
  label: '输入框',
  resize: {
    width: true, // 更改输入框的横向大小
  },
  preview: () => <ElInput placeholder="预览输入框"></ElInput>,
  render: ({ model, size, props }) => {
    return (
      <ElForm id="form" className="form" novalidate>
        <div className="form-control">
          <ElInput
            type={props.type}
            placeholder={props.placeholder}
            id={props.type}
            onBlur={(e) => { handleBlur(e) }}
            {...model.default}
            style={{ width: size.width + 'px' }}
            disabled={props.switch1}
            size={props.size}></ElInput>
          <small className="error-message"></small>
        </div>
      </ElForm>
    )
  },
  key: 'input',
  model: {
    // {default:'username'}
    default: '绑定字段',
  },
  props: {
    placeholder: createInputProp('PlaceHolder'),
    switch1: createSwitchProp('Disabled'),
    size: createSelectProp('尺寸', [
      { label: '默认', value: '' },
      { label: '大', value: 'large' },
      { label: '小', value: 'small' },
    ]),
    type: createFormProp('输入框类型', [
      { label: 'username', value: 'text' },
      { label: 'email', value: 'email' },
      { label: 'password', value: 'password' },
      { label: 'age', value: 'age' },
    ]),
  },
})

// 时间选择器组件注册
registerConfig.register({
  label: '时间选择器',
  preview: () => <Range placeholder="预览输入框"></Range>,
  render: ({ model, props }) => {
    return (
      <Range
        {...{
          timeStart: model.timeStart.modelValue, // @update:timeStart
          timeEnd: model.timeEnd.modelValue,
          'onUpdate:timeStart': model.timeStart['onUpdate:modelValue'],
          'onUpdate:timeEnd': model.timeEnd['onUpdate:modelValue'],
          size: props.size,
          title: props.title,
        }}></Range>
    )
  },
  model: {
    timeStart: '开始时间字段',
    timeEnd: '结束时间字段',
  },
  key: 'timeRange',
  props: {
    title: createInputProp('标题'),
    size: createSelectProp('组件大小', [
      { label: 'default', value: '' },
      { label: 'medium', value: 'medium' },
      { label: 'mini', value: 'mini' },
      { label: 'small', value: 'small' },
    ]),
  },
})

// 时间选择器组件注册
registerConfig.register({
  label: '日期选择器',
  preview: () => <dateRange placeholder="预览输入框"></dateRange>,
  render: ({ model, props }) => {
    return (
      <dateRange
        {...{
          dateStart: model.dateStart.modelValue, // @update:timeStart
          dateEnd: model.dateEnd.modelValue,
          'onUpdate:dateStart': model.dateStart['onUpdate:modelValue'],
          'onUpdate:dateEnd': model.dateEnd['onUpdate:modelValue'],
          size: props.size,
          title: props.title,
        }}></dateRange>
    )
  },
  model: {
    dateStart: '开始时间字段',
    dateEnd: '结束时间字段',
  },
  key: 'dateRange',
  props: {
    title: createInputProp('标题'),
    size: createSelectProp('组件大小', [
      { label: 'default', value: '' },
      { label: 'medium', value: 'medium' },
      { label: 'mini', value: 'mini' },
      { label: 'small', value: 'small' },
    ]),
  },
})

// 分割线组件注册
registerConfig.register({
  label: '分割线',
  resize: {
    width: true,
  },
  preview: () => <ElDivider style={{ width: 150 + 'px' }}></ElDivider>,
  render: ({ props, size }) => (
    <div className="divider" style={{ width: size.width + 'px' }}>
      <ElDivider
        style={{
          backgroundColor: props.color,
        }}
        direction={props.type}
        content-position={props.position}>
        {props.text || ''}
      </ElDivider>
    </div>
  ),
  key: 'divider',
  props: {
    text: createInputProp('分割线内容'),
    color: createColorProp('分割线颜色'),
    type: createSelectProp('分割线方向', [
      { label: '水平', value: 'horizontal' },
      { label: '垂直', value: 'vertical' },
    ]),
    position: createSelectProp('文字位置', [
      { label: '居中(默认)', value: 'center' },
      { label: '左', value: 'left' },
      { label: '右', value: 'right' },
    ]),
  },
})

// 图片组件注册
registerConfig.register({
  label: '图片',
  resize: {
    width: true,
    height: true,
  },
  preview: () => (
    <div style={{ width: 125 + 'px', height: 75 + 'px' }}>
      <img src={img} style={{ width: 100 + '%', height: 100 + '%' }} alt="" />
    </div>
  ),

  render: ({ props, size }) => (
    <div
      className="uploadImg"
      style={{ width: size.width + 'px', height: size.height + 'px' }}
      onClick={() => getParam(props)}
    >
      <img src={props.url ? props.url : img}></img>
    </div>
  ),
  key: 'img',
  props: {
    url: createImguploadProp('上传图片'),
    eventList: creatEventListProp('添加事件', {
      eventList: [
        { label: '跳转事件', param: '', key: 'redirect', event: event_list[0] },
        { label: 'alert 事件', param: '', key: 'alert', event: event_list[1] },
      ],
    }),
  },
})
//单选框组件注册
registerConfig.register({
  label: '单选框',

  preview: () => (
    <div>
      <ElRadio>备选项</ElRadio>
      <ElRadio label="1">备选项</ElRadio>
    </div>
  ),
  render: ({ props }) => {
    return (
      <ElButton>
        <ElRadioGroup v-model={props.key}>
          {(props.options || []).map((opt, index) => {
            //传出的备选项绑定label
            return <ElRadio label={opt.label}>{opt.label}</ElRadio>
          })}
        </ElRadioGroup>
      </ElButton>
    )
  },
  key: 'radio',
  props: {
    options: createTableProp('添加选项', {
      options: [{ label: '备选项', field: 'label' }],
      key: 'label', // 显示给用户的值 是label值
    }),
  },

  model: {
    // {default:'username'}
    default: '绑定字段',
  },
})
// model:{// {start:'start',end:'end'}
//     start:'开始字段',
//     end:'结束字段'

// }
