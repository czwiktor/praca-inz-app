const { user } = require("firebase-functions/v1/auth");

const isEmail = (email) => {
    let validation = false;
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
    if (email.match(emailRegEx)) {
        validation = true;
    }
    
    return validation
}

const isEmpty = (string) => {
    if (string.trim() === '') return true; 
    else {
        return false;
    } 
}

exports.validateRegistrationData = (userData) => {
    let errors = {};
    if (isEmpty(userData.email)) {
        errors.email = 'Must not be empty!'
    } else if (!isEmail(userData.email)) {
        errors.email = 'Must be an proper email address!'
    }

    if (isEmpty(userData.password)) {
        errors.password = 'Must not be empty!'
    }

    if (userData.password !== userData.confirmPassword || isEmpty(userData.confirmPassword)) {
        errors.confirmPassword = 'Both passwords needs to be the same!'
    }

    return {
        errors,
        valid: Object.keys(errors).length > 0 ? false : true
    }
}

exports.validateLoginData = (userData) => {
    let errors = {};
    if (isEmpty(userData.email)) {
        errors.email = 'Provide email address';
    }
    
    if (isEmpty(userData.password)) {
        errors.password = 'Provide password';
    }

    return {
        errors,
        valid: Object.keys(errors).length > 0 ? false : true
    }
}

exports.reduceUserDetails = (data) => {
    let userDetails = {};
    if (!isEmpty(data.name.trim())) {
        userDetails.name = data.name;
    }

    if (!isEmpty(data.lastname.trim())) {
        userDetails.lastname = data.lastname;
    }

    if(!isEmpty(data.website.trim())) {
        userDetails.websiet
    }

}