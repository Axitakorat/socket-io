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
  height: 500px;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
`;

const ENDPOINT = "http://localhost:9000/";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const Chat = () => {
  const [id, setid] = useState("");
  const location = useLocation();
  const { groupName: Group, name: user } = location?.state || {
    groupName: "",
    name: "",
  };
  const navigate = useNavigate();
  console.log(location);
  const [messages, setmessages] = useState([]);
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id, Group, user });
    document.getElementById("chatInput").value = "";
  };
  console.log(messages);
  useEffect(() => {
    if (Group && user) {
      socket.on("connect", () => {
        // alert("connected");
        setid(socket.id);
      });

      socket.on("sendOldMessage", (data) => {
        setmessages((o) => [...o, ...data]);
      });

      socket.emit("joined", { user, Group });

      socket.on("welcome", (data) => {
        setmessages((o) => [...o, data]);
        console.log(data.user, data.message);
        localStorage.getItem("user", user);
      });

      socket.on("userJoined", (data) => {
        setmessages((o) => [...o, data]);
        console.log(data.user, data.message);
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
      console.log(data);
      setmessages((o) => [...o, data]);
      console.log(data.user, data.message, data.id);
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
      <Box className="">
        <h2 style={{ textAlign: "center" }}>{Group}</h2>

        <div className="chatBox">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </div>

        <div
          style={{
            margin: "30px",
            width: "90%",
            marginTop: "45%",
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
          <div>
            <button onClick={send}>send</button>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default Chat;
