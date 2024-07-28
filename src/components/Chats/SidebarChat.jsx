import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { realtimeDb } from "../../../firebaseConfig";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const SidebarChat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [userNames, setUserNames] = useState({});

  const fetchUserData = async (userIds) => {
    const db = getFirestore();
    const users = {};

    await Promise.all(
      userIds.map(async (id) => {
        const userDoc = await getDoc(doc(db, "user", id));
        if (userDoc.exists()) {
          users[id] = userDoc.data().name; // Sesuaikan dengan field nama di Firestore
        }
      })
    );

    return users;
  };

  useEffect(() => {
    const dbRef = ref(realtimeDb, "chats");

    const handleValueChange = async (snapshot) => {
      const chats = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        chats.push({
          id: childSnapshot.key,
          ...childData,
        });
      });

      // Menyortir chat rooms sehingga ongoing muncul sebelum done
      const sortedChats = chats.sort((a, b) => {
        if (a.chatStatus === "ongoing" && b.chatStatus !== "ongoing") return -1;
        if (a.chatStatus !== "ongoing" && b.chatStatus === "ongoing") return 1;
        return 0;
      });

      setChatRooms(sortedChats);

      const userIds = new Set();
      sortedChats.forEach((chat) => {
        userIds.add(chat.members.pakar);
        userIds.add(chat.members.tenant);
      });

      const users = await fetchUserData(Array.from(userIds));
      setUserNames(users);
    };

    const unsubscribe = onValue(dbRef, handleValueChange);

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="border-r bg-green-200 w-full max-h-[calc(100vh-172px)] overflow-y-scroll scrollbar-hide flex-grow">
      <div className="w-full h-15 sticky top-0 left-0 right-0 z-9999 bg-tertiary flex justify-center align-middle items-center">
        <h1 className="text-xl font-bold text-white">Percakapan</h1>
      </div>
      <div className="p-1">
        {chatRooms.map((chat) => (
          <Link
            key={chat.id}
            to={`/dashboard-admin/chats/${chat.id}/${chat.members.pakar}/${chat.members.tenant}`}
          >
            <div className="flex-grow gap-y-1 overflow-auto rounded-md mb-2">
              <div className="py-2 px-5 flex justify-start items-center gap-x-5 bg-tertiary text-white hover:bg-quaternary">
                {/* <div className="w-13 h-13 bg-sky-200 rounded-full"></div> */}
                <div>
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold">Pakar</h1>
                    <div className="flex items-center justify-end gap-2">
                      <span>
                        {chat.chatStatus === "done" ? (
                          <IoCheckmarkDoneCircleSharp className="text-green-600" />
                        ) : (
                          <FaClock className="text-yellow-400" />
                        )}
                      </span>
                      {chat.chatStatus}
                    </div>
                  </div>
                  <p className="truncate w-56">
                    {userNames[chat.members.pakar] || "Unknown Pakar"}
                  </p>
                  <h1 className="text-xl font-bold">Tenant</h1>
                  <p className="truncate w-56">
                    {userNames[chat.members.tenant] || "Unknown Tenant"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarChat;
