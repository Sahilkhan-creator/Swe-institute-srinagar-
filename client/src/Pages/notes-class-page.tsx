import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Search, Lock, Unlock, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function NotesClassPage() {
  const [match, params] = useRoute("/notes/:id");
  const classId = params?.id || "8";
  const [search, setSearch] = useState("");
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  // Get userId from localStorage (set after verification)
  const userId = localStorage.getItem("userId");

  // Check if class is unlocked
  const { data: unlockStatus, isLoading } = useQuery({
    queryKey: ["unlocked", userId, classId],
    queryFn: async () => {
      if (!userId) return { isUnlocked: false };
      const response = await fetch(`/api/unlocked-classes/${userId}/${classId}`);
      return response.json();
    },
    enabled: !!userId,
  });

  const isUnlocked = unlockStatus?.isUnlocked || false;

  // Verify student code mutation
  const verifyCodeMutation = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentCode: code }),
      });
      if (!response.ok) {
        throw new Error("Invalid code");
      }
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("userId", data.userId.toString());
      queryClient.invalidateQueries({ queryKey: ["unlocked"] });
    },
  });

  // Unlock class mutation
  const unlockClassMutation = useMutation({
    mutationFn: async ({ userId, classId, studentCode }: { userId: number; classId: string; studentCode: string }) => {
      const response = await fetch("/api/unlock-class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, classId, studentCode }),
      });
      if (!response.ok) {
        throw new Error("Failed to unlock");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unlocked"] });
      setShowUnlockModal(false);
      setStudentCode("");
      setError("");
      toast({
        title: "Access Granted",
        description: `You have successfully unlocked Class ${classId} notes.`,
      });
    },
  });

  const handleUnlock = async () => {
    if (studentCode !== "9876") {
      setError("Invalid student code. Please try again.");
      return;
    }

    if (!userId) {
      // First verify code to create/get user
      try {
        await verifyCodeMutation.mutateAsync(studentCode);
        // Then unlock the class
        const newUserId = localStorage.getItem("userId");
        if (newUserId) {
          await unlockClassMutation.mutateAsync({
            userId: parseInt(newUserId),
            classId,
            studentCode,
          });
        }
      } catch (err) {
        setError("Invalid student code. Please try again.");
      }
    } else {
      // User exists, just unlock the class
      await unlockClassMutation.mutateAsync({
        userId: parseInt(userId),
        classId,
        studentCode,
      });
    }
  };

  const handlePayment = () => {
    toast({
      title: "Payment System",
      description: "This is a demo. Please use code 9876 to unlock.",
    });
  };

  // Mock data for notes
  const NOTES_DATA = {
    "8": [
      { id: 1, subject: "Science", title: "Microorganisms: Friend and Foe", price: 40 },
      { id: 2, subject: "Math", title: "Algebraic Expressions", price: 40 },
      { id: 3, subject: "History", title: "The Making of the National Movement", price: 40 },
    ],
    "9": [
      { id: 1, subject: "Science", title: "Atoms and Molecules", price: 40 },
      { id: 2, subject: "Math", title: "Polynomials", price: 40 },
      { id: 3, subject: "Geography", title: "Drainage", price: 40 },
    ],
    "10": [
      { id: 1, subject: "Science", title: "Life Processes", price: 40 },
      { id: 2, subject: "Math", title: "Trigonometry", price: 40 },
      { id: 3, subject: "History", title: "Nationalism in India", price: 40 },
    ],
    "11": [
      { id: 1, subject: "Physics", title: "Kinematics", price: 40 },
      { id: 2, subject: "Chemistry", title: "Chemical Bonding", price: 40 },
      { id: 3, subject: "Math", title: "Complex Numbers", price: 40 },
    ],
    "12": [
      { id: 1, subject: "Physics", title: "Electrostatics", price: 40 },
      { id: 2, subject: "Chemistry", title: "Electrochemistry", price: 40 },
      { id: 3, subject: "Math", title: "Calculus - Integration", price: 40 },
    ],
  };

  const notes = NOTES_DATA[classId as keyof typeof NOTES_DATA] || [];
  
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-serif font-bold text-foreground"
          >
            Class {classId}th Notes
          </motion.h1>
          <p className="text-muted-foreground">
            Premium study notes and comprehensive summaries
          </p>
        </div>
        
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button onClick={() => setShowUnlockModal(true)} className="gap-2 shadow-lg hover:shadow-xl transition-all">
              <Lock className="h-4 w-4" /> Unlock Access
            </Button>
          </motion.div>
        )}

        {isUnlocked && (
           <Badge variant="secondary" className="h-10 px-4 text-green-600 bg-green-100 border-green-200 gap-2 self-start md:self-auto">
             <Unlock className="h-4 w-4" /> Access Unlocked
           </Badge>
        )}
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search notes..." 
          className="pl-10 h-12 text-lg bg-card/50 backdrop-blur border-primary/20 focus-visible:ring-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note, idx) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className={`h-full transition-all duration-300 ${!isUnlocked ? 'opacity-80 grayscale-[0.3]' : 'hover:shadow-lg hover:border-primary/50'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{note.subject}</Badge>
                  {!isUnlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                  {isUnlocked && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                <CardTitle className="mt-2 text-xl">{note.title}</CardTitle>
                <CardDescription>Comprehensive Chapter Notes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>PDF Format • 2.5 MB</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t bg-muted/30 p-4">
                <span className="font-bold text-lg">₹{note.price}</span>
                <Button 
                  variant={isUnlocked ? "default" : "secondary"} 
                  onClick={() => isUnlocked ? toast({ title: "Opening PDF..." }) : setShowUnlockModal(true)}
                >
                  {isUnlocked ? "View Notes" : "Unlock"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={showUnlockModal} onOpenChange={setShowUnlockModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unlock Class {classId} Notes</DialogTitle>
            <DialogDescription>
              Enter your student code to access all premium notes for this class.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">Student Code</Label>
              <div className="flex gap-2">
                <Input 
                  id="code" 
                  placeholder="Enter 4-digit code" 
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  maxLength={4}
                  type="password"
                  className="text-center text-lg tracking-widest"
                />
                <Button onClick={handleUnlock} disabled={unlockClassMutation.isPending}>
                  {unlockClassMutation.isPending ? "Verifying..." : "Submit"}
                </Button>
              </div>
              {error && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {error}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or pay directly</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handlePayment}>
              Pay ₹40 to Unlock
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
        }
