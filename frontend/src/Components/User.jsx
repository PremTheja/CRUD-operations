import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000")
      .then(response => setUsers(response.data))
      .catch(error => {
        console.error("Error fetching users:", error);
        
      });
  }, []);

  const handleDelete=(id)=>{
    axios.delete("http://localhost:3000/deleteuser/"+id)
    .then(res=>console.log(res)
       , window.location.reload())
    .catch(err=>console.log)
  }

  return (
    <div className="bg-cyan-400 h-screen flex justify-center items-center">
      <div className="bg-blue-500 p-3">
        <Link to="/CreateUser" className="bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded">ADD+</Link>
        <table className="table w-full border-collapse border border-gray-800 mt-3">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr className="bg-gray-200">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.age}</td>
                <td className="px-4 py-2">
                  <Link to={`/UpdateUser/${user._id}`} className="bg-blue-500 text-white px-2 py-1 mr-2">Update</Link>
                  <button className="bg-red-500 text-white px-2 py-1"
                  onClick={(e)=>handleDelete(user._id)}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody> 
        </table>
      </div>
    </div>
  );
}
