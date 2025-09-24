import React from "react";

interface IconsBoxProps {
    className?: string
}

const IconsBox: React.FC<IconsBoxProps> = ({
    className = ""
}) => {
    return (
        <section className="grid grid-cols-7 ">
            
            <div className="col-span-3 flex items-start justify-center py-6">
                <img
                    src="/assets/icons/cat.gif"
                    alt="Cute Pixel Cat"
                    className="w-[14vh] h-[14vh] filter grayscale dark:brightness-50 dark:contrast-125 dark:hover:grayscale-0 dark:hover:brightness-100 hover:grayscale-0 transition duration-300 "
                />
            </div>
            <div className={`flex flex-col gap-y-2 py-5 px-[1vh] ${className}`}>
                <a
                    href="https://github.com/Pranjwals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-[6vh] h-[6vh] opacity-90"
                >
                    <img
                        src="/assets/icons/github.svg"
                        className="w-full h-full p-2 filter grayscale hover:grayscale-0 transition duration-300"
                    />
                </a>

                <a
                    href="https://www.instagram.com/pranjwal__repr__/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-[6vh] h-[6vh] opacity-90"
                >
                    <img
                        src="/assets/icons/instagram.png"
                        className="w-full h-full p-3 filter grayscale hover:grayscale-0 transition duration-300"
                    />
                </a>
            </div>

            <div className={`flex flex-col gap-y-2  py-5 px-[1vh] ${className}`}>
                <a
                    href="https://www.linkedin.com/in/pranjwal-singh-01979b242/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-[6vh] h-[6vh] opacity-90"
                >
                    <img
                        src="/assets/icons/linkedin.png"
                        className="w-full h-full p-3 filter grayscale hover:grayscale-0 transition duration-300"
                    />
                </a>

                <a
                    href="https://leetcode.com/u/ulmSQe2Isc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-[6vh] h-[6vh] opacity-90"
                >
                    <img
                        src="/assets/icons/leetcode.png"
                        className="w-full h-full p-2 filter grayscale hover:grayscale-0 transition duration-300"
                    />
                </a>
            </div>


            <div className={`flex flex-col gap-y-2  py-5 px-[1vh] ${className}`}>
                <a
                    href="dinnerdinner"                                                 /////FIGURE OUT HOW TO MAKE DISCORD COPIABLE ON CLICK
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-[6vh] h-[6vh] opacity-90"
                >
                    <img
                        src="/assets/icons/discord.svg"
                        className="w-full h-full p-3 filter grayscale hover:grayscale-0 transition duration-300"
                    />
                </a>

                <a
                    href="https://x.com/its_pranjwals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-[6vh] h-[6vh] opacity-90"
                >
                    <img
                        src="/assets/icons/x.svg"
                        className="w-full h-full p-3 filter grayscale hover:grayscale-0 transition duration-300"
                    />
                </a>
            </div>


            <div className={`flex flex-col gap-y-2 py-5 px-[1vh] ${className}`}>
                <a
                    href="https://dev.to/pranjwal__repr__"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-[6vh] h-[6vh] opacity-90"
                >
                    <img
                        src="/assets/icons/dev.png"
                        className="w-full h-full p-2 filter grayscale hover:grayscale-0 transition duration-300"
                    />
                </a>

                <a
                    href="https://medium.com/@singhpranjwal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center 
                   bg-zinc-200 dark:bg-zinc-800 rounded-xl 
                   hover:bg-zinc-200 dark:hover:bg-zinc-700 
                   transition-colors duration-200 
                   w-[6vh] h-[6vh] opacity-90"
                >
                    <img
                        src="/assets/icons/medium.png"
                        className="w-full h-full p-2 filter grayscale hover:grayscale-0 transition duration-300"
                    />
                </a>
            </div>


        </section>
    )
}

export default IconsBox;