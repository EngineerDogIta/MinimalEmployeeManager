// TODO use theses to dinanmycally use the same path instead of hardcoding

const PAGES_ROUTES = {
    HOME: '/',
    // LOGIN: '/login', TODO
    // REGISTER: '/register', TODO
    // DASHBOARD: '/dashboard', TODO
    // PROFILE: '/profile', TODO
    // SETTINGS: '/settings', TODO
    // NOT_FOUND: '/404', TODO
    // SERVER_ERROR: '/500', TODO
    EMPLOYEES: '/employees',
    EMPLOYEE_CREATE: '/employee/create',
    EMPLOYEE_UPDATE_ID: '/employee/update/',
    DEPARTMENTS: '/departments',
    DEPARTMENT_CREATE: '/department/create',
    DEPARTMENT_UPDATE_ID: '/department/update/',
};

const PAGES_REDIRECT_ROUTES = {
    EMPLOYEE_CREATE_REDIRECT: '/employee/create/redirect',
    EMPLOYEE_UPDATE_REDIRECT: '/employee/update/redirect',
    DEPARTMENT_CREATE_REDIRECT: '/department/create/redirect',
    DEPARTMENT_UPDATE_REDIRECT: '/department/update/redirect',
};

module.exports = {
    PAGES_ROUTES,
    PAGES_REDIRECT_ROUTES,
};