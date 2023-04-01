import axiosInstance from "../../utils/axiosInstance";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../config2/firebase";
import {
  authUserStart,
  authUserSuccess,
  authUserFail,
  //register user
  registerUserStart,
  registerUserSuccess,
  registerUserFail,
  //get user
  getUsersStart,
  getUsersSuccess,
  getUsersFail,
} from "./index";

export const authUsersLogin = async ({ email, password }, dispatch) => {
  console.log(email, password, "api");
  dispatch(authUserStart());
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("jwt", res.user.accessToken);
    console.log(res, "userAuth");
    dispatch(authUserSuccess(res));
    window.location.reload();
  } catch (error) {
    dispatch(authUserFail(error.message));
    console.log(error.message);
  }
};

export const registerUser = async ({ name, email, password, phoneNumber, homeAddress }, dispatch) => {
  // console.log(name, email, password, phoneNumber, homeAddress, "reateuser");
  dispatch(registerUserStart());
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      phoneNumber,
      homeAddress,
      timeStamp: serverTimestamp(),
    });
    console.log(result, "registerNo data");
    dispatch(registerUserSuccess(result));
    window.location.reload();
  } catch (error) {
    dispatch(registerUserFail(error));
    console.log(error);
  }
};

//get users
export const getAllUserInfo = async (dispatch) => {
  dispatch(getUsersStart());
  const getUsersRef = collection(db, "users");
  try {
    const data = await getDocs(getUsersRef);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(filterData, "filterData");
    dispatch(getUsersSuccess(filterData));
  } catch (error) {
    dispatch(getUsersFail(error));
    console.log(error);
  }
};

// export const authUsersLogin = async (user, dispatch) => {
//   console.log(user, "api");
//   dispatch(authUserStart());
//   try {
//     const res = await axiosInstance.post("api/auth/local", user);
//     console.log(res.data, "userAuth");
//     localStorage.setItem("jwt", res.data.jwt);
//     dispatch(authUserSuccess(res.data));
//     window.location.reload();
//   } catch (error) {
//     dispatch(authUserFail(error.message));
//     console.log(error);
//   }
// };
//get user details
export const getUserInfo = async (dispatch) => {
  // console.log(user, "api");
  try {
    const res = await axiosInstance.get("api/users/me");
    dispatch(getUserDetails(res.data));
    // console.log(res.data, "users");
  } catch (error) {
    // dispatch(authUserFail(error.message));
    console.log(error);
  }
};
