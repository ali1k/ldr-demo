export default {
    //full page title
    appFullTitle: ['Linked Data Reactor'],
    //short page title
    appShortTitle: ['LD-R'],
    //Default Named Graph under observation, if not set , will consider all existing graph names
    defaultGraphName: ['http://ld-r.org/datasets/void'],
    //will prevent access if not logged in
    enableAuthentication: 0,
    //graph that stores users data, must be loaded beforehand
    authGraphName: ['http://ld-r.org/users'],
    //the domain name under which basic dynamic resources and user resources will be defined
    baseResourceDomain: ['http://ld-r.org'],
    //will allow super users to confirm and activate regiastered users
    enableUserConfirmation: 1,
    //will enable email notifications
    enableEmailNotifications: 1,
    //will put all update actions in log folder
    enableLogs: 1
};
