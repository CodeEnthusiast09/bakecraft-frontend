"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOvenClicked, setIsOvenClicked] = useState(false);
  const [screenWidth, setScreenWidth] = useState(800);
  const [screenHeight, setScreenHeight] = useState(600);
  const router = useRouter();

  useEffect(() => {
    // Safe access to window on client side
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, []);

  const handleOvenClick = () => {
    setIsOvenClicked(true);
    setTimeout(() => setIsOvenClicked(false), 2000);
  };

  // Animation variants (same as yours)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const ovenVariants = {
    idle: {
      rotate: [0, 0.5, -0.5, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
    clicked: {
      scale: [1, 1.1, 1],
      rotate: [0, -2, 2, -1, 1, 0],
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const smokeVariants = {
    rise: {
      y: [-10, -30],
      opacity: [0.8, 0],
      scale: [1, 1.3],
      transition: { duration: 2, repeat: Infinity, ease: "easeOut" },
    },
  };

  const flourCloudVariants = {
    float: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background particles */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-24 h-24 bg-white/20 rounded-full blur-sm"
        variants={flourCloudVariants}
        animate="float"
      />
      <motion.div
        className="absolute top-[20%] right-[15%] w-20 h-20 bg-white/15 rounded-full blur-sm"
        variants={flourCloudVariants}
        animate="float"
        transition={{ delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[5%] w-28 h-28 bg-white/10 rounded-full blur-sm"
        variants={flourCloudVariants}
        animate="float"
        transition={{ delay: 4 }}
      />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <motion.div
          className="text-center max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Oven */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              className="relative mx-auto w-72 h-48 mb-8 cursor-pointer"
              variants={ovenVariants}
              animate={isOvenClicked ? "clicked" : "idle"}
              onClick={handleOvenClick}
              whileHover={{ scale: 1.05 }}
            >
              {/* Oven Body */}
              <div className="w-full h-full bg-gradient-to-br from-yellow-800 to-yellow-900 rounded-2xl shadow-2xl relative">
                <div className="absolute top-6 left-6 w-60 h-36 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-4 border-gray-600">
                  {/* Oven Window */}
                  <motion.div
                    className="absolute top-6 left-8 w-44 h-24 rounded-lg overflow-hidden"
                    animate={{
                      background: [
                        "radial-gradient(circle, #FFD700 20%, #FF6B35 40%, #2C2C2C 60%)",
                        "radial-gradient(circle, #FF6B35 20%, #FFD700 40%, #2C2C2C 60%)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                {/* Handle */}
                <div className="absolute right-[-90px] top-1/2 transform -translate-y-1/2 w-20 h-2 bg-gray-400 rounded-full"></div>
                {/* Smoke */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {[1, 2, 3].map((smoke, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-8 bg-gradient-to-t from-gray-400/80 to-transparent rounded-full"
                      variants={smokeVariants}
                      animate="rise"
                      transition={{ delay: i * 0.5 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Error text */}
          <motion.div
            variants={itemVariants}
            className="text-8xl md:text-9xl font-bold text-primary-100 mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            404
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Oops! Something&apos;s Burning!
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            Looks like this page got a little too crispy in the oven and
            crumbled away.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-primary-100 to-secondary-100 text-white font-semibold rounded-full shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Floating particles */}
      <AnimatePresence>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-300/30 rounded-full"
            initial={{
              x: Math.random() * screenWidth,
              y: screenHeight,
              opacity: 0,
            }}
            animate={{
              y: -100,
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
