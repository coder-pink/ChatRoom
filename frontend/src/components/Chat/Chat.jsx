import {user} from "../Join/Join"
import socketIO from "socket.io-client"
import './Chat.css'
import { useEffect, useState } from "react"
import Message from "../Message/Message"
import Send from '../../assets/send.svg'
import Close from '../../assets/close.svg'
import ReactScrollToBottom from 'react-scroll-to-bottom'

// let socket;
const ENDPOINT = "http://localhost:3000/"



function Chat() {
  const [id, setId] = useState('')
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)



  const send = () => {
    if (message.trim()) {
      socket.emit('message', { message, id });
      setMessage('');
    }
  };

  useEffect(
    
    () => {
      
      //  socket = socketIO(ENDPOINT, {transports : ["websocket"]})
      const socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        setSocket(socket);

      socket.on("connect", () => {
        alert("connected successfully!")
        setId(socket.id)
      })

      socket.emit('joined', {user})

      socket.on('welcome', ({ user, message }) => {
     
        // setMessages(prevMessages => [...prevMessages, { user, message }]);
        setMessages([...messages, {user, message}])
        console.log(user, message);
      });

      socket.on('userJoined', ({user, message}) => {
        console.log(user, message)
        // setMessages(prevMessages => [...prevMessages, { user, message }]);
        setMessages([...messages, {user, message}])
      })

      socket.on('leave', ({user, message}) => {
        // setMessages(prevMessages => [...prevMessages, { user, message }]);
        console.log(user , message)
        setMessages([...messages, {user, message}])
      })

      socket.on('message', ({ user, message }) => {
        setMessages([...messages, {user, message}])
        // setMessages(prevMessages => [...prevMessages, { user, message }]);
      });
  

      return () => {
        // socket.off('connect')
        // socket.off('welcome')
        socket.disconnect();
        socket.off();
      }
    }, []
  )


  useEffect(() => {
    if (socket) {
        socket.on('sendMessage', ( {user, message, id}) => {
            setMessages((prevMessages) => [...prevMessages, {user, message, id}]);
            console.log({user, message, id});
        });

        return () => {
            socket.off();
        };
    }
}, [messages]);
  return (
    <>
      {/* <h1>{user}</h1> */}
      <div className="chatPage">
        <div className="chatContainer">
          <div className="header">
            <h2>Chat <span> Room</span></h2>
            <a href="/"><img src={Close} alt="closeicon" /></a>
          </div>
          <ReactScrollToBottom className="chatBox">
            {
              messages.map((item, index) => <Message message={item.message} 
              classes={item.id === id ? 'right' : 'left'}    key={index}
              user={item.id === id ? '' : item.user} />)
            }
          </ReactScrollToBottom>
          <div className="inputBox">
            <input type="text" id="chatInput" value={message}
            onChange={(e) => setMessage(e.target.value)}   onKeyPress={(e) => e.key === 'Enter' ? send() : null}/>
            <button className="sendBtn" onClick={send}><img src={Send} alt="send" /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
