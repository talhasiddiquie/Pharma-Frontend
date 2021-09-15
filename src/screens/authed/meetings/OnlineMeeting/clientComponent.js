import React, { useEffect, useState } from "react";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "https://192.168.100.8:3001";


// import io from 'socket.io-client'
// const socket = io.connect('https://localhost:3001' , {secure: true})


export default function ClientComponent() {
  // const [response, setResponse] = useState("");

  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT);
    // socket.on("join", data => {
    //   // setResponse(data);
    //   console.log(data , 'data')
    // });
    // socket.emit('join', { username: 'Umar Khan', meetingId: 'id' }, ({ meetingId, currentSlideId }) => {
      // setCurrentSlideId(currentSlideId);
      
  // });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}