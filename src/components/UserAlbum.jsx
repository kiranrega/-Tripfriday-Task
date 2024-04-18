import React, { useState, useEffect } from "react";
import { useUserId } from "./userContext";
import { useParams } from "react-router-dom";

const UserAlbums = () => {
  const { userId } = useParams();
  const { userId: contextUserId } = useUserId();
  const [albums, setAlbums] = useState([]);
  const [showAlbums, setShowAlbums] = useState(false);
  const [expandedAlbumId, setExpandedAlbumId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);

  useEffect(() => {
    fetchUserAlbums(userId || contextUserId);
  }, [userId]);

  const fetchUserAlbums = async (id) => {
    setIsLoadingPhotos(false);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user albums");
      }
      const albumData = await response.json();
      setAlbums(albumData);
    } catch (error) {
      console.error("Error fetching user albums:", error);
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  const fetchAlbumPhotos = async (albumId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch album photos");
      }
      const photoData = await response.json();
      setPhotos(photoData);
    } catch (error) {
      console.error("Error fetching album photos:", error);
    }
  };

  const toggleAlbumsVisibility = () => {
    setShowAlbums(!showAlbums);
  };

  const handleAlbumClick = (albumId) => {
    if (expandedAlbumId === albumId) {
      setExpandedAlbumId(null);
    } else {
      setExpandedAlbumId(albumId);
      fetchAlbumPhotos(albumId);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
  <div
    className="flex justify-between items-center mb-4 cursor-pointer"
    onClick={toggleAlbumsVisibility}
  >
    <h2 className="text-xl font-bold text-gray-800">
      {showAlbums ? "Hide Albums" : "Show Albums"}
    </h2>
    <span
      className={`transform transition-transform ${
        showAlbums ? "rotate-180" : ""
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>

  {showAlbums && (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-4 text-gray-800">User Albums</h3>
      <ul className="">
        {albums.map((album) => (
          <li
            key={album.id}
            onClick={() => handleAlbumClick(album.id)}
            className={`p-4 rounded-md cursor-pointer transition duration-300 ${
              expandedAlbumId === album.id
                ? "bg-blue-100 text-blue-800 font-bold"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center">
              <span
                className={`mr-2 w-4 h-4 rounded-full ${
                  expandedAlbumId === album.id
                    ? "bg-blue-800"
                    : "bg-gray-400"
                }`}
              ></span>
              <span className="text-base font-semibold">
                {album.title}
              </span>
              <span
                className={`transform transition-transform ${
                  expandedAlbumId === album.id ? "rotate-180" : ""
                } ml-3`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            {expandedAlbumId === album.id && (
              <div className="mt-4">
                {isLoadingPhotos ? (
                  <div className="flex justify-center items-center">
                    <span className="ml-2 text-gray-600">
                      Loading photos...
                    </span>
                  </div>
                ) : (
                  <ul className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 mt-4">
                    {photos.map((photo) => (
                      <li
                        key={photo.id}
                        className="p-2 bg-gray-100 rounded-md shadow"
                      >
                        <img
                          src={photo.thumbnailUrl}
                          alt={photo.title}
                          className="w-full h-auto rounded"
                        />
                        <p
                          className="text-sm mt-2 text-gray-700 text-ellipsis overflow-hidden whitespace-nowrap"
                          title={photo.title}
                        >
                          {photo.title}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
  );
};

export default UserAlbums;
