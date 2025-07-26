import React from "react";
import { motion } from "framer-motion";
import headerImage from "../assets/p_img1.png";
import founderImage from "../assets/p_img26.png";

const cardData = [
  {
    title: "Timeless Designs:",
    description: "Rooted in tradition, made for today.",
  },
  {
    title: "Affordable Elegance:",
    description: "Luxury that doesn’t break the bank.",
  },
  {
    title: "Handcrafted with Love:",
    description: "Made by artisans who pour their hearts into every piece.",
  },
  {
    title: "Celebrating You:",
    description: "Jewelry that speaks to your individuality.",
  },
];

const AboutUsSection = () => {
  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="flex flex-col-reverse md:flex-row items-center gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-gray-800 p-6 sm:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg w-full md:max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
              WE ARE ELA
            </h1>
            <p className="text-lg sm:text-lg md:text-lg mb-4">
              At ELA, we believe that jewelry isn’t just something you wear—it’s a way of expressing who you are.
              It’s about heritage, artistry, and capturing those precious little moments that make life beautiful.
            </p>
            <p className="text-lg sm:text-lg md:text-lg mb-4">
              ELA stands for everything we value—
              <span className="font-bold"> Ethnic Love Aesthetics</span>.
              It’s a reflection of our love for traditions, a celebration of individuality,
              and a tribute to the timeless beauty of handcrafted jewelry.
            </p>
            <p className="text-lg sm:text-lg md:text-lg">
              You’re wearing a piece of art!
            </p>
          </div>

          <img
            src="https://res.cloudinary.com/ddn14rili/image/upload/v1753537514/founders-page1_sp2a4j.jpg"
            alt="We Are ELA"
            className="rounded-lg shadow-lg w-full h-3/4 md:w-auto max-w-sm object-cover"
          />
        </motion.div>

        {/* Our Purpose Section */}
        <motion.div
          className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl mt-12 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#4c3b2a] text-2xl sm:text-3xl font-semibold mb-4 font-quicksand">
            Our Purpose: Celebrating You
          </h2>
          <p className="text-[#4c3b2a] text-lg sm:text-lg leading-relaxed font-quicksand">
            At ELA, we’re here to celebrate you. We design jewelry that speaks to your soul,
            tells your story, and makes every day a little more special.
          </p>
        </motion.div>

        {/* Vision Section */}
        <section className="w-full py-12">
          <motion.div
            className="px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-2 h-10 bg-[#5b4835] mr-3 rounded-full"></div>
                  <h2 className="text-[#4c3b2a] text-2xl sm:text-3xl font-semibold font-quicksand">
                    Our Vision: A Piece of ELA in Every Story
                  </h2>
                </div>
                <p className="text-[#4c3b2a] text-lg sm:text-lg mb-4 font-quicksand">
                  Our dream is simple: to be a part of your journey. Whether it’s a wedding or brunch with friends,
                  we want ELA to be the sparkle that completes your look.
                </p>
                <p className="text-[#4c3b2a] text-lg sm:text-lg font-quicksand">
                  But our vision goes beyond jewelry. We aim to:
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                {[
                  {
                    title: "Support Artisans:",
                    desc: "Create sustainable livelihoods for traditional craftspeople.",
                  },
                  {
                    title: "Celebrate Heritage:",
                    desc: "Keep the legacy of Indian artistry alive.",
                    dark: true,
                  },
                  {
                    title: "Empower Women:",
                    desc: "Design pieces that inspire confidence and individuality.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`p-6 rounded-2xl shadow-md backdrop-blur-md ${item.dark
                      ? "bg-[#5b4835]/80 text-white"
                      : "bg-white/60 text-[#4c3b2a]"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold font-quicksand mb-2">
                      {item.title}
                    </h3>
                    <p className="text-lg font-quicksand">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Founder Note */}
<section className="py-12 bg-white">
  <div className="max-w-screen-xl w-full mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
    <motion.img
      src="https://res.cloudinary.com/ddn14rili/image/upload/v1753537763/founder1_zgx9f6.jpg"
      alt="Founder"
      className="w-72 sm:w-80 rounded-2xl shadow-lg object-cover"
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    />

    <motion.div
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex-1 text-center md:text-left"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
        Note from Our Founders
      </h2>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-600">
        Aashima A Shah & Latesh Shah
      </h3>
      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
        I’ve always believed that fashion is a way to express your inner world.
        Jewelry is about emotion—not the price tag, but the story it tells.
        Growing up in a joint family, I found joy in traditions. These memories
        inspire every ELA design.
        <br /><br />
        At ELA, we’re not just designing jewelry. We’re creating memories,
        preserving traditions, and celebrating women.
      </p>
    </motion.div>
  </div>
</section>

{/* Why Choose ELA */}
<section id="why-choose-ela" className="py-12 bg-white">
  <div className="max-w-screen-xl w-full mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
    {/* Text Content */}
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex-1"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-brick">
        WHY CHOOSE ELA
      </h2>
      <p className="text-gray-700 text-lg sm:text-xl mb-6">
        Here’s what makes ELA more than just a jewelry brand:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cardData.map((card, index) => {
          const isDiagonal = index === 0 || index === 3;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded shadow-sm border ${
                isDiagonal
                  ? "bg-[#5b4835]/80 text-white border-[#5b4835]"
                  : "bg-white text-gray-800 border-gray-200"
              }`}
            >
              <h4 className="font-semibold text-lg mb-1">{card.title}</h4>
              <p className="text-lg">{card.description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>

    {/* Founder Image */}
    <motion.img
      src="https://res.cloudinary.com/ddn14rili/image/upload/v1753537859/founder2_yjwu16.jpg"
      alt="Founder"
      className="w-72 sm:w-80 rounded-2xl shadow-lg object-cover"
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    />
  </div>
</section>
      </div>
    </div>
  );
};

export default AboutUsSection;
