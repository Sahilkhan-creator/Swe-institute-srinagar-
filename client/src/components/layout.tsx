import { Link, useLocation } from "wouter";
import { Menu, Settings, BookOpen, Home, Phone, HelpCircle, Info, NotebookPen } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const classes = [
    { id: "8", label: "Class 8th" },
    { id: "9", label: "Class 9th" },
    { id: "10", label: "Class 10th" },
    { id: "11", label: "Class 11th" },
    { id: "12", label: "Class 12th" },
  ];

  const settings = [
    { icon: Info, label: "About Me", href: "/about" },
    { icon: HelpCircle, label: "FAQ", href: "/faq" },
    { icon: Phone, label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Left Menu - Classes */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0" data-testid="button-menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-serif text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  SWE Institute
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu for accessing different classes and home page
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                <Link href="/">
                  <Button 
                    variant={location === "/" ? "secondary" : "ghost"} 
                    className="w-full justify-start gap-2 text-lg font-medium"
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </Button>
                </Link>
                <Link href="/notes">
                  <Button 
                    variant={location.startsWith("/notes") ? "secondary" : "ghost"} 
                    className="w-full justify-start gap-2 text-lg font-medium"
                  >
                    <NotebookPen className="h-5 w-5" />
                    Premium Notes
                  </Button>
                </Link>
                <Separator />
                <div className="px-2 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Select Class
                </div>
                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="flex flex-col gap-2">
                    {classes.map((cls) => (
                      <Link key={cls.id} href={`/class/${cls.id}`}>
                        <Button
                          variant={location === `/class/${cls.id}` ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2 text-lg"
                          data-testid={`link-class-${cls.id}`}
                        >
                          <BookOpen className="h-5 w-5 text-primary" />
                          {cls.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo / Title */}
          <Link href="/">
            <h1 className="text-xl font-bold font-serif bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent cursor-pointer">
              SWE Institute
            </h1>
          </Link>

          {/* Right Menu - Settings */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0" data-testid="button-settings">
                <Settings className="h-6 w-6" />
                <span className="sr-only">Settings</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left font-serif text-xl">Settings</SheetTitle>
                <SheetDescription className="sr-only">
                  Settings menu for accessing about page, FAQs, and contact information
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-2">
                {settings.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-lg">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
    }
