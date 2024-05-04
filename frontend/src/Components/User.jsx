import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function User() {
  const [Users, setUsers] = useState([
    {
      Name: "prem theja",
      Email: "Premthejapamula@gmail.com",
      Age: 21,
    }
  ]);
  
  return (
    <>
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
              {Users.map((user, index) => (
                <tr key={index} className="bg-gray-200">
                  <td className="px-4 py-2">{user.Name}</td>
                  <td className="px-4 py-2">{user.Email}</td>
                  <td className="px-4 py-2">{user.Age}</td>
                  <td className="px-4 py-2">
                    <Link to="/UpdateUser" className="bg-blue-500 text-white px-2 py-1 mr-2">Update</Link>
                    <button className="bg-red-500 text-white px-2 py-1">DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
