import {useAppStore} from "../store/app.js"
import i18n from "../locale/i18n.js";

export default function usePageTitle(routeName) {
    const app = useAppStore()

    app.$patch({
        pageInfo: {
            title: i18n.global.t(`route.title.${routeName}`),
            description: i18n.global.t(`route.description.${routeName}`)
        }
    })
}
