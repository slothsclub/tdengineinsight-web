import {createI18n} from "vue-i18n";
import enUS from "./en-us.js";

const i18n = createI18n({
    locale: "en-us",
    messages: {
        "en-us": enUS
    }
})

export default i18n
