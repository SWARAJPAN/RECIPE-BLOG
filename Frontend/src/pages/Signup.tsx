import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

type Props = {};

type State = {
  username: string;
  email: string;
  password: string;
  successful: boolean;
  message: string;
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val && val.toString().length >= 3 && val.toString().length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val && val.toString().length >= 6 && val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }

  handleRegister(formValue: {
    username: string;
    email: string;
    password: string;
  }) {
    const { username, email, password } = formValue;

    this.setState({
      message: "",
      successful: false,
    });
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      username: "",
      email: "",
      password: "",
    };

    return (
      <div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div>
                    <label htmlFor='username'> Username </label>
                    <Field name='username' type='text' />
                    <ErrorMessage name='username' component='div' />
                  </div>

                  <div>
                    <label htmlFor='email'> Email </label>
                    <Field name='email' type='email' />
                    <ErrorMessage name='email' component='div' />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='password'> Password </label>
                    <Field name='password' type='password' />
                    <ErrorMessage name='password' component='div' />
                  </div>

                  <div>
                    <button type='submit'>Sign Up</button>
                  </div>
                </div>
              )}

              {message && (
                <div>
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role='alert'
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
