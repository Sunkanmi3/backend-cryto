import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
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
import { Spinner, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/authUsersSlice/authUsersApi";
import { useDispatch } from "react-redux";
 import { ToastContainer, toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config2/firebase";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    homeAddress: "",
  });
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      homeAddress: "",
    });
  };


  const handleFormSubmit = (submitData) => {
     console.log(formData)
    registerUser(formData, dispatch)
      window.history.pushState(
        `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
        "auth-login",
        `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
      );
      // window.history.pushState(`${process.env.PUBLIC_URL/"auth-login"}`);
     resetForm();
    setModal({ edit: false }, { view: false }, { add: false });
  };

  // const handleFormSubmit = () => {
  //   // setLoading(true);
  //   // setTimeout(() => history.push(`${process.env.PUBLIC_URL}/auth-success`), 2000);
  // };
  return (
    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Register</BlockTitle>
                <BlockDes>
                  <p>Create New Account</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    // ref={register({ required: true })}
                    className="form-control-lg form-control"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="lg"
                    id="default-01"
                    name="email"
                    // ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your email address or username"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
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
                    name="passcode"
                    // ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Phone Number
                </label>
                <div className="form-control-wrap">
                  <input
                    type="number"
                    id="name"
                    name="phoneNumber"
                    placeholder="Enter your Phone number"
                    // ref={register({ required: true })}
                    className="form-control-lg form-control"
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Home Address
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="homeAddress"
                    name="homeAddress"
                    placeholder="Enter your Home Address"
                    // ref={register({ required: true })}
                    className="form-control-lg form-control"
                    onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button type="submit" color="primary" size="lg" className="btn-block">
                  {loading ? <Spinner size="sm" color="light" /> : "Register"}
                </Button>
              </FormGroup>
            </form>
            <div className="form-note-s2 text-center pt-4">
             
              Already have an account?
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Sign in instead</strong>
              </Link>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Register;
