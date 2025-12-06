export const BASE_URL = 'http://localhost:8080/';

// URLs related to employee.
export const ADD_ADMIN = 'employee/addAdmin';
export const LOGIN = 'employee/login';
export const ALL_EMPLOYEE = 'employee/all';
export const ALL_ORGANIZATION_EMPLOYEE = 'employee/allOrganizationEmployee';
export const ADD_EMPLOYEE = 'employee/addEmployee';
export const ALL_MANAGER = 'employee/allManager';
export const ALL_MANAGER_FOR_PROJECT = 'employee/allManagerForProject';
export const ASSIGN_PROJECT_TO_MANAGER = 'employee/assignProjectToManager/';
export const GET_EMPLOYEE_BY_EMAIL = 'employee/getEmployeeByEmail/';
export const ASSIGN_PROJECT_TO_EMPLOYEE = 'employee/assignProjectToEmployee/';
export const UPDATE_SKILLS = 'employee/updateSkills/';
export const FILTERED_EMPLOYEE = 'employee/filteredEmployee';
export const UNASSIGN_PROJECT_TO_EMPLOYEE = 'employee/unAssignProjectToEmployee/';



//URLs related to project.
export const ADD_PROJECT = 'project/addProject';
export const GET_ALL_PROJECT = 'project/getAllProject';
export const GET_PROJECT_BY_MANAGER_ID = 'project/getProjectByManagerId/';
export const GET_PROJECT_BY_ID = 'project/getProjectById/';
export const GET_ALL_PROJECT_BY_MANAGER_EMAIL = 'project/getAllProjectByManagerEmail/';


//URLs related to request resource.
export const ADD_REQUEST = 'requestResource/addRequest';
export const CHECK_REQUEST_RESOURCE = 'requestResource/checkRequestResource';
export const GET_ALL_REQUEST_RESOURCE = 'requestResource/getAllRequestResource';
export const DELETE_REQUEST = 'requestResource/deleteRequest/';
export const ACCEPT_REQUEST = 'requestResource/acceptRequest';