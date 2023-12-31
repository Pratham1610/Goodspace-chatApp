import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to the Socket.IO server
        const newSocket = io("http://localhost:3001", {
            transports: ["websocket", "polling", "flashsocket"],
        });
        setSocket(newSocket);

        // Listen for incoming messages
        newSocket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up the socket connection when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const connectDisconnect = () => {
        if (socket) {
            socket.disconnect();
            setSocket(null);
        } else {
            const newSocket = io("http://localhost:3001", {
                transports: ["websocket", "polling", "flashsocket"],
            });
            setSocket(newSocket);

            newSocket.on("message", (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }
    };

    const sendMessage = () => {
        if (socket && messageInput.trim() !== "") {
            // Trim the message to check if it's empty after removing leading and trailing whitespaces
            // Emit the message to the server
            socket.emit("message", messageInput);

            // Update the local state with the sent message
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: messageInput, sender: "You" },
            ]);

            // Clear the message input
            setMessageInput("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevents the default behavior of the "Enter" key in a textarea
            sendMessage();
        }
    };

    return (
        <div className="p-5 h-72 bg-white bg-opacity-20 backdrop-blur rounded-lg shadow-md flex flex-col justify-end">
            <div style={{ overflowY: "scroll", maxHeight: "100%" }}>
                {messages.map((msg, index) => (
                    <div key={index} className="text-black">
                        {`${msg.sender}: ${msg.text}`}
                    </div>
                ))}
            </div>
            <div className="flex items-center mt-2">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-gray-300 rounded-md border py-1 px-2 flex-1"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                >
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                </button>
                <button
                    onClick={connectDisconnect}
                    className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
                    style={{ width: "100px" }}
                >
                    {socket ? "Disconnect" : "Connect"}
                </button>
            </div>
        </div>
    );
};

export default Chatbox;
