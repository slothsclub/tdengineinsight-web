export const baseURL = import.meta.env.VITE_API_BASE_URL || "/"

export const apis = {
    test: "https://jsonplaceholder.typicode.com/todos/1",
    getInstances: "/app/instance",
    openInstance: "/app/instance/:instance/open",
    createInstance: "/app/instance",
    updateInstance: "/app/instance/:id",
    deleteInstance: "/app/instance/:id",
}
