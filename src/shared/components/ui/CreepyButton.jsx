"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";

export const CreepyButton = ({
    children,
    className,
    coverClassName,
    onClick,
    ...props
}) => {
    const eyesRef = useRef(null);
    const [eyeCoords, setEyeCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const updateEyes = (e) => {
        const userEvent =
            "touches" in e ? (e).touches[0] : (e);

        if (!eyesRef.current) return;

        // get the center of the eyes container
        const eyesRect = eyesRef.current.getBoundingClientRect();
        const eyesCenter = {
            x: eyesRect.left + eyesRect.width / 2,
            y: eyesRect.top + eyesRect.height / 2,
        };

        // cursor position
        const cursor = {
            x: userEvent.clientX,
            y: userEvent.clientY,
        };

        // calculate the eye angle
        const dx = cursor.x - eyesCenter.x;
        const dy = cursor.y - eyesCenter.y;
        const angle = Math.atan2(-dy, dx) + Math.PI / 2;

        // pupil distance from the eye center
        const visionRangeX = 180; // Max distance to look horizontally
        const visionRangeY = 75; // Max distance to look vertically
        const distance = Math.hypot(dx, dy);

        // Limit the movement so pupils don't go too far
        // We normalize the distance influence
        const x = (Math.sin(angle) * Math.min(distance, visionRangeX)) / visionRangeX;
        const y = (Math.cos(angle) * Math.min(distance, visionRangeY)) / visionRangeY;

        setEyeCoords({ x, y });
    };

    // Reset eyes when mouse leaves
    const resetEyes = () => {
        setEyeCoords({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const pupilStyle = {
        transform: `translate(calc(-50% + ${eyeCoords.x * 50}%), calc(-50% + ${eyeCoords.y * 50}%))`,
    };

    return (
        <button
            className={cn(
                "creepy-button relative h-[52px] w-[220px] shrink-0 overflow-visible rounded-xl bg-[#080d18] cursor-pointer outline-none select-none group",
                "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400",
                className
            )}
            onClick={onClick}
            onMouseMove={(e) => {
                updateEyes(e);
                setIsHovered(true);
            }}
            onTouchMove={updateEyes}
            onMouseLeave={resetEyes}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            {...props}>
            {/* Eyes Container */}
            <span
                ref={eyesRef}
                className="creepy-button__eyes absolute flex items-center gap-1 right-3 bottom-[6px] h-2 z-0 pointer-events-none">
                {/* Left Eye */}
                <motion.span
                    className="relative h-2 w-2 bg-white rounded-full overflow-hidden"
                    animate={{ height: ["8px", "8px", "0px", "8px"] }}
                    transition={{
                        duration: 3,
                        times: [0, 0.92, 0.96, 1],
                        repeat: Infinity,
                        ease: "linear",
                    }}>
                    <span
                        className="absolute top-1/2 left-1/2 h-1 w-1 bg-[#080d18] rounded-full transition-transform duration-75 ease-out"
                        style={pupilStyle} />
                </motion.span>
                {/* Right Eye */}
                <motion.span
                    className="relative h-2 w-2 bg-white rounded-full overflow-hidden"
                    animate={{ height: ["8px", "8px", "0px", "8px"] }}
                    transition={{
                        duration: 3,
                        times: [0, 0.92, 0.96, 1],
                        repeat: Infinity,
                        ease: "linear",
                    }}>
                    <span
                        className="absolute top-1/2 left-1/2 h-1 w-1 bg-[#080d18] rounded-full transition-transform duration-75 ease-out"
                        style={pupilStyle} />
                </motion.span>
            </span>
            {/* Button Cover */}
            <motion.span
                className={cn(
                    "creepy-button__cover absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-[#315bdf] px-4 text-sm font-semibold tracking-normal text-white",
                    "shadow-[0_5px_12px_rgba(17,29,73,0.16)]",
                    "origin-[20px_50%]",
                    coverClassName
                )}
                animate={{
                    rotate: isHovered ? -4 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 360,
                    damping: 28,
                    mass: 0.65,
                }}>
                {children}
            </motion.span>
            {/* Invisible placeholder to maintain size since cover is absolute */}
            <span
                className="block h-full w-full opacity-0 px-4 text-sm font-semibold tracking-normal">
                {children}
            </span>
        </button>
    );
};

export default CreepyButton;
