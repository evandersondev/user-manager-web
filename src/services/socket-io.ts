import { io } from 'socket.io-client';

export function socketConnection() {
  if (io.connected) {
    return io;
  }

  const connection = io.connect('http://localhost:3000');

  return connection;
}
