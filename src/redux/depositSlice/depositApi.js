import axiosInstance from "../../utils/axiosInstance";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc, collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../../config2/firebase";
import {
  depositStart,
  depositSuccess,
  depositFail,
  getDepositStart,
  getDepositSuccess,
  getDepositFail,
  paymentMedthodSuccess,
  //!upload
  getFileUpoadSuccess,
} from "./index";

export const createDeposit = async ({ amount, fullName, method, tellerImg, userId }, dispatch) => {
  const user = auth?.currentUser;

  // console.log(amount, fullName, method, userId, tellerImg, "create Deposit");
  dispatch(depositStart());
  try {
    const docRef = await addDoc(collection(db, "depositCol"), {
      amount,
      fullName,
      method,
      tellerImg,
      userId: user?.uid,
      timeStamp: serverTimestamp(),
    });
    console.log(docRef, "create Deposit");
    if (docRef) {
      dispatch(depositSuccess(docRef));
      window.location.reload();
    }
  } catch (error) {
    dispatch(depositFail(error.message));
    console.log(error);
  }
};

export const getAllPaymentMethod = async (dispatch) => {
  const getPaymentMethodRef = collection(db, "payment-method");
  try {
    const data = await getDocs(getPaymentMethodRef);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(paymentMedthodSuccess(filterData));
  } catch (error) {
    console.log(error.message);
  }
};

//get depossit
export const allDeposit = async (dispatch) => {
  const getAllDepositRef = collection(db, "depositCol");
  // console.log(user, "api");
  dispatch(getDepositStart());
  try {
    const data = await getDocs(getAllDepositRef);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(getDepositSuccess(filterData));
    console.log(filterData, "deposit");
  } catch (error) {
    dispatch(getDepositFail(error.message));
    console.log(error);
  }
};
