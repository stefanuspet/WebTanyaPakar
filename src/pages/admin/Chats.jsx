import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ref, onValue, push, set, update } from "firebase/database";
import { realtimeDb, db } from "../../../firebaseConfig";
import SidebarChat from "../../components/Chats/SidebarChat";
import BubbleChatLeft from "../../components/Chats/BubbleChatLeft";
import BubbleChatRight from "../../components/Chats/BubbleChatRight";

import { AiFillMessage } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import BlankChat from "../../components/Chats/BlankChat";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Chats = () => {
  const { chatID, pakarID, tenantID } = useParams();
  const [messages, setMessages] = useState([]);
  const [send, setSend] = useState("");
  const chatEndRef = useRef(null);
  const [user, setUser] = useState({
    pakar: "",
    tenant: "",
  });

  const fetchUser = async (id, role) => {
    const docRef = doc(db, "user", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser((prevUser) => ({
        ...prevUser,
        [role]: docSnap.data().name, // Assuming the user's name field is 'name'
      }));
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchUser(pakarID, "pakar");
    fetchUser(tenantID, "tenant");
  }, [pakarID, tenantID]);

  console.log(user);

  useEffect(() => {
    const dbRef = ref(realtimeDb, `chatMessages/${chatID}`);
    onValue(dbRef, (snapshot) => {
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        messages.push({
          id: childSnapshot.key,
          ...childData,
        });
      });
      // Urutkan pesan berdasarkan timestamp
      messages.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(messages);
    });
  }, [chatID]);

  useEffect(() => {
    // Auto scroll ke bawah ketika pesan diperbarui
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateChat = async (message) => {
    const chatRef = ref(realtimeDb, `chats/${chatID}`);
    await update(chatRef, {
      lastMessage: message,
      chatStatus: "ongoing",
      lastChat: pakarID,
      lastChatStatus: "sent",
      lastTimestamp: Date.now(),
    });
  };

  const sendMessage = async (message) => {
    const messageRef = ref(realtimeDb, `chatMessages/${chatID}`);
    await push(messageRef, {
      message: message,
      sentBy: pakarID,
      timestamp: Date.now(),
    });

    updateChat(message);
  };

  const handleChange = (e) => {
    setSend(e.target.value);
  };

  const handleOnSubmit = (e) => {
    sendMessage(send);
    e.preventDefault();
    e.target.reset();
  };

  console.log(send);
  return (
    <DashboardLayout>
      <div className="w-full min-h-[calc(100vh-172px)]  rounded-md border flex flex-col">
        <div className="grid grid-cols-[0.75fr_2fr] h-full min-h-[calc(100vh-172px)]">
          <SidebarChat />
          <div className="flex flex-col h-full">
            <div className="bg-gray-300 w-full h-15 bg-tertiary flex justify-center items-center">
              <h1 className="text-xl font-bold text-white">{user.pakar}</h1>
            </div>
            <div className="px-5 min-h-[calc(100vh-232px)] relative bg-green-100">
              {chatID ? (
                <>
                  <div className="max-h-[calc(100vh-255px)] overflow-y-scroll scrollbar-hide pb-15 pt-5">
                    {messages.map((item) => (
                      <div key={item.id}>
                        {item.sentBy === pakarID ? (
                          <BubbleChatRight
                            name={user.pakar}
                            message={item.message}
                            time={new Date(item.timestamp).toLocaleString()}
                          />
                        ) : (
                          <BubbleChatLeft
                            name={user.tenant}
                            message={item.message}
                            time={new Date(item.timestamp).toLocaleString()}
                          />
                        )}
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <form
                    onSubmit={handleOnSubmit}
                    className="absolute bottom-0 left-0 right-0 z-10 flex items-center p-5"
                  >
                    <label htmlFor="simple-message" className="sr-only">
                      Send
                    </label>
                    <div className="relative w-full">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <AiFillMessage className="text-gray-400" />
                      </div>
                      <input
                        onChange={handleChange}
                        type="text"
                        id="simple-message"
                        className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5  ps-10 text-sm text-slate-500 placeholder-gray-400 outline-none"
                        placeholder="Send Your Message"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="ms-2 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <IoMdSend className="text-xl text-white" />
                    </button>
                  </form>
                </>
              ) : (
                <BlankChat />
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chats;
