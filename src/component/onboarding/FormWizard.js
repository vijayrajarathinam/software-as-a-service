import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";

const xOffset = 100;
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? xOffset : -xOffset,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
  active: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.2 },
  },
  exit: (direction) => ({
    x: direction > 0 ? -xOffset : xOffset,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};

function FormWizard() {
  const [page, setPage] = React.useState(1);
  const [buttonText, setButtonText] = React.useState("Next");
  const [user, setUser] = useState({
    company_name: "",
    role: "",
    address: "",
    phone: "",
    terms_and_conditions: false,
    promotional_offers: false,
    international: false,
  });

  const [entity, setEntity] = useState({});

  onAuthStateChanged(auth, setEntity);

  async function submit() {
    const userDocRef = doc(db, "users", entity.uid);

    await updateDoc(userDocRef, user);
    // await setDoc(userDocRef, { name: user.username });
  }

  function onInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setUser((user) => ({ ...user, [target.name]: value }));
  }

  return (
    <div className="">
      <div className="mt-8">
        {/* <h2 className="mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl md:mb-6">Get in touch</h2> */}

        <p className="max-w-screen-md mx-auto text-center text-gray-500 md:text-lg">
          Please fill in the details below so that we can get in contact with you.
        </p>
      </div>
      <div className="text-gray-600 w-full">
        <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto">
          <div className="flex flex-wrap mx-auto mb-5">
            <a
              className={`
            inline-flex
            items-center
            justify-center
            w-1/2
            py-3
            font-medium
            leading-none
            tracking-wider
            border-b-2 
            rounded-t
            sm:px-6 sm:w-auto sm:justify-start
            title-font
${page == 1 ? "text-indigo-500 bg-gray-100 border-indigo-500 " : "border-gray-200 hover:text-gray-900"}
          `}
            >
              STEP 1
            </a>
            <a
              className={`
            inline-flex
            items-center
            justify-center
            w-1/2
            py-3
            font-medium
            leading-none
            tracking-wider
            border-b-2 
            sm:px-6 sm:w-auto sm:justify-start
            title-font
            ${page == 2 ? "text-indigo-500 bg-gray-100 border-indigo-500 " : "border-gray-200 hover:text-gray-900"}
            "
  `}
            >
              STEP 2
            </a>
            <a
              className={`
            inline-flex
            items-center
            justify-center
            w-1/2
            py-3
            font-medium
            leading-none
            tracking-wider
            border-b-2 
            sm:px-6 sm:w-auto sm:justify-start
            title-font
            ${page == 3 ? "text-indigo-500 bg-gray-100 border-indigo-500 " : "border-gray-200 hover:text-gray-900"}
      
          `}
            >
              STEP 3
            </a>
          </div>
          <div className="flex flex-col w-full text-center">
            <div className="py-6 bg-white sm:py-8 lg:py-12">
              <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
                {/* <!-- form - start --> */}
                <div className="max-w-screen-md mx-auto">
                  <AnimatePresence>
                    <motion.div
                      className={`${page == 1 ? "block" : "hidden"}`}
                      variants={variants}
                      animate={`${page == 1 ? "enter active" : "exit"}`}
                    >
                      <div className="flex flex-col mb-4">
                        <label for="companyname" className="inline-flex mb-2 text-sm text-gray-800">
                          Please enter your Company Name
                        </label>
                        <input
                          name="company_name"
                          value={user.company_name}
                          onChange={onInputChange}
                          className="
                    w-full
                    px-3
                    py-2
                    text-gray-800
                    border
                    rounded
                    outline-none
                    bg-gray-50
                    focus:ring
                    ring-indigo-300
                  "
                        />
                      </div>

                      <div className="flex flex-col mb-4">
                        <label for="role" className="inline-flex mb-2 text-sm text-gray-800">
                          Please enter your Role inn the company?
                        </label>
                        <input
                          name="role"
                          value={user.role}
                          onChange={onInputChange}
                          className="
                    w-full
                    px-3
                    py-2
                    text-gray-800
                    border
                    rounded
                    outline-none
                    bg-gray-50
                    focus:ring
                    ring-indigo-300
                  "
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      className={`${page == 2 ? "block" : "hidden"}`}
                      variants={variants}
                      animate={`${page == 2 ? "enter active" : "exit"}`}
                    >
                      <div className="flex flex-col mb-2">
                        <label for="address" className="inline-flex mb-2 text-sm text-gray-800">
                          Please enter your company address (optional)
                        </label>
                        <input
                          name="address"
                          value={user.address}
                          onChange={onInputChange}
                          className="
                    w-full
                    px-3
                    py-2
                    text-gray-800
                    border
                    rounded
                    outline-none
                    bg-gray-50
                    focus:ring
                    ring-indigo-300
                  "
                        />
                      </div>

                      <div className="flex flex-col mb-4">
                        <label for="phone" className="inline-flex mb-2 text-sm text-gray-800">
                          Please enter a phone number (optional)
                        </label>
                        <input
                          name="phone"
                          value={user.phone}
                          onChange={onInputChange}
                          className="
                    w-full
                    px-3
                    py-2
                    text-gray-800
                    border
                    rounded
                    outline-none
                    bg-gray-50
                    focus:ring
                    ring-indigo-300
                  "
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      className={`${page == 3 ? "block" : "hidden"}`}
                      variants={variants}
                      animate={`${page == 3 ? "enter active" : "exit"}`}
                    >
                      <fieldset>
                        <legend className="sr-only">Checkbox variants</legend>

                        <div className="flex items-center mb-4">
                          <input
                            id="checkbox-1"
                            aria-describedby="checkbox-1"
                            type="checkbox"
                            name="terms_and_conditions"
                            // value={user.terms_and_conditions}
                            onChange={onInputChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={user.terms_and_conditions}
                          />
                          <label for="checkbox-1" className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            I agree to the{" "}
                            <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                              terms and conditions
                            </a>
                          </label>
                        </div>

                        <div className="flex items-center mb-4">
                          <input
                            id="checkbox-2"
                            aria-describedby="checkbox-2"
                            type="checkbox"
                            name="promotional_offers"
                            onChange={onInputChange}
                            checked={user.promotional_offers}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-2" className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            I want to get promotional offers
                          </label>
                        </div>

                        <div className="flex items-center mb-4">
                          <input
                            id="checkbox-3"
                            aria-describedby="checkbox-3"
                            type="checkbox"
                            name="international"
                            onChange={onInputChange}
                            checked={user.international}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-3" className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Eligible for international shipping
                          </label>
                        </div>
                      </fieldset>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center justify-between">
                    <button
                      className="
                    inline-flex
                    items-center
                    px-6
                    py-2
                    text-sm text-gray-800
                    rounded-lg
                    shadow
                    outline-none
                    gap-x-1
                    hover:bg-gray-100
                  "
                      onClick={() =>
                        setPage((step) => {
                          if (step > 1) return step - 1;
                          else return step;
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Back
                    </button>
                    <button
                      className="
                    px-6
                    py-2
                    text-sm text-white
                    bg-indigo-500
                    rounded-lg
                    outline-none
                    hover:bg-indigo-600
                    ring-indigo-300
                  "
                      onClick={() =>
                        setPage((step) => {
                          if (step < 2) return step + 1;
                          else if (step == 2) {
                            setButtonText("submit");
                            return step + 1;
                          } else if (step == 3) {
                            submit();
                            return step;
                          } else return step;
                        })
                      }
                    >
                      {buttonText}
                    </button>
                  </div>
                </div>
                {/* <!-- form - end --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormWizard;
