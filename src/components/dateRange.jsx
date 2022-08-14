import { defineComponent, computed } from 'vue'
import { ElDatePicker } from 'element-plus'
export default defineComponent({
  components: {
    ElDatePicker,
  },
  props: {
    dateStart: { type: Number },
    dateEnd: { type: Number },
    title: { type: String },
    size: { type: String },
  },
  emits: ['update:dateStart', 'update:dateEnd'],
  setup(props, ctx) {
    const dateStart = computed({
      get() {
        return props.dateStart
      },
      set(newValue) {
        ctx.emit('update:dateStart', newValue)
      },
    })
    const title = computed({
      get() {
        return props.title
      },
    })
    const size = computed({
      get() {
        return props.size
      },
    })
    const dateEnd = computed({
      get() {
        return props.dateEnd
      },
      set(newValue) {
        ctx.emit('update:dateEnd', newValue)
      },
    })
    return () => {
      return (
        <div>
          <span className="title">{title.value}</span>
          <div class="range">
            <el-date-picker
              size={size.value}
              v-model={dateStart.value}
              placeholder="起始日期"
              type="date"></el-date-picker>
            <el-date-picker
              size={size.value}
              v-model={dateEnd.value}
              placeholder="截止日期"
              type="date"></el-date-picker>
          </div>
        </div>
      )
    }
  },
})
