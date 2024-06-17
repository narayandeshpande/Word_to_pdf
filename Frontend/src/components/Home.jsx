import React, { useState } from 'react'
import { FaFileWord } from "react-icons/fa6";
import axios from "axios"
const Home = () => {
    const [fileName,setFilename]=useState(null)
    const [smg,setSmg]=useState("")
    const [downloaderror,setDownloaderror]=useState("")
    const handelFileChange=(e)=>{
console.log(e.target.files);
setFilename(e.target.files[0])
    }
    const handelSubmit = async (event)=>{
event.preventDefault()
if(!fileName)
    {
        setSmg("Place select the file")
        return
    }
    const formData=new FormData()
    formData.append("file",fileName)
    try {
        const responce=await axios.post("http://localhost:3000/convertFile",formData,{
            responseType:'blob'
        })
        const url=window.URL.createObjectURL(new Blob([responce.data]))
        const link=document.createElement("a")
        link.href=url
        // link.setAttribute("download", fileName.name.replace(/\.[^/.]+$/, "") + ".pdf");
        link.setAttribute("download", fileName.name.replace(/\.[^/.]+$/, "") + ".pdf");
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
        setFilename(null)
        setSmg("file Converted")
    } catch (error) {
        if(error.response && error.response.status===400)
            {
                setDownloaderror("Error occurred",error.response.data.maessage)

            }
            else{
                setSmg("")
            }
        console.log(error);
    }
    }
  return (
    <>
    <div className="max-w-screen-2xl mx-auto container px-6 md:px-40 py-3">
        <div className="flex h-screen items-center justify-center">
            <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shado-lg">
                <h1 className="text-3xl text-center font-bold mb-4">Conver Word to PDF</h1>
                <p className="text-sm text-center">Easily convert Word document to PDF format, without having to install any software</p>
           
            <div className="flex flex-col items-center space-y-4">
                <input
                 type="file" 
                 name="file" id="fileInput" 
                accept='.doc,.docx'
                className='hidden'
                onChange={handelFileChange}
                
                />
                <label htmlFor="fileInput"
                className='w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer  border-blue-300 hover:bg-blue-700 duration-300 hover:text-white'
                >
                    <FaFileWord />
                    <span className='text-2xl mr-2'>{fileName?fileName.name:"Choose File"}</span>
                </label>
                <button className='text-white  bg-blue-500 py-3 px-6 rounded-lg hover:bg-blue-900 font-bold disabled:bg-gray-500 disabled:pointer-events-none'
                disabled={!fileName}
                onClick={handelSubmit}
                >Conver File</button>
                <p>{smg}</p>
                <p>{downloaderror}</p>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Home
