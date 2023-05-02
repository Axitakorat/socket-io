import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import styled from "styled-components";
import { FormControl, Input, InputAdornment } from "@mui/material";
import Message from "../Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";
import { useLocation, useNavigate } from "react-router-dom";

const Box = styled.div`
  border: 1px solid #fefcff;
  width: 45%;
  height: 600px;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
`;

const ENDPOINT = "http://localhost:9000/";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const Chat = () => {
  const [id, setid] = useState("");
  console.log(".....", socket.id);
  const location = useLocation();
  const { groupName, name } = location?.state || {
    groupName: "",
    name: "",
  };
  const navigate = useNavigate();
  console.log(location);
  const [messages, setmessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;

    if (message.replace(/\s/g, "").length <= 0) {
    } else {
      return (
        socket.emit("message", { message, id, groupName, name }),
        (document.getElementById("chatInput").value = "")
      );
    }
  };
  console.log(messages);
  useEffect(() => {
    if (groupName && name) {
      socket.on("connect", () => {
        // alert("connected");
        setid(socket.id);
      });

      socket.on("sendOldMessage", (data) => {
        setmessages((o) => [...o, ...data]);
      });

      socket.emit("joined", { name, groupName });

      socket.on("welcome", (data) => {
        setmessages((o) => [...o, data]);
        console.log(data.name, data.message);
      });

      socket.on("userJoined", (data) => {
        setmessages((o) => [...o, data]);
        console.log(data.name, data.message);
      });
      socket.on("leave", (data) => {
        setmessages((o) => [...o, data]);
        console.log(data);
      });
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      console.log(data.id);
      setmessages((o) => [...o, data]);
      console.log(data.name, data.message, data.id);
    });

    // return () => {
    //   socket.off();
    // };
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <h2 style={{ textAlign: "center" }}>{groupName}</h2>
        <ScrollToBottom className="h-75">
          {messages.map((item, i) => (
            <div className="chatBox">
              <Message
                name={name.id === id ? "" : item.name}
                message={item.message}
                classs={name.id === name ? "right" : "left"}
              />
              {console.log(item.name === name)}
            </div>
          ))}
        </ScrollToBottom>

        <div
          style={{
            marginLeft: "30px",
            width: "90%",
            alignItems: "center",
            display: "flex",
          }}
        >
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <Input
              id="chatInput"
              placeholder="Type a Message"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>

          <button onClick={send} style={{ cursor: "pointer" }}>
            send
          </button>
        </div>
      </Box>
    </div>
  );
};
export default Chat;
