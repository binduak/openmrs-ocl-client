import {canModifyContainer} from '../utils';
import { USER_TYPE, ORG_TYPE } from "../../../utils";

describe('canModifyContainer', () => {
    const profile: any = {
        username: 'user'
    };

    const usersOrgs: any = {
        id: 'user'
    };

    it(' when owner type is user and \n profile username matches owner name, should return true', () => {
        expect(canModifyContainer(
            USER_TYPE,
            "user",
            profile,
            [] 
        )).toBe(true);
    });

    it('when owner type is user and \n profile username doesn`t matches owner name, should return true', () => {
        expect(canModifyContainer(
            USER_TYPE,
            "user1",
            profile,
            [] 
        )).toBe(false);
    });

    it('when owner type is org and \n current signed in user ia part of that org, should return true', () => {
        expect(canModifyContainer(
            ORG_TYPE,
            "user",
            profile,
            [usersOrgs]
        )).toBe(true);
    });

    it('when owner type is org and \n current signed in user ia part of that org, should return true', () => {
        expect(canModifyContainer(
            ORG_TYPE,
            "user1",
            profile,
            [usersOrgs]
        )).toBe(false);
    });
});