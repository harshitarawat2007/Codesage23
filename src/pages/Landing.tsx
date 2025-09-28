import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/features/FeatureGrid";
import { Navbar } from "@/components/ui/navbar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeatureGrid />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="gradient-text block">Hiring Process?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of companies using CodeSage to find exceptional talent 
            through AI-powered coding interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-hero text-lg px-8 py-4">
              Start Free Trial
            </button>
            <button className="btn-glass text-lg px-8 py-4">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}