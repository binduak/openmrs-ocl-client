import React, { useEffect, useRef } from "react";
import {
    Button,
    FormControl,
    InputLabel, ListSubheader,
    makeStyles,
    MenuItem,
    Typography
} from "@material-ui/core";
import {
    getCustomErrorMessage,
    getPrettyError,
    LOCALES,
    CONTEXT
} from "../../../utils";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import { snakeCase } from "lodash";

import { Source } from "../types";
import { APIOrg, APIProfile } from "../../authentication";
import * as Yup from "yup";

interface Props {
    onSubmit?: Function;
    loading: boolean;
    status?: string;
    profile?: APIProfile;
    usersOrgs: APIOrg[];
    errors?: {};
    savedValues?: Source;
    context?: string;
}

const initialValues: Source = {
    name: "",
    short_code: "",
    source_type: "",
    description: "",
    public_access: "",
    default_locale: "",
    supported_locales: [],
    owner_url:""
};

const SourceSchema = Yup.object().shape<Source>({
    name: Yup.string().required("Source name is required"),
    short_code: Yup.string()
        .required("Short code is required")
        .matches(/^[a-zA-Z0-9\-.]+$/, "Alphanumeric characters, - and . only"),
    description: Yup.string().min(0),
    public_access: Yup.string().required(
        "Select who will have access to this dictionary"
    ),
    source_type:Yup.string(),
    default_locale: Yup.string().required("Select a preferred language"),
    supported_locales: Yup.array(Yup.string())
});

const useStyles = makeStyles({
    sourceForm: {
        padding: "2vh 2vw"
    },
    submitButton: {
        textAlign: "center"
    }
});

const SourceForm: React.FC<Props> = ({
                                             onSubmit,
                                             loading,
                                             status, // todo start using this to show action progress
                                             profile,
                                             usersOrgs,
                                             errors,
                                             context = CONTEXT.view,
                                             savedValues
                                         }) => {
    const classes = useStyles();
    const viewing = context === CONTEXT.view;
    const editing = context === CONTEXT.edit;
    const formikRef: any = useRef(null);

    useEffect(() => {
        const { current: currentRef } = formikRef;
        if (currentRef) {
            currentRef.setSubmitting(loading);
        }
    }, [loading]);

    useEffect(() => {
        const { current: currentRef } = formikRef;
        if (currentRef) {
            currentRef.setStatus(status);
        }
    }, [status]);

    useEffect(() => {
        const { current: currentRef } = formikRef;
        if (!currentRef) return;

        Object.keys(initialValues).forEach(key => {
            const error = getPrettyError(
                errors,
                snakeCase(key === "short_code" ? "id" : key) // id and short_code are the same value. error comes back in id
            );
            if (error) currentRef.setFieldError(key, error);
        });
    }, [errors]);

    const supportedLocalesLabel = (values: any) => {
        const labels: Array<JSX.Element> = [];
        LOCALES.filter(
            ({ value }) => value !== values.default_locale
        ).map(({ value, label }) => (
            labels.push(
                <MenuItem key={value} value={value} style={{whiteSpace: 'normal'}}>
                    { label }
                </MenuItem>
            )
        ))
        return labels;
    };
    const apiErrorStatusCode = {
        403: `You don't have permission to ${context} a source in this Organisation`
    };
    let error: string | undefined = getCustomErrorMessage(
        getPrettyError(errors),
        apiErrorStatusCode
    );
    const anyError = () =>{
        return error ? (
            <Typography color="error" variant="caption" component="span">
                {error}
            </Typography>
        ) :  <br />
    };
    const isViewing = (isSubmitting: boolean) => {
        return viewing ? "": (
            <div className={classes.submitButton}>
                {anyError()}
                <br />
                <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
            </div>
        )
    };

    return (
        <div id="source-form" className={classes.sourceForm}>
            <Formik
                ref={formikRef}
                initialValues={savedValues || initialValues}
                validateOnChange={false}
                validationSchema={SourceSchema}
                onSubmit={(values: Source) => {
                    if (onSubmit) onSubmit(values);
                }}
            >
                {({isSubmitting,values }) => (
                    <Form>
                        <Field
                            // required
                            fullWidth
                            autoComplete="off"
                            id="name"
                            name="name"
                            label="Source Name"
                            margin="normal"
                            multiline
                            rowsMax={4}
                            component={TextField}
                        />
                        <Field
                            // required
                            fullWidth
                            autoComplete="off"
                            id="short_code"
                            disabled={editing || isSubmitting}
                            name="short_code"
                            label="Short Code"
                            margin="normal"
                            multiline
                            rowsMax={4}
                            component={TextField}
                        />
                        <Field
                            fullWidth
                            multiline
                            rowsMax={4}
                            id="description"
                            name="description"
                            label="Description"
                            margin="normal"
                            component={TextField}
                        />
                        <FormControl
                            fullWidth
                            // required
                            margin="normal"
                        >
                            <InputLabel htmlFor="owner_url">Owner</InputLabel>
                            <Field
                                value=""
                                disabled={editing || isSubmitting}
                                name="owner_url"
                                id="owner_url"
                                multiline
                                rowsMax={4}
                                component={Select}
                            >
                                {profile ? (
                                    <MenuItem value={profile.url}>
                                        {profile.username}(You)
                                    </MenuItem>
                                ) : (
                                    ""
                                )}
                                {usersOrgs.length > 0 ? (
                                    <ListSubheader>Your Organizations</ListSubheader>
                                ) : (
                                    ""
                                )}
                                {usersOrgs.map(org => (
                                    <MenuItem key={org.id} value={org.url}>
                                        {org.name}
                                    </MenuItem>
                                ))}
                            </Field>
                            <Typography color="error" variant="caption" component="div">
                                <ErrorMessage name="owner_url" component="span" />
                            </Typography>
                        </FormControl>
                        <FormControl
                            fullWidth
                            // required
                            margin="normal"
                        >
                        <InputLabel htmlFor="source_type">Source Type</InputLabel>
                        <Field name="source_type" id="source_type" component={Select}>
                            <MenuItem value="Dictionary">Dictionary</MenuItem>
                            <MenuItem value="Interface Terminology">Interface Terminology</MenuItem>
                            <MenuItem value="Indicator Registry">Indicator Registry</MenuItem>
                            <MenuItem value="External">External</MenuItem>
                        </Field>
                            <Typography color="error" variant="caption" component="div">
                                <ErrorMessage name="source_type" component="span" />
                            </Typography>
                        </FormControl>
                        <FormControl
                            fullWidth
                            // required
                            margin="normal"
                        >
                            <InputLabel htmlFor="public_access">Visibility</InputLabel>
                            <Field name="public_access" id="public_access" component={Select}>
                                <MenuItem value="View">Public</MenuItem>
                                <MenuItem value="None">Private</MenuItem>
                            </Field>
                            <Typography color="error" variant="caption" component="div">
                                <ErrorMessage name="public_access" component="span" />
                            </Typography>
                        </FormControl>
                        <FormControl
                            fullWidth
                            // required
                            margin="normal"
                        >
                            <InputLabel htmlFor="default_locale">
                                Preferred Language
                            </InputLabel>
                            <Field
                                name="default_locale"
                                id="default_locale"
                                component={Select}
                            >
                                {LOCALES.map(({ value, label }) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Field>
                            <Typography color="error" variant="caption" component="div">
                                <ErrorMessage name="default_locale" component="span" />
                            </Typography>
                        </FormControl>
                        <FormControl
                            fullWidth
                            // required
                            margin="normal"
                        >
                            <InputLabel htmlFor="supported_locales">
                                Other Languages
                            </InputLabel>
                            <Field
                                multiple
                                value={[]}
                                name="supported_locales"
                                id="supported_locales"
                                component={Select}
                            >
                                {supportedLocalesLabel(values)}
                            </Field>
                            <Typography color="error" variant="caption" component="div">
                                <ErrorMessage name="supported_locales" component="span" />
                            </Typography>
                        </FormControl>
                        {isViewing(isSubmitting)}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SourceForm;
