import { defineComponent, computed } from "vue";
import { ElTimePicker } from "element-plus";
export default defineComponent({
    components:{
        ElTimePicker
    },
  props: {
    timeStart: { type: Number },
    timeEnd: { type: Number },
    title: { type: String },
    size: { type: String },
  },
  emits: ["update:timeStart", "update:timeEnd"],
  setup(props, ctx) {
    const timeStart = computed({
      get() {
        return props.timeStart;
      },
      set(newValue) {
        ctx.emit("update:timeStart", newValue);
      },
    });
    const title = computed({
      get() {
        return props.title;
      },
    });
    const size = computed({
      get() {
        return props.size;
      },
    });
    const timeEnd = computed({
      get() {
        return props.timeEnd;
      },
      set(newValue) {
        ctx.emit("update:timeEnd", newValue);
      },
    });
    return () => {
      return (
        <div>
          {" "}
          <span className="title">{title.value}</span>
          <div class="range">
            <el-time-picker size={size.value}
              v-model={timeStart.value}
              placeholder="起始时间"
            ></el-time-picker>
             <el-time-picker size={size.value}
              v-model={timeEnd.value}
              placeholder="终止时间"
            ></el-time-picker>
          </div>
        </div>
      );
    };
  },
});
