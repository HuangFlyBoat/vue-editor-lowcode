//有关焦点判断的脚本
import {computed, ref} from 'vue'
export function useFocus(data,previewRef,callback){ // 获取哪些元素被选中了

    const selectIndex = ref(-1); // 表示没有任何一个被选中

    // 最后选择的那一个
    const lastSelectBlock = computed(()=>data.value.blocks[selectIndex.value])



    const focusData = computed(() => {
        let focus = [];
        let unfocused = [];
        data.value.blocks.forEach(block => (block.focus ? focus : unfocused).push(block));
        return { focus, unfocused }
    });

    const clearBlockFocus = () => {
        data.value.blocks.forEach(block => block.focus = false);
    }

    // 失去焦点
    const containerMousedown = () => {
        if(previewRef.value) return
        clearBlockFocus(); // 点击容器让选中的失去焦点
        selectIndex.value = -1;
    }

    // 画布中组件是否被选中
    const blockMousedown = (e, block,index) => {
        if(previewRef.value) return
        e.preventDefault();
        e.stopPropagation();
        // block上我们规划一个属性 focus 获取焦点后就将focus变为true
        if (e.shiftKey) {
            //多个组件的选中规则，按住shift
            if(focusData.value.focus.length <=1) {
                block.focus = true; // 当前只有一个节点被选中时 摁住shift键也不会切换focus状态
            }else{
                block.focus = !block.focus;
            }
        } else {
            // 单个组件的选中规则
            if (!block.focus) {
                clearBlockFocus();// 要清空其他人foucs属性，再给选中的属性添加
                block.focus = true; 
            } // 当自己已经被选中了，在次点击时还是选中状态
        }
        selectIndex.value = index;
        //设置回调函数，在选中后触发
        callback(e)
    }
    return {
        blockMousedown,
        containerMousedown,
        focusData,
        lastSelectBlock,
        clearBlockFocus
    }
}