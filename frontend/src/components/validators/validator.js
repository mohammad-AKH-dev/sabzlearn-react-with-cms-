import rules from "./rules"


export const validator = (value,validations) => {
  console.log('validator => ',value,validations)
   
  let validationResults = []
  const emailRegex = /^[\w-&*]+@\w{4,5}\.com$/g

  for(let validator of validations) {
    if(validator.value === rules.requiredValue){
        value.trim().length === 0 && validationResults.push(false)
    }
    if(validator.value === rules.minValue) {
        value.trim().length < validator.min && validationResults.push(false)
    }
    if(validator.value === rules.maxValue) {
        value.trim().length > validator.max && validationResults.push(false)
    }
    if(validator.value === rules.emailValue) {
        !value.trim().match(emailRegex) && validationResults.push(false)
    }
    console.log(validationResults)
  }
  if(validationResults.length === 0){
    return true
  }else{
    return false
  }
}

