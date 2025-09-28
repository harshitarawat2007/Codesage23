import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import codesageLogo from "@/assets/codesage-logo.jpg";

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    role: 'candidate' | 'manager';
    avatar?: string;
  };
  onLogout?: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="glass-card sticky top-0 z-50 w-full border-b border-glass-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={codesageLogo} 
              alt="CodeSage" 
              className="h-8 w-8 rounded-lg"
            />
            <span className="gradient-text text-xl font-bold">CodeSage</span>
          </div>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-card border-glass-border" align="end">
                <DropdownMenuItem className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center space-x-2 text-destructive focus:text-destructive"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost">Login</Button>
              <Button variant="default" className="btn-hero">Sign Up</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}