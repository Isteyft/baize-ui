import { each, isFunction, cloneDeep, assign } from "lodash-es";
import { watchEffect, useSlots, getCurrentInstance, type VNode } from "vue";

// 简单的遍历，遍历dom树
const _dfs = (nodes: VNode[], cb: (node: VNode) => void) => 
    each(nodes, (node) => { 
        isFunction(cb) && cb(node);
        node.children && _dfs(node.children as VNode[], cb);
    });

export function useDisabledStyle() { 
    const nodePropsMap = new Map();

    // 获取当前实例
    const instance = getCurrentInstance();
    const children = useSlots()?.default?.();

    watchEffect(() => {
        if (!instance?.props.disabled) {
            _dfs(children ?? [], (node) => { 
                // 如果当前节点没有被处理过,就说明没有替换过样式
                if (!nodePropsMap.has(node)) return;
                node.props = nodePropsMap.get(node);
            })
            return;
        }
        _dfs(children ?? [], (node) => { 
            // 如果当前节点没有被处理过,就说明没有替换过样式
            if (!node?.props) return;
            // 缓存节点的props
            nodePropsMap.set(node, cloneDeep(node.props));
            node.props = assign(node?.props, {
                style: {
                    cursor: "not-allowed",
                    color: "var(--baize-text-color-placeholder)",
                }
            })
        })
    })
}

export default useDisabledStyle;