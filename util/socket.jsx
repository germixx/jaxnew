// import { io } from "socket.io-client";

// const isBrowser = typeof window !== "undefined";

// export const socket = isBrowser ? io() : {};

import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
  if (!socket && typeof window !== 'undefined') {
    socket = io('https://jacksonvillians.com', {
      withCredentials: true,
    });
  }
  return socket;
};