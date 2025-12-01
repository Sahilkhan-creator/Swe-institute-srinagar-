import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, Play } from "lucide-react";
import heroVideo from "@assets/generated_videos/peaceful_library_with_floating_dust_motes.mp4";
import mindWithoutFearImg from "@assets/generated_images/abstract_representation_of_a_mind_without_fear,_breaking_walls.png";
import roadNotTakenImg from "@assets/generated_images/two_roads_diverging_in_a_yellow_wood,_autumn_forest.png";

const poetry = [
  {
    id: "mind-without-fear",
    title: "Where the Mind is Without Fear",
    author: "Rabindranath Tagore",
    image: mindWithoutFearImg,
    preview: "Where the mind is without fear and the head is held high..."
  },
  {
    id: "road-not-taken",
    title: "The Road Not Taken",
    author: "Robert Frost",
    image: roadNotTakenImg,
    preview: "Two roads diverged in a yellow wood, and I— I took the one less traveled by..."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Video Background */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-6 tracking-tight drop-shadow-lg">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">SWE Institute</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              Empowering students with quality education, comprehensive resources, and the freedom to learn.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link href="/class/8">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl">
                Start Learning <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Poetry Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Literary Inspiration</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 lg:gap-12"
          >
            {poetry.map((poem) => (
              <motion.div key={poem.id} variants={item}>
                <Link href={`/poem/${poem.id}`}>
                  <Card className="group cursor-pointer overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-card h-full">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={poem.image} 
                        alt={poem.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <span className="text-white font-medium flex items-center gap-2">
                          Read Poem <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-8 space-y-4">
                      <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors duration-300">
                        {poem.title}
                      </h3>
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                        {poem.author}
                      </p>
                      <p className="text-muted-foreground leading-relaxed line-clamp-2 italic font-serif">
                        "{poem.preview}"
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
      }
