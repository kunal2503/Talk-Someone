import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    // Initialize socket connection
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
      query: { userId: user.id },
    });

    setSocket(newSocket);

    // Emit user-Online event on connect
    newSocket.on("connect", () => {
      newSocket.emit("user-Online", user.id);
      console.log("Socket connected and user-Online emitted");
    });

    // Handle tab/window close or unload to emit offline status
    const handleBeforeUnload = () => {
      newSocket.emit("disconnecting");
      newSocket.disconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (newSocket.connected) {
        newSocket.emit("disconnecting");
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
