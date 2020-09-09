import React from "react";
import {APIOrg, APIProfile} from "../../authentication";
import {ListSubheader, MenuItem} from "@material-ui/core";

interface Props {
    profile?: APIProfile;
    usersOrgs: APIOrg[];
}

const OwnerDetails: React.FC<Props> = ({
                                                 profile,
                                                 usersOrgs
                                             }) => {
    const showUserName = () => {
        return <>

        </>;
    }

    const showOrganisationHeader = () => {
        console.log("heree");
        return usersOrgs.length > 0 ? (
            <ListSubheader>Your Organizations</ListSubheader>
        ) : null;
    }

    const showUserOrganisations = () => {
        return <>
            {showOrganisationHeader}
            {usersOrgs.map(org => (
                <MenuItem key={org.id} value={org.url}>
                    {org.name}
                </MenuItem>
            ))}
        </>;
    }

    return (
        <div>
            {profile ? (
                <MenuItem value={profile.url}>
                    {profile.username}(You)
                </MenuItem>
            ) : (
                ""
            )}
            {usersOrgs.length > 0 ? (
            <ListSubheader>Your Organizations</ListSubheader>
            ) : null}
            {usersOrgs.map(org => (
                <MenuItem key={org.id} value={org.url}>
                    {org.name}
                </MenuItem>
            ))}
        </div>
    )
};

export default OwnerDetails;
