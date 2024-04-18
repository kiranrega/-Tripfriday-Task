import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserId } from "./userContext";
import UserPosts from "./UserPosts";
import UserAlbums from "./UserAlbum";
import { DotLoader } from "react-spinners";

const UserDetails = () => {
  const { userId } = useParams();
  const { userId: contextUserId } = useUserId();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData(userId || contextUserId);
  }, [userId, contextUserId]);

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return user ? (
    <>
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden m-4">
          <h1 className="font-bold text-xl mb-4 text-gray-800 px-4">
            User Details
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <div>
              <p className="text-gray-600 mb-2">
                <span className="font-bold text-gray-800">Name:</span>{" "}
                {user.name}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold text-gray-800">Username:</span>{" "}
                {user.username}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold text-gray-800">Email:</span>{" "}
                {user.email}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold text-gray-800">Phone:</span>{" "}
                {user.phone}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold text-gray-800">Website:</span>{" "}
                <a
                  href={user.website}
                  className="text-blue-500 hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                <span className="font-bold text-gray-800">Address:</span>{" "}
                {user.address.street}, {user.address.suite}, {user.address.city}
                , {user.address.zipcode}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold text-gray-800">Company:</span>{" "}
                {user.company.name}
              </p>
            </div>
          </div>
      </div>

      {/* Render user posts section */}
      <UserPosts />

      {/* Render user albums section */}
      <UserAlbums />
    </>
  ) : (
    <div className="flex items-center justify-center">
      <DotLoader color="#36d7b7" />
    </div>
  );
};

export default UserDetails;
