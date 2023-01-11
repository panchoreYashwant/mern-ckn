import React, { createContext, useState } from "react";

export const authContext = createContext();

export default function CknContext({ children }) {
  const [pendingOrder, setPendingOrder] = useState(false);
  const [successOrder, setSuccessOrder] = useState(false);
  const [URL, setURL] = useState("http://mern-ckn.vercel.app/api");

  const [editItem, setEditItem] = useState([]);
  

  return (
    <authContext.Provider
      value={{
        pendingOrder, setPendingOrder,
        successOrder, setSuccessOrder,
        editItem, setEditItem,
        URL, setURL

      }}
    >
      {children}
    </authContext.Provider>
  );
}
