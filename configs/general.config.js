export default {
    //full page title
    appFullTitle: ['Linked Data Reactor'],
    //short page title
    appShortTitle: ['LD-R'],
    //Default Named Graph under observation, if not set , will consider all existing graph names
    defaultGraphName: [''],
    //will prevent access if not logged in
    enableAuthentication: 0,
    //graph that stores users data, must be loaded beforehand
    authGraphName: ['http://ld-r.org/users'],
    //the domain name under which user resources will be defined
    userResourceDomain: ['http://ld-r.org/user'],
    //will allow super users to confirm and activate regiastered users
    enableUserConfirmation: 0,
    //will enable email notifications
    enableEmailNotifications: 0,
    //will put all update actions in log folder
    enableLogs: 0
};
