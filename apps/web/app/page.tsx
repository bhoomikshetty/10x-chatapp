"use client"

import React, { useState } from 'react';
import styles from './page.module.css';
import { useSocket } from './context/SocketProvider';

const Home = () => {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  return (<>

    <div>
      <h2>Chat Messages</h2>

      <div className="container darker">

        <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
        <span className="time-left">11:05</span>
        <button onClick={async (e) => {
          e.preventDefault();
          await socket.sendMessage("e.currentTarget.value")
        }}>
          Click
        </button>
      </div>

    </div>
  </>);
}

export default Home;