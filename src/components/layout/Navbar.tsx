import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b print:hidden">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-lg">Moment Map</span>
        </div>

        <div className="flex items-center gap-3">
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};

// This is a placeholder component that will be replaced
// when we integrate with Supabase for authentication
const LoginButton: React.FC = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        alert(
          "To implement Google Login, please connect this project to Supabase using the Supabase integration button in the top-right corner."
        )
      }
    >
      Sign in with Google
    </Button>
  );
};
