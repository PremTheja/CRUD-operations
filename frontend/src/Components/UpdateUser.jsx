import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

  
export default function UpdateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate=useNavigate();

  const {id}=useParams()

  useEffect(() => {
    axios.get("http://localhost:3000/getuser/"+id)
    .then(response => {
      const userData = response.data; // Assuming the response is an object with user data
      setName(userData.name);
      setEmail(userData.email);
      setAge(userData.age);
      console.log(response)
    })

      .catch(error => {
        console.error("Error fetching users:", error);
      });
}, []);

const Update= async(e)=>{
  e.preventDefault()
  try {
    const response = await axios.put("http://localhost:3000/updateuser/"+id, {
      name: name,
      email: email,
      age: age
    });
    console.log(response.data); // Assuming the server returns the created user data

    
    // Reset input fields
    setName('');
    setEmail('');
    setAge('');
    navigate('/')
  } catch (error) {
    console.error('Error creating user:', error);
  }
};



  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Update User</h2>
        <form onSubmit={Update}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter the name" className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter the email" className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}  onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">Age</label>
            <input type="text" id="age" placeholder="Enter the age" className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={age}  onChange={(e) => setAge(e.target.value)}/>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Update</button>
        </form>
      </div>
    </div>
  );
}

