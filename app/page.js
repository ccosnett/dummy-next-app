"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null); // This state is client-side only
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:1066");

    socket.onopen = () => {
      console.log("WebSocket connected");
      setStatus("Connected");
    };

    socket.onmessage = (event) => {
      console.log("Received data:", event.data);
      setData(event.data); // Only update state on the client
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("Error");
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
      setStatus("Disconnected");
    };

    return () => socket.close(); // Clean up WebSocket connection
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>WebSocket Integration</h1>
      <p>Status: {status}</p>
      <p>Data: {data || "This is a minimal next.js app running in replit simultaneously to dojo. I don't yet know how to print the some data from the port on localhost. but at least it's connected"}</p>
    </div>
  );
}