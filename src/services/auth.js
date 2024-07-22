import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

const usersRef = collection(db, "user");

export const login = async (email, password) => {
  const token = uuidv4();
  const q = query(
    usersRef,
    where("email", "==", email),
    where("password", "==", password)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return false;
  }

  for (const doc of querySnapshot.docs) {
    if (doc.exists()) {
      const userData = doc.data();
      localStorage.setItem("token", token);
      localStorage.setItem("role", userData.role);
      localStorage.setItem("email", userData.email);
      return userData;
    }
  }

  return false;
};
