"use client"; // Ensures this runs on the client side

import { useState, useEffect } from "react";

export default function MaintenancePage() {
    const targetDate = new Date("2025-03-15T00:00:00"); // Set your maintenance end time
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = targetDate - new Date();
        if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());

            // Redirect when countdown reaches 0
            if (calculateTimeLeft().days === 0 && calculateTimeLeft().hours === 0 &&
                calculateTimeLeft().minutes === 0 && calculateTimeLeft().seconds === 0) {
                window.location.href = "/"; // Redirect to homepage when maintenance is over
            }

        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>🚧 Site Under Maintenance 🚧</h1>
            <p>We’re making some updates. Please check back soon!</p>
            <h2>Time Remaining:</h2>
            <h3>
                {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
            </h3>
        </div>
    );
}