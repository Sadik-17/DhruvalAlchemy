import React from 'react'

const script = () => {
    return (
        <>


            {/* ABOUT SECTION */}
            <section className="py-24 md:py-40 w-full px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center bg-[#0a0a0a]">
                <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl shadow-orange-500/20 group">
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                    <img
                        src="IMG_9989.PNG"
                        alt="Dhruval Solanki"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <p className="text-orange-500 font-mono tracking-[0.2em] mb-4 text-sm uppercase">The Artist</p>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white">About Dhruval</h2>

                    <div className="space-y-6 text-base md:text-xl text-gray-300 font-light leading-relaxed">
                        <p>
                            I am a dance artist and teacher specializing in Kalaripayattu and Indian Contemporary Dance, with foundational
                            training in Bharatanatyam.
                        </p>
                        <p>
                            Under the guidance of D. Padmakumar and Guru Smt. Maheshwari Nagarajan (NKK),
                            My practice explores the connection between traditional martial arts and contemporary movement expression.
                        </p>
                        <p className="text-gray-400 italic">
                            "I aim to continue learning and contributing to professional dance environments that explore the connection
                            between traditional forms and contemporary movement. My goal is to grow as both an artist and educator while
                            adding value to the company's creative vision and productions."
                        </p>
                    </div>
                </div>
            </section>


            {/* SECTION 7: LET'S CONNECT (NEW) */}
            <section className="relative h-screen w-full flex items-center justify-center">
                {/* <FadeSection start={6 * section} length={section} isLast> */}
                <div className="absolute inset-0 -z-10 overflow-hidden bg-linear-to-b from-transparent to-orange-950/40">
                </div>
                <div className="max-w-3xl relative z-10 px-6 text-center">
                    <p className="text-orange-400 font-mono tracking-[0.3em] uppercase mb-4 text-sm md:text-lg">
                        The Journey Continues
                    </p>
                    <h2 className="text-5xl md:text-8xl font-serif font-bold mb-8 tracking-tighter text-white">
                        CONTACT
                    </h2>
                    <p className="text-lg md:text-3xl text-gray-300 font-light mb-10">
                        Open for collaborations, performances, and teaching opportunities.
                    </p>
                    <a href="mailto:contact@example.com" className="inline-block border border-orange-500/50 hover:bg-orange-500 hover:text-white transition-all duration-300 px-8 py-4 text-sm md:text-lg font-mono tracking-widest uppercase rounded-full">
                        Get in Touch
                    </a>
                </div>
                {/* </FadeSection> */}
            </section>
        </>
    )
}

export default script