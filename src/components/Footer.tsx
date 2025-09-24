const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            © 2024 ContractAnalyzer. All rights reserved. |{" "}
            <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span> |{" "}
            <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
          </p>
          <p className="text-xs mt-2">
            Powered by advanced AI technology for reliable contract analysis
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;