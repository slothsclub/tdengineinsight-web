import {reactive, ref} from "vue";

export default function useValidation() {
    const errors = reactive({})
    const formatValidationErrors = (err, fieldState) => {
        if (err.code !== "UNPROCESSABLE_ENTITY") {
            return {...fieldState}
        }
        for (let i in fieldState) {
            errors[i] = ["", null]
        }
        for (let i in err.payload) {
            errors[err.payload[i].field] = ["error", err.payload[i].message]
        }
        return errors
    }

    return {
        formatValidationErrors
    }
}
