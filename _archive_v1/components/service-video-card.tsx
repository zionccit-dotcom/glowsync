"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceVideoCardProps {
    id: string
    name: string
    price: number
    duration: number
    videoUrl?: string
    isSelected: boolean
    onSelect: () => void
}

export function ServiceVideoCard({
    id,
    name,
    price,
    duration,
    videoUrl,
    isSelected,
    onSelect,
}: ServiceVideoCardProps) {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const videoRef = React.useRef<HTMLVideoElement>(null)

    const handleHoverStart = () => {
        setIsPlaying(true)
        videoRef.current?.play().catch(() => { })
    }

    const handleHoverEnd = () => {
        setIsPlaying(false)
        videoRef.current?.pause()
        if (videoRef.current) videoRef.current.currentTime = 0
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative overflow-hidden rounded-xl cursor-pointer group aspect-[3/4] md:aspect-[4/5] border-2 transition-all",
                isSelected ? "border-primary ring-2 ring-primary ring-offset-2" : "border-transparent"
            )}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            onClick={onSelect}
        >
            {/* Video Background */}
            <div className="absolute inset-0 bg-muted">
                {videoUrl ? (
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white/20" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg leading-tight">{name}</h3>
                    {isSelected && (
                        <div className="bg-primary rounded-full p-1">
                            <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="font-semibold text-white">${price}</span>
                    <span>•</span>
                    <span>{duration} min</span>
                </div>
            </div>

            {/* Floating "Preview" Badge */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 text-[10px] uppercase font-bold text-white tracking-wider border border-white/10">
                    <Play className="h-3 w-3 fill-current" /> Preview
                </div>
            </div>

        </motion.div>
    )
}
