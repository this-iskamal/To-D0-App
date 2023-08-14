import axios from 'axios'
import React, { useState } from 'react'
import { styled } from 'styled-components'

function Confirmotp(username) {
    const [otp,setOtp]=useState('')
    const [password,setPassword]=useState('')

    const handleclick = () =>{
        
        axios.post('http://localhost:8000/api/confirm-otp-and-change-password',{'username':username.username,'otp':otp,'new_password':password})
    }
  return (
    <Container> 
        <input type="text" placeholder='enter otp' name='otp' onChange={(e)=>setOtp(e.target.value)}/>

        <input type="text" placeholder='new password' name='password' onChange={(e)=>setPassword(e.target.value)}/>

        <button onClick={handleclick}>Change</button>
    </Container>
  )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export default Confirmotp