import React from "react";
import {Link} from "react-router-dom";
import {
    createStyles,
    Fab,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
    Tooltip
} from "@material-ui/core";
import {
    CONCEPT_CLASSES,
    PREFERRED_SOURCES_VIEW_ONLY,
    useAnchor
} from "../../../utils";
import {Add as AddIcon} from "@material-ui/icons";

interface Props {
    canModifyDictionary: boolean;
    canModifySource: boolean;
    containerUrl: string;
    gimmeAUrl: Function;
    linkedSource?: string;
    preferredSource: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            textDecoration: "none",
            color: "inherit",
            width: "100%"
        },
        largerTooltip: {
            fontSize: "larger"
        }
    })
);

const AddConceptsIcon: React.FC<Props> = ({
                                              canModifyDictionary,
                                              canModifySource,
                                              containerUrl,
                                              gimmeAUrl,
                                              linkedSource,
                                              preferredSource
                                          }) => {
    const classes = useStyles();

    const [
        addNewAnchor,
        handleAddNewClick,
        handleAddNewClose
    ] = useAnchor();
    const [
        customAnchor,
        handleCustomClick,
        handleCustomClose
    ] = useAnchor();
    const [
        importExistingAnchor,
        handleImportExistingClick,
        handleImportExistingClose
    ] = useAnchor();

    return (
        <>
            {!(canModifyDictionary || canModifySource) ? null : (
                <>
                    {canModifyDictionary ?
                        <Tooltip title="Add concepts">
                            <Fab onClick={handleAddNewClick} color="primary" className="fab">
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                        : <Tooltip title="Create custom concept">
                            <Fab onClick={e => {
                                handleCustomClick(e);
                                handleAddNewClose();
                            }} color="primary" className="fab">
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    }
                    {!canModifyDictionary ? null : (
                        <Menu
                            anchorEl={addNewAnchor}
                            keepMounted
                            open={Boolean(addNewAnchor)}
                            onClose={handleAddNewClose}
                        >
                            <MenuItem
                                onClick={e => {
                                    handleImportExistingClick(e);
                                    handleAddNewClose();
                                }}
                            >
                                Import existing concept
                            </MenuItem>
                            <Tooltip
                                interactive
                                title={
                                    linkedSource ? (
                                        ""
                                    ) : (
                                        <span className={classes.largerTooltip}>
                    This dictionary doesn't have a linked source attached to it.
                    You'll need to{" "}
                                            <Link
                                                to={`${containerUrl}edit/?createLinkedSource=true&next=${gimmeAUrl()}`}
                                            >
                      create one
                    </Link>{" "}
                                            to keep your custom concepts.
                  </span>
                                    )
                                }
                            >
              <span>
                <MenuItem
                    disabled={!linkedSource}
                    onClick={e => {
                        handleCustomClick(e);
                        handleAddNewClose();
                    }}
                >
                  Create custom concept
                </MenuItem>
              </span>
                            </Tooltip>
                        </Menu>
                    )}
                </>
            )}

            <Menu
                anchorEl={customAnchor}
                keepMounted
                open={Boolean(customAnchor)}
                onClose={handleCustomClose}
            >
                {CONCEPT_CLASSES.slice(0, 9).map((conceptClass, index) => (
                    <MenuItem onClick={handleCustomClose} key={index}>
                        <Link
                            className={classes.link}
                            to={canModifySource ? `${containerUrl}concepts/new/?conceptClass=${conceptClass}` : `${linkedSource}concepts/new/?conceptClass=${conceptClass}&linkedDictionary=${containerUrl}`}
                        >
                            {conceptClass} Concept
                        </Link>
                    </MenuItem>
                ))}
                <MenuItem onClick={handleCustomClose}>
                    <Link
                        className={classes.link}
                        to={canModifySource ? `${containerUrl}concepts/new/` : `${linkedSource}concepts/new/?linkedDictionary=${containerUrl}`}
                    >
                        Other kind
                    </Link>
                </MenuItem>
            </Menu>
            <Menu
                anchorEl={importExistingAnchor}
                keepMounted
                open={Boolean(importExistingAnchor)}
                onClose={handleImportExistingClose}
            >
                <MenuItem onClick={handleImportExistingClose}>
                    <Link
                        className={classes.link}
                        to={`${PREFERRED_SOURCES_VIEW_ONLY[preferredSource]}concepts/?addToDictionary=${containerUrl}`}
                    >
                        Pick concepts
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleImportExistingClose}>
                    <Link
                        className={classes.link}
                        to={`${containerUrl}add/?fromSource=${preferredSource}`}
                    >
                        Add bulk concepts
                    </Link>
                </MenuItem>
            </Menu>
        </>
    );
};

export default AddConceptsIcon;
