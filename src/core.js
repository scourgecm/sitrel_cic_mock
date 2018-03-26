var { Map } = require('immutable');
var exports = module.exports = {};

exports.login = (userMap, user) => {
    var userInfo = {
        name: user.name,
        campaign: undefined,
        break: false
    }
    var users = userMap ? userMap.set(user.name, userInfo) : Map([[user.name, userInfo]]);
    return users;
}

exports.logout = (userMap, userName) => {
    return userMap.delete(userName);
}

exports.getStatus = (userMap, userName) => {
    return userMap.get(userName);
}

exports.campaignList = (state) => {
    return state.get('campaigns').map((val, idx) => val.get('id'));
}

exports.requestBreak = (userState, user) => {
    return userState.updateIn([user, 'break'], val => true);
}

exports.endBreak = (userState, user) => {
    return userState.updateIn([user, 'break'], val => false);
}