"use client";

import { useEffect, useState } from "react";

import { socket } from "./socket";

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    function onConnected(message: string) {
      setMessage(message);
    }

    socket.on("connected", onConnected);

    socket.connect();

    return () => {
      socket.off("connected", onConnected);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <span>{message ?? "Não conectado"}</span>
    </div>
  );
}
