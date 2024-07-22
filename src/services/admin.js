import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../../firebaseConfig";

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
