import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CLASSES = [
  { id: "8", label: "Class 8th", desc: "Foundation building", color: "from-blue-500 to-cyan-400" },
  { id: "9", label: "Class 9th", desc: "Core concepts", color: "from-green-500 to-emerald-400" },
  { id: "10", label: "Class 10th", desc: "Board preparation", color: "from-purple-500 to-pink-400" },
  { id: "11", label: "Class 11th", desc: "Advanced streams", color: "from-orange-500 to-amber-400" },
  { id: "12", label: "Class 12th", desc: "Career decisive", color: "from-red-500 to-rose-400" },
];

export default function NotesLanding() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block p-3 rounded-full bg-primary/10 mb-4"
        >
          <GraduationCap className="h-8 w-8 text-primary" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold"
        >
          Premium Study Notes
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Select your class to access curated study materials, summaries, and important questions.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {CLASSES.map((cls, idx) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
          >
            <Link href={`/notes/${cls.id}`}>
              <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-card relative h-full">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${cls.color}`} />
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <span className={`bg-gradient-to-r ${cls.color} bg-clip-text text-transparent`}>
                      {cls.label}
                    </span>
                  </CardTitle>
                  <CardDescription className="text-base">{cls.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>3 Subjects</span>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                      View Notes <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
                    }
