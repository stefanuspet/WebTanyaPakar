import { ref, onValue } from "firebase/database";
import { realtimeDb, db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const countConsultation = (callback) => {
  const dbRef = ref(realtimeDb, "chats");

  onValue(dbRef, (snapshot) => {
    let total = 0;
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      if (childData.numberChatDone) {
        total += childData.numberChatDone;
      }
    });
    callback(total); // Call the callback function with the calculated total
  });
};

export const countUsers = async () => {
  const usersCollection = collection(db, "user");
  const snapshot = await getDocs(usersCollection);
  const count = snapshot.size;
  console.log(`Jumlah pengguna: ${count}`);

  return count;
};

export const countPakar = (callback) => {
  const dbRef = ref(realtimeDb, "users");

  onValue(dbRef, (snapshot) => {
    let total = 0;
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      if (childData.role === "pakar") {
        total += 1;
      }
    });
    callback(total); // Call the callback function with the calculated total
  });
};

export const countTenant = (callback) => {
  const dbRef = ref(realtimeDb, "users");

  onValue(dbRef, (snapshot) => {
    let total = 0;
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      if (childData.role === "admin") {
        total += 1;
      }
    });
    callback(total); // Call the callback function with the calculated total
  });
};
