import React, {useState} from 'react';
import styles from './page.module.css';
import { useSocket } from './context/SocketProvider';

const Home = () => {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  return (<>

    <div>
      <h2>Chat Messages</h2>

      <div className="container darker">
        {/* <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" style="width:100%;"> */}
        <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
        <span className="time-left">11:05</span>
      </div>

    </div>
  </>);
}

export default Home;