import { useState } from "react";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Search, Book, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for chapters
const CHAPTERS = {
  "8": [
    { id: 1, subject: "Mathematics", title: "Rational Numbers", desc: "Properties and operations of rational numbers" },
    { id: 2, subject: "Science", title: "Crop Production", desc: "Methods of crop production and management" },
    { id: 3, subject: "English", title: "The Best Christmas Present", desc: "A heartwarming story about war and peace" },
    { id: 4, subject: "Mathematics", title: "Linear Equations", desc: "Solving equations in one variable" },
  ],
  "9": [
    { id: 1, subject: "Mathematics", title: "Number Systems", desc: "Irrational numbers and real number line" },
    { id: 2, subject: "Science", title: "Matter in Our Surroundings", desc: "Physical nature of matter" },
    { id: 3, subject: "English", title: "The Fun They Had", desc: "Isaac Asimov's vision of future schools" },
  ],
  "10": [
    { id: 1, subject: "Mathematics", title: "Real Numbers", desc: "Euclid's division lemma and fundamental theorem" },
    { id: 2, subject: "Science", title: "Chemical Reactions", desc: "Types of chemical reactions and equations" },
    { id: 3, subject: "Social Science", title: "Rise of Nationalism in Europe", desc: "French revolution and the idea of nation" },
  ],
  "11": [
    { id: 1, subject: "Physics", title: "Physical World", desc: "Scope and excitement of physics" },
    { id: 2, subject: "Chemistry", title: "Structure of Atom", desc: "Bohr's model and quantum mechanical model" },
    { id: 3, subject: "Mathematics", title: "Sets", desc: "Representation and types of sets" },
  ],
  "12": [
    { id: 1, subject: "Physics", title: "Electric Charges and Fields", desc: "Coulomb's law and electric field lines" },
    { id: 2, subject: "Chemistry", title: "Solutions", desc: "Types of solutions and colligative properties" },
    { id: 3, subject: "Mathematics", title: "Relations and Functions", desc: "Types of relations and functions" },
  ]
};

export default function ClassPage() {
  const [match, params] = useRoute("/class/:id");
  const classId = params?.id || "8";
  const [search, setSearch] = useState("");

  // Default to empty list if class not found
  const chapters = CHAPTERS[classId as keyof typeof CHAPTERS] || [];
  
  const filteredChapters = chapters.filter(chapter => 
    chapter.title.toLowerCase().includes(search.toLowerCase()) ||
    chapter.subject.toLowerCase().includes(search.toLowerCase())
  );

  const getSubjectColor = (subject: string) => {
    switch(subject.toLowerCase()) {
      case 'mathematics': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'science': return 'bg-green-100 text-green-700 border-green-200';
      case 'physics': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'chemistry': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <motion.h1 
          key={classId}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-serif font-bold text-foreground"
        >
          Class {classId}th Study Material
        </motion.h1>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search chapters or subjects..." 
            className="pl-10 h-12 text-lg bg-card/50 backdrop-blur border-primary/20 focus-visible:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-search"
          />
        </div>
      </div>

      {/* Chapters List */}
      <div className="grid gap-4">
        {filteredChapters.map((chapter, idx) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="hover:shadow-md transition-all duration-300 cursor-pointer group border-l-4 border-l-primary">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-2">
                  <Badge variant="outline" className={`mb-2 ${getSubjectColor(chapter.subject)}`}>
                    {chapter.subject}
                  </Badge>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {chapter.desc}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-6 w-6 text-primary" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        {filteredChapters.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Book className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No chapters found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
      }
