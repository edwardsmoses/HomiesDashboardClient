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
  password: isRequired("password")
});

export const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);

  const { login } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch(error => ({
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
            content="Login| Homies Dashboard"
            color="teal"
            textAlign="center"
          ></Header>
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
            <ErrorMessage
              error={submitError}
              text="It seems your email or password is incorrect."
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            color="teal"
            content="Login"
            fluid
            loading={submitting}
          />
        </Form>
      )}
    />
  );
};
