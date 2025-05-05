export const Footer = () => {
  return (
    <footer className="py-6 border-t bg-muted/30 print:border-t-0">
      <div className="container text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Moment Map. Made with passion by{" "}
        <a href="https://fonij.dev/">Fonij</a>
      </div>
    </footer>
  );
};
