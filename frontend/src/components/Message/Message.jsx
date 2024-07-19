import "./Message.css";

const Message = ({ user, message, classes }) => {
    if (user) {
        return (
            <div className={`messageBox ${classes}`}  >
                {`${user}: ${message}`}
            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classes}`}>
                {`You: ${message}`}
            </div>
        )
    }
}
export default Message
