import {useAppStore} from "../store/app.js"

export default function usePageTitle(routeName) {
    const app = useAppStore()

    app.$patch({
        pageInfo: {
            title: `route.title.${routeName}`,
            description: `route.description.${routeName}`
        }
    })
}
