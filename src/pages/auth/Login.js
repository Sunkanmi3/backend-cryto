import React, { useState } from "react";
// import Logo23 from "../../images/logo23.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authUsersLogin } from "../../redux/authUsersSlice/authUsersApi";

const Login = () => {
  const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  const [passState, setPassState] = useState(false);
  //useSelector
  const {usersInfo: {
      usersInfoData,
      isLoading,
      error,
    },
  } = useSelector((state) => state.authUser);
  console.log(usersInfoData, isLoading, error, "users");

 


    const onFormSubmit2 = (submitData) => {
      console.log(formData, "33333")
      authUsersLogin(formData, dispatch);
      window.history.pushState(
        `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
        "auth-login",
        `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
      );
      resetForm();
      // setModal({ edit: false }, { view: false }, { add: false });
    };

     const resetForm = () => {
       setFormData({
         email: "",
         password: "",
       
       });
     };



  
  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            {/* <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-dark logo-img logo-img-lg" src={Logo23} alt="logo-dark" />
            </Link> */}
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access Backend using your email and password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {error && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  <Icon name="alert-circle" /> {error}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit2)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Name
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="lg"
                    id="default-01"
                    name="email"
                    // defaultValue="support@optisoft.ng"
                    // ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your email address or username"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {/* {error.email && <p className="invalid">This field is required</p>} */}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                    Forgot Code?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password"
                    // defaultValue="@OPT123456"
                    // ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  {/* {error && <span className="invalid">{errors.passcode.message}</span>} */}
                </div>
              </FormGroup>
              {/* //platform */}
              {/* <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Platform
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-02"
                    name="platformType"
                    ref={register({ required: "This field is required" })}
                    defaultValue="ADMIN"
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup> */}
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {isLoading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </FormGroup>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              Click here to <Link to={`${process.env.PUBLIC_URL}/auth-register`}> Sign up</Link>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
