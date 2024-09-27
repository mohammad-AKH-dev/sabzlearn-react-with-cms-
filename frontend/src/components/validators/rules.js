const requiredValue = 'REQUIRED_VALUE' 
const minValue = 'MIN_VALUE'
const maxValue = 'MAX_VALUE'
const emailValue = 'EMAIL_VALUE'


export function requiredValidator () {
    return {
        value:requiredValue
    }
}
export function minValidator (min) {
    return {
         value: minValue,
         min
    }
}

export function maxValidator (max) {
    return {
        value: maxValue,
        max
    }
}

export function emailValidator () {
    return {
        value: emailValue
    }
}

export default {requiredValue,minValue,maxValue,emailValue}