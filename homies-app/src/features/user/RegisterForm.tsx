import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/modules/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { ErrorMessage } from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  email: isRequired("email"),
  displayName: isRequired("displayName"),
  userName: isRequired("userName"),
  password: isRequired("password")
});

export const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);

  const { register } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,

        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Sign Up | Homies Dashboard"
            color="teal"
            textAlign="center"
          ></Header>

          <Field
            name="userName"
            component={TextInput}
            placeholder="Your User-Name"
          />
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Your Display Name"
          />

          <Field
            name="email"
            component={TextInput}
            placeholder="Your Email Address"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Your Password"
          />

          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            color="teal"
            content="Sign Up"
            fluid
            loading={submitting}
          />
        </Form>
      )}
    />
  );
};
