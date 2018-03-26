var core = require('../src/core.js')
var { expect } = require('chai')
var { fromJS, Map, List } = require('immutable');

const _user = {
    name: 'tamara.olivos',
    pass: '1234',
    station: 'Tel_054',
    host: 'F2000'
};
const _userMap = Map([["vincent.vega", _user], ["jules.winnefield", _user]])

describe('Core', () => {

    describe('login', () => {
        it('creates users prop on first login', () => {
            var userState = core.login(undefined, _user);
            expect(userState).to.be.ok;
        });

        it('adds new user on login', () => {
            let userState = fromJS(_userMap);
            let newUserState = core.login(userState, _user);
            expect(newUserState.get(_user.name)).to.eql({ name: 'tamara.olivos', campaign: undefined, break: false });
        });
    });

    describe('break', () => {

        it('sets break flag to true on request', () => {
            let newUserMap = core.requestBreak(_userMap, 'vincent.vega');
            expect(newUserMap.get('vincent.vega').break).to.equal(true);
        });

        it('sets break flag to false on end', () => {
            let newUserMap = core.endBreak(_userMap, 'vincent.vega');
            expect(newUserMap.get('vincent.vega').break).to.equal(false);
        });
    });

    it('deletes user in logout', () => {
        let newUserState = core.logout(_userMap, "vincent.vega");
        expect(newUserState).to.equal(Map([["jules.winnefield", _user]]));
    });

    it('retrieves user status as object', () => {
        let userStatus = core.getStatus(_userMap, "jules.winnefield");
        expect(userStatus).to.equal(_user);
    });

    it('retrieves campaigns array', () => {
        var state = fromJS({
            campaigns: [
                { id: '20180301', ruts: [] },
                { id: '20180302', ruts: [] },
                { id: '20180303', ruts: [] },
                { id: '20180304', ruts: [] }
            ]
        });
        var campaigns = core.campaignList(state);
        expect(campaigns).to.equal(
            List.of('20180301', '20180302', '20180303', '20180304')
        );
    });

});