import { ADD_CREDITS, ADD_EMAIL, ADD_SUB_USER, ADD_TEMPLATE, CREATE_PROJECT, DELETE_TEMPLATE, GENERATE_API_KEY, GET_API_KEYS, GET_CREDITS, GET_EMAILS, GET_PROJECT_VISITORS, GET_PROJECTS, GET_SUB_USERS, GET_TEMPLATES, UPDATE_TEMPLATE} from "../../constants/index"
export const getProjects = (data) => {
    return ({
        type: GET_PROJECTS,
        payload: data
    })
}

export const createProject = (data) => {
    return ({
        type: CREATE_PROJECT,
        payload: data
    })
}
export const addCredits = (data) => {
    return ({
        type: ADD_CREDITS,
        payload: data
    })
}

export const getCredits = (data) => {
    return ({
        type: GET_CREDITS,
        payload: data
    })
}

export const getApiKeys = (data) => {
    return ({
        type: GET_API_KEYS,
        payload: data
    })
}
export const generateApiKey = (data) => {
    return ({
        type: GENERATE_API_KEY,
        payload: data
    })
}
export const getProjectVisitors = (data) => {
    return ({
        type: GET_PROJECT_VISITORS,
        payload: data
    });
};

export const getSubUsers = (data) => {
    return ({
        type: GET_SUB_USERS,
        payload: data
    })
}

export const addSubUser = (data) => {
    return ({
        type: ADD_SUB_USER,
        payload: data
    })
}

export const getEmails = (data) => {
    return ({
        type: GET_EMAILS,
        payload: data
    })
}

export const addEmail = (data) => {
    return ({
        type: ADD_EMAIL,
        payload: data
    })
}


export const getTemplates = (data) => {
    return ({
        type: GET_TEMPLATES,
        payload: data
    })
}

export const addTemplate = (data) => {
    return ({
        type: ADD_TEMPLATE,
        payload: data
    })
}

export const deleteTemplate = (data) => {
    return ({
        type: DELETE_TEMPLATE,
        payload: data
    })
}

export const updateTemplate = (data) => {
    return ({
        type: UPDATE_TEMPLATE,
        payload: data
    })
}