import React, { useState, useEffect } from "react";
import FormWizard from "./FormWizard";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";

function OnboardForm() {
  const [show, onStart] = useState(true);
  const [user, setUser] = useState({ name: "user" });
  const [entity, setEntity] = useState({});

  onAuthStateChanged(auth, setEntity);
  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(usersCollection);
      const users = await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUser(users.find((r) => r.id === entity.uid));
    };
    getUser();
  }, []);

  return (
    <>
      <div className="h-auto w-full mt-10 rounded p-5 bg-[#f8f8f8] dark:bg-[#181818] border border-[#e7e7e7] dark:border-black/[.06] shadow-material">
        {show ? (
          <>
            <h1 className="text-3xl font-semibold dark:text-slate-300">Hello, {user?.name}</h1>
            <p className="mt-5 first-letter:pl-20 space-x-2 text-lg dark:text-slate-400 tracking-wide">
              <strong>Welcome onboard!</strong> We are one of the fastest growing digital business enablement. As a
              people centric, we take pride in our hyper collaborative and innovative work culture supported by our
              best-in-class policies and standards. We promote knowledge sharing by self-development. Enough said about
              us.
              <strong>Help us get to know more about you.</strong>
            </p>

            <div className="flex flex-col md:flex-row gap-3 mt-5 justify-center items-center">
              {/* <!-- Information Modal --> */}
              <div className="md:w-1/3 sm:w-full rounded-lg shadow-lg bg-white dark:bg-[#1e253b] my-3">
                <div className="flex justify-between border-b border-gray-100 dark:border-[#2b2b2b]  px-5 py-4">
                  <div>
                    <i className="fas fa-exclamation-circle text-blue-500"></i>
                    <span className="font-bold text-gray-700 dark:text-slate-200 text-lg">Onboarding Form</span>
                  </div>
                  <div>
                    <button>
                      <i className="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i>
                    </button>
                  </div>
                </div>

                <div className="px-10 py-5 text-gray-600 dark:text-slate-400">
                  We will be taking you through few questions, so that we get to know you more. Input fields that are
                  marked with <span style={{ color: "red" }}>*</span> cannot be skipped.
                </div>

                <div className="px-5 py-4 flex justify-end">
                  <button
                    onClick={(e) => onStart(false)}
                    className="bg-blue-600 hover:bg-blue-700 mr-1 rounded text-sm font-bold py-2 px-3 text-white transition duration-150"
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* <!-- Warning Modal --> */}
              <div className="md:w-1/3 sm:w-full rounded-lg shadow-lg bg-white dark:bg-[#1e253b] my-3">
                <div className="flex justify-between border-b border-gray-100 dark:border-[#2b2b2b] px-5 py-4">
                  <div>
                    <i className="fa fa-exclamation-triangle text-orange-500"></i>
                    <span className="font-bold text-gray-700 dark:text-slate-200 text-lg">Talk to Alan</span>
                  </div>
                  <div>
                    <button>
                      <i className="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i>
                    </button>
                  </div>
                </div>

                <div className="px-10 py-5 text-gray-600 dark:text-slate-400">
                  Start a conversation, with our buddy Alan. He will guide you through the form, so that we can make the
                  process easy
                </div>

                <div className="px-5 py-4 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 mr-1 rounded text-sm py-2 px-3 text-white font-bold transition duration-150">
                    Chat
                  </button>
                  {/* <button className="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150">OK</button> */}
                </div>
              </div>

              {/* <!-- Error Modal --> */}
              <div className="md:w-1/3 sm:w-full rounded-lg shadow-lg bg-white dark:bg-[#1e253b] my-3">
                <div className="flex justify-between border-b border-gray-100 dark:border-[#2b2b2b] px-5 py-4">
                  <div>
                    <i className="fa fa-exclamation-triangle text-red-500"></i>
                    <span className="font-bold text-gray-700 dark:text-slate-200 text-lg">Gamified (walk in park)</span>
                  </div>
                  <div>
                    <button>
                      <i className="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i>
                    </button>
                  </div>
                </div>

                <div className="px-10 py-5 text-gray-600 dark:text-slate-400">
                  We will litrally be walking through few questions so that we can get to know you more. Confused? no
                  worries let's get startd
                </div>

                <div className="px-5 py-4 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 mr-1 rounded text-sm font-bold py-2 px-3 text-white transition duration-150">
                    Let's Play
                  </button>
                  {/* <button className="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150">OK</button> */}
                </div>
              </div>
            </div>
          </>
        ) : (
          <FormWizard />
        )}
      </div>
    </>
  );
}

export default OnboardForm;
