const indicator = document.createElement("div")
indicator.className = "indicator"
const icon = document.createElement("i")
icon.className = "v-loading-icon anticon anticon-loading anticon-spin ant-spin-dot"
indicator.appendChild(icon)

const append = (el) => {
    el.classList.add("v-loading")
    el.appendChild(indicator)
}
const remove = (el) => {
    try {el.removeChild(indicator)} catch(e) {}
    el.classList.remove("v-loading")
}

const loading = {
    mounted(el, binding, vnode, prevVnode) {
        binding.value && append(el)
    },
    updated(el, binding, vnode, prevVnode) {
        binding.value ? append(el) : remove(el)
    }
}
export default loading
