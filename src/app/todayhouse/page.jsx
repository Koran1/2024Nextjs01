'use client'
import React, { useState } from "react";
import "./ImagIcon.css";
import axios from "axios";

function Page() {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const [plusButtons, setPlusButtons] = useState([]);
    const [message, setMessage] = useState("");

    // Handle "Add Msg" click
    const handleAddMsgClick = (e) => {
        const imageRect = e.target.getBoundingClientRect();
        console.log("imageRect : ", imageRect);
        console.log("e.clientX: ", e.clientX)
        console.log("e.clientY: ", e.clientY)

        const x = e.clientX - imageRect.left;
        const y = e.clientY - imageRect.top;

        // Add new "+" button to the list
        setPlusButtons((prevButtons) => [
            ...prevButtons,
            { x, y, id: Date.now() }, // Unique ID for each button
        ]);
    };

    const sendPlusButtonList = async (list) => {
        try {
            const API_url = `${LOCAL_API_BASE_URL}/todayhouse/insert`
            console.log(list)
            const response = await axios.post(API_url, list, {
                headers: {
                    "Content-Type": "application/json", // Specify JSON format
                },
            });
            console.log("Response from server:", response.data);
        } catch (error) {
            console.error("Error sending PlusButtonVO list:", error);
        }
    };

    // Handle "+" button click
    const handlePlusButtonClick = () => {
        setMessage("You clicked the + icon!");
    };

    const getButtonCoords = async () => {
        try {
            const API_url = `${LOCAL_API_BASE_URL}/todayhouse/list`
            const response = await axios.get(API_url);
            console.log(response)
            setPlusButtons(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="image-container"
                onClick={(e) => {
                    if (e.target.tagName === "IMG") handleAddMsgClick(e);
                }}
            >
                <img
                    src="/img/coffee-blue.jpg" // Replace with your image URL
                    alt="img"
                    className="image"
                />
                {plusButtons.map((button) => (
                    <div
                        key={button.id}
                        className="plus-button"
                        style={{ top: `${button.y}px`, left: `${button.x}px` }}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the image click
                            handlePlusButtonClick();
                        }}
                    >
                        +
                    </div>
                ))}
                <button onClick={() => setMessage("")}>Clear Message</button>
                <button onClick={() => setPlusButtons([])}>Clear Buttons</button>
                <button onClick={getButtonCoords}>Get Buttons</button>
                <button onClick={() => sendPlusButtonList(plusButtons)}>Add Button Coords</button>

            </div>
            {message && <div className="message">{message}</div>}
        </div >
    );
};

export default Page;
