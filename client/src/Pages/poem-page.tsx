import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import mindWithoutFearImg from "@assets/generated_images/abstract_representation_of_a_mind_without_fear,_breaking_walls.png";
import roadNotTakenImg from "@assets/generated_images/two_roads_diverging_in_a_yellow_wood,_autumn_forest.png";

const POEMS = {
  "mind-without-fear": {
    title: "Where the Mind is Without Fear",
    author: "Rabindranath Tagore",
    image: mindWithoutFearImg,
    text: `Where the mind is without fear and the head is held high;
Where knowledge is free;
Where the world has not been broken up into fragments
By narrow domestic walls;
Where words come out from the depth of truth;
Where tireless striving stretches its arms towards perfection;
Where the clear stream of reason has not lost its way
Into the dreary desert sand of dead habit;
Where the mind is led forward by thee
Into ever-widening thought and action
Into that heaven of freedom, my Father, let my country awake.`
  },
  "road-not-taken": {
    title: "The Road Not Taken",
    author: "Robert Frost",
    image: roadNotTakenImg,
    text: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.

I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.`
  }
};

export default function PoemPage() {
  const [match, params] = useRoute("/poem/:id");
  const poemId = params?.id as keyof typeof POEMS;
  const poem = POEMS[poemId];

  if (!poem) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-serif mb-4">Poem not found</h1>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Image with Parallax-like effect */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={poem.image} 
            alt={poem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        </motion.div>
        
        <div className="absolute top-4 left-4 z-10">
          <Link href="/">
            <Button variant="secondary" size="sm" className="gap-2 hover:bg-white/90">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 drop-shadow-lg"
          >
            {poem.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-white/90 font-medium drop-shadow-md"
          >
            by {poem.author}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-md shadow-xl border-primary/10">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg dark:prose-invert mx-auto font-serif">
                {poem.text.split('\n').map((line, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`mb-2 ${line.trim() === '' ? 'h-4' : ''}`}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
    }
