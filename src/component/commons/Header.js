import React, { useEffect, useState } from "react";
import { BellIcon, XIcon, MenuIcon } from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Image from "./Image";

const variants = {
  start: { y: 100, x: "-50%", transition: { duration: 0.5 } },
  stop: { y: -100, x: "-50%", transition: { repeatDelay: 3 } },
};

const Modal = ({ handleClose, show, username }) => {
  const modal = "fixed top-0 left-0 w-full h-full bg-black/[0.6]";

  // const redirect = (e, path) => {
  //   e.preventDefault();
  //   // Router.push(path);
  // };

  return (
    <AnimatePresence>
      <div className={modal + ` ${show ? "block" : "hidden"}`} style={{ zIndex: 1 }}>
        <motion.section variants={variants} animate={show ? "start" : "stop"} className="profile-modal">
          <div className="flex items-center justify-between ">
            <p className="text-xl">Account</p>
            <button onClick={handleClose}>
              <XIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-5 my-5 ">
            <div className="h-15 w-15 border-pink-500 border-4 rounded-full">
              <Image
                className="rounded-full bg-black cursor-pointer hover:opacity-75"
                src={`https://avatars.dicebear.com/api/pixel-art/${username}.svg`}
                layout="fill"
              />
            </div>

            <div className="font-bold text-xl text-emerald-500">{username}</div>
          </div>
          {/* <div className="flex flex-col px-5 py-3 my-2 gap-2.5 text-gray-600">
            <p className="flex gap-2.5 cursor-pointer" onClick={(e) => redirect(e, "/mycourse/learning")}>
              <BookOpenIcon className="w-6 h-6" /> My Courses
            </p>
            <p className="flex gap-2.5 cursor-pointer" onClick={(e) => redirect(e, "/profile")}>
              <UserCircleIcon className="w-6 h-6" /> View Profile
            </p>
          </div> */}
          <button
            onClick={() => {
              signOut(auth);
            }}
            className="bg-blue-600 rounded-md py-2 w-full font-bold text-white"
          >
            Logout
          </button>
        </motion.section>
      </div>
    </AnimatePresence>
  );
};

function Header({ IconButton, onSidebarHide }) {
  const [show, onModal] = useState(false);
  const [users, setUsers] = useState({});
  const [user, setUser] = useState({});

  const usersCollection = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, setUser);

    const getUser = async () => {
      const data = await getDocs(usersCollection);
      const usr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(usr.find((r) => r.id === user.uid));
    };
    getUser();
  }, []);

  return (
    <div
      className={`px-3.5 py-0 flex justify-evenly w-full bg-[#f8f8f8] dark:bg-[#181818] items-center border-b-1 border-b-[#e7e7e7] dark:border-b-black/[.06] shadow-material`}
    >
      <div className="w-full sm:flex p-2 items-end">
        <div className="sm:flex-grow flex justify-between">
          <IconButton icon={MenuIcon} className="block sm:hidden w-7 h-7 cursor-pointer" onClick={onSidebarHide} />
        </div>
      </div>
      <div className="flex-grow pr-5 pl-10 py-2" />
      <div className="flex justify-evenly items-center gap-5">
        <div className="relative px-3 py-2">
          <BellIcon className="w-6 h-6 cursor-pointer" />
          <div className="absolute top-0 right-1.5 cursor-pointer bg-red-600 text-white rounded-xl px-1.5 text-sm font-bold">
            5
          </div>
        </div>
        <div
          className={`flex justify-between items-center gap-3 bg-[#f8f8f8] dark:bg-[#171717] px-3 py-2 rounded-lg cursor-pointer`}
          onClick={(e) => {
            e.preventDefault();
            onModal((s) => !s);
          }}
        >
          <div className="font-bold text-emerald-500">{users?.name?.substring(0, 9) || "user.."}</div>

          <div className="relative h-15 w-15 lg:mx-auto border-pink-500 border-4 rounded-full">
            <Image
              className="rounded-full bg-black cursor-pointer hover:opacity-75"
              src={`https://avatars.dicebear.com/api/pixel-art/${users?.name || "user"}.svg`}
              layout="fill"
            />
          </div>
        </div>
      </div>
      <Modal show={show} handleClose={() => onModal((s) => !s)} username={users?.name || ""} />
    </div>
  );
}

export default Header;
