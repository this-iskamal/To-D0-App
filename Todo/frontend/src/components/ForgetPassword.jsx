import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Confirmotp from "./Confirmotp";

function ForgetPassword() {
  const [username, setUsername] = useState("");

  const handleclick = () => {
    axios.post("http://localhost:8000/api/request-password-reset", {
      username: username,
    });
  };
  return (
    <Container>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        name="username"
        placeholder="Enter your username"
      />
      <button onClick={handleclick}>Send</button>
      <Confirmotp username={username} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eb8f8f;
  width: 100vh;
  height: 100vw;
  flex-direction: column;
`;

export default ForgetPassword;
