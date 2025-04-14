// import { io } from "socket.io-client";

// const isBrowser = typeof window !== "undefined";

// export const socket = isBrowser ? io() : {};

import { io } from 'socket.io-client';

let socket;

export const getSocket = (username, roomID) => {
 
  if (!socket && typeof window !== 'undefined') {
    socket = io(`https://jacksonvillians.com?username=${username}&roomID=${roomID}`, {
      // withCredentials: true,
      transports: ["websocket"]
    });
  }
  return socket;
};