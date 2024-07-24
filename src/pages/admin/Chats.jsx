import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
// import firebase from "firebase/app";
// import "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { ImSpinner } from "react-icons/im";
import { realtimeDb } from "../../../firebaseConfig";

const Chats = () => {
  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   const messageInput = document.querySelector("input[type='text']");
  //   const message = messageInput.value;

  //   if (message.trim()) {
  //     await realtimeDb.collection("chats").add({
  //       text: message,
  //       sender: "me",
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     });

  //     messageInput.value = "";
  //   }
  // };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const dbRef = ref(realtimeDb, "chats");

    onValue(dbRef, (snapshot) => {
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        messages.push({
          id: childSnapshot.key,
          ...childData,
        });
      });
      setMessages(messages);
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="flex overflow-hidden border relative h-72">
        <div className="absolute inset-0 bg-slate-300 z-998">
          <div className="w-full h-full flex justify-center items-center">
            {/* <svg
              className="animate-spin h-5 w-5 mr-3 "
              viewBox="0 0 24 24"
            ></svg> */}
            <ImSpinner className="animate-spin h-10 w-10 mr-3 " />
            <h1 className="text-3xl">This feature is under development</h1>
          </div>
        </div>
        {/* <div className="w-1/5 bg-white border-r border-gray-300">
          <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-[#045A5B] text-white">
            <h1 className="text-2xl font-semibold">Percakapan</h1>
            <div className="relative">
              <button id="menuButton" className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>

              <div
                id="menuDropdown"
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
              >
                <ul className="py-2 px-3">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                    >
                      Option 1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                    >
                      Option 2
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Alice</h2>
                <p className="text-gray-600">Pakar Tomat</p>
              </div>
            </div>

            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Martin</h2>
                <p className="text-gray-600">Pakar Pepaya, Jagung</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="flex-1">
          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold">Alice</h1>
          </header>

          <div className="h-screen overflow-y-auto p-4 pb-36"></div> */}
        {/* <footer className="bg-white border-t border-gray-300 p-4 absolute z-0 bottom-0 w-3/4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-[#045A5B]"
              />
              <button
                // onClick={sendMessage}
                className="bg-[#045A5B] text-white px-4 py-2 rounded-md ml-2"
              >
                Send
              </button>
            </div>
          </footer> */}
        {/* </div> */}
      </div>
    </DashboardLayout>
  );
};

export default Chats;
