import React, { useEffect, useState } from "react";
import {Tooltip as ReactTooltip} from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { useUserId } from "../components/userContext";

const UserList = () => {
  const navigate = useNavigate();
  const { setUserId } = useUserId();
  const [usersList, setUsersList] = useState([]);

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
    setUserId(userId)
  };

  const getUsersList = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const list = await response.json();
      setUsersList(list);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
      <ul>
        {usersList.map((user) => (
          <li
            key={user.id}
            className="py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer flex items-center m-3 "
            data-tooltip-id={user.id}
            onClick={() => handleUserClick(user.id)}
          >
            {user.name}
            <ReactTooltip id={user.id} place="top" className="tooltip-container">
                <p className="text-2xl m-1">Name: {user.name}</p>
                <p className="text-2xl m-1">E-Mail : {user.email}</p>
            </ReactTooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
