import { addDoc, collection, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config2/firebase";
import {
  withdrawalStart,
  withdrawalSuccess,
  withdrawalFail,
  getWithdrawalStart,
  getWithdrawalSuccess,
  getWithdrawalFail,
} from "./index";

export const createWithdrawal = async ({ amount, method, name, userId }, dispatch) => {
  console.log(amount, method, name, userId, "create Deposit");

  const user = auth?.currentUser;
  dispatch(withdrawalStart());
  try {
    const docRef = await addDoc(collection(db, "withdrawalCol"), {
      amount,
      method,
      name,
      userId: user.uid,
      timeStamp: serverTimestamp(),
    });
    console.log(docRef, "create withwra");
    if (docRef) {
      dispatch(withdrawalSuccess(docRef));
      window.location.reload();
    }
  } catch (error) {
    dispatch(withdrawalFail(error.message));
    console.log(error);
  }
};
//get withdrawal
export const allWithdrawal = async (dispatch) => {
  const getAllWithdrawalRef = collection(db, "withdrawalCol");
  // console.log(user, "api");
  dispatch(getWithdrawalStart());
  try {
    const data = await getDocs(getAllWithdrawalRef);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(getWithdrawalSuccess(filterData));
    console.log(filterData, "withdrawal");
  } catch (error) {
    dispatch(getWithdrawalFail(error.message));
    console.log(error);
  }
};
