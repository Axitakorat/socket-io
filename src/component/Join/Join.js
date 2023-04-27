import { FormControl, Input, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
  border: 1px solid #fefcff;
  width: 600px;
  height: 400px;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
`;
const Button = styled.button`
  padding: 7px 50px;
  border-radius: 50px;
  margin-top: 25px;
  border-color: #0d6efd;
  background-color: #ffff;
  font-size: 15px;
  color: #0d6efd;
  cursor: pointer;

  &:hover {
    background-color: rgba(13, 110, 253, 0.04);
  }
`;
const Text = styled.div`
  color: #6c757d !important;
`;

let user, Group;

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";

  Group = document.getElementById("joinInput1").value;
  document.getElementById("joinInput1").value = "";
};

const Join = () => {
  const [name, setname] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Box>
          <h1>Sandesh Lite</h1>
          <Text>Please Enter Same Group Name Which Would You like To Join</Text>
          <div style={{ margin: "30px", width: "85%" }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <Input
                id="joinInput"
                placeholder="User Name"
                onChange={(e) => setname(e.target.value)}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div style={{ margin: "30px", width: "85%" }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <Input
                id="joinInput1"
                placeholder="Group Name"
                onChange={(e) => setname(e.target.value)}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
          </div>
          <Link onClick={(e) => (!name ? e.preventDefault() : null)} to="/chat">
            <Button onClick={sendUser}>Go For Chat</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
};

export default Join;
export { user, Group };
