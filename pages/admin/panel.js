import Navbar from '../../components/navbar/Navbar'
import React,{useState, useRef, useContext} from 'react';
import {AdminAuthContext} from '../../Context/AdminAuthContext'

const api_csv = process.env.NEXT_PUBLIC_API_CSV;


export default function UploadFile() {
  const { stateAdmin, dispatchAdmin } = useContext(AdminAuthContext)

  // State to store uploaded file
  const [file, setFile] = React.useState("");

  // Handles file upload event and updates state
  const handleUpload = async (event) =>{
    event.preventDefault();
    setFile(event.target.files[0]);

    const data = new FormData();
    data.append("file", event.target.files[0]);

    fetch(api_csv, {
      method: "POST",
      body: file,
    })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  return (
    <>
      <Navbar isAdminSite={true}/>
      <div className="flex justify-center">
        <div className="flex justify-center items-center w-3/4 pt-20 ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                className="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleUpload}
            ></input>
          </label>
        </div>
      </div>
    </>
  );
}