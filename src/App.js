import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  const nameRef= useRef();
  const emailRef=useRef();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleAddUser=e =>{
   const name=nameRef.current.value;
   const email=emailRef.current.value;
   const newUser={name:name,email:email}

   //send data to the server
   fetch('http://localhost:5000/users',
   {
     method:'post',
     headers:{
       'content-type':'application/json'
     },
     body: JSON.stringify(newUser)
   })
   .then(res=>res.json())
   .then(data=>{console.log(data);
    const addedUser= data;
    const newUsers=[...user,addedUser]
    setUser(newUsers);

   })

   nameRef.current.value='';
   emailRef.current.value='';

    e.preventDefault()
  }

  return (
    <div className="App">
      <form  onSubmit={handleAddUser}>
        <input type='text' ref={nameRef} placeholder='name'/>
        <input type='email' ref={emailRef} placeholder='email'/>
        <input type='submit' placeholder='Submit'/>

      </form>

      <h1>Found User: {user.length}</h1>
      <ol>
        {user.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
