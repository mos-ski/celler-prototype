import { Link } from "react-router-dom";
import {
  Phone, Wifi, Zap, Tv, Dices, ArrowUp, ArrowDown,
  Shield, Clock, Wallet, ChevronRight, Star, CheckCircle,
} from "lucide-react";

const FEATURES = [
  {
    icon: Phone,
    title: "Airtime",
    description: "Buy airtime for all networks instantly at the best rates",
    color: "#6366f1",
  },
  {
    icon: Wifi,
    title: "Data",
    description: "Purchase data bundles for MTN, Airtel, Glo, and 9mobile",
    color: "#8b5cf6",
  },
  {
    icon: Zap,
    title: "Electricity",
    description: "Pay your electricity bills and never lose power",
    color: "#f59e0b",
  },
  {
    icon: Tv,
    title: "TV Subscriptions",
    description: "Renew your DSTV, GOtv, and Startimes subscriptions",
    color: "#10b981",
  },
  {
    icon: Dices,
    title: "Betting",
    description: "Fund your betting accounts seamlessly",
    color: "#ef4444",
  },
  {
    icon: Wallet,
    title: "Wallet",
    description: "Fund your wallet and pay bills from one place",
    color: "#6366f1",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Create Account",
    description: "Sign up in seconds with your phone number",
  },
  {
    step: "02",
    title: "Fund Wallet",
    description: "Deposit funds via bank transfer or card",
  },
  {
    step: "03",
    title: "Pay Bills",
    description: "Select a service and pay instantly",
  },
];

const TESTIMONIALS = [
  {
    name: "Adaeze O.",
    role: "Small Business Owner",
    quote: "Sella has made paying bills so much easier. I can buy airtime and pay for electricity all in one place!",
    rating: 5,
  },
  {
    name: "Chukwuemeka N.",
    role: "Student",
    quote: "The best rates for data bundles. I save money every month using Sella.",
    rating: 5,
  },
  {
    name: "Fatima A.",
    role: "Freelancer",
    quote: "Fast, reliable, and the interface is so clean. Highly recommend!",
    rating: 5,
  },
];

export default function SellaLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
            >
              S
            </div>
            <span className="text-lg font-bold">Sella</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/a/signin"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/a/signup"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Star size={14} />
                  Nigeria's Smartest Bill Payment App
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Pay Bills
                  <span className="block text-primary">Smarter, Every Day</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Buy airtime, pay for data, electricity, TV subscriptions and more — all from one simple, secure app.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/a/signup"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Start Paying Bills
                  <ChevronRight size={18} />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border rounded-2xl font-semibold hover:bg-secondary/50 transition-colors"
                >
                  Learn More
                </a>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Instant Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Best Rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-72 h-[580px] rounded-[3rem] border-4 border-border bg-card shadow-2xl overflow-hidden">
                {/* Status Bar */}
                <div className="h-12 flex items-center justify-between px-6 pt-2">
                  <span className="text-xs font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2.5 border border-foreground/60 rounded-sm flex items-end">
                      <div className="w-full h-2 bg-foreground/60 rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* App Content */}
                <div className="px-5 pt-4 pb-20 space-y-5">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        A
                      </div>
                      <span className="text-sm font-semibold">Hello, Amina</span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    </div>
                  </div>

                  {/* Wallet Card */}
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4c1d95 100%)" }}
                  >
                    <div className="px-4 pt-4 pb-3">
                      <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1">Total Wallet</p>
                      <p className="text-white text-2xl font-bold">₦125,430.00</p>
                    </div>
                    <div className="px-4 py-2 bg-white/10">
                      <p className="text-white/70 text-[9px] tracking-wide">ACCT NO: 0765 6736 7282</p>
                    </div>
                  </div>

                  {/* Action Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: "📱", label: "Airtime", color: "#6366f1" },
                      { icon: "📶", label: "Data", color: "#8b5cf6" },
                      { icon: "⚡", label: "Electric", color: "#f59e0b" },
                      { icon: "📺", label: "TV", color: "#10b981" },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col items-center gap-1.5">
                        <div
                          className="h-11 w-11 rounded-xl flex items-center justify-center text-lg"
                          style={{ background: `${item.color}20` }}
                        >
                          {item.icon}
                        </div>
                        <span className="text-[9px] text-muted-foreground">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recent */}
                  <div>
                    <p className="text-xs font-semibold mb-2">Recent</p>
                    <div className="space-y-2">
                      {[
                        { label: "MTN Airtime", amount: "-₦500", emoji: "📱" },
                        { label: "Electricity Bill", amount: "-₦15,000", emoji: "⚡" },
                      ].map((tx) => (
                        <div key={tx.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm">
                              {tx.emoji}
                            </div>
                            <span className="text-xs font-medium">{tx.label}</span>
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground">{tx.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-background/95 backdrop-blur-md border-t border-border/40 flex items-center justify-around px-4">
                  {["🏠", "📄", "🕐", "👥", "👤"].map((icon, i) => (
                    <div key={i} className={`flex flex-col items-center gap-0.5 ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                      <span className="text-lg">{icon}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From airtime to electricity, Sella covers all your essential bill payments in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-card border border-border/40 hover:border-primary/30 transition-colors group"
                >
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: `${feature.color}20` }}
                  >
                    <Icon size={22} style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500K+", label: "Users" },
              { value: "2M+", label: "Transactions" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Users
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what our users have to say about Sella
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-2xl bg-card border border-border/40"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-8 md:p-12 text-center"
            style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4c1d95 100%)" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start?
            </h2>
            <p className="text-white/70 max-w-md mx-auto mb-8">
              Join thousands of Nigerians who are already paying bills smarter with Sella
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/a/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-2xl font-semibold hover:bg-white/90 transition-colors"
              >
                Create Free Account
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/a/signin"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-2xl font-semibold hover:bg-white/10 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
                >
                  S
                </div>
                <span className="text-lg font-bold">Sella</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Pay smarter, every day. Nigeria's trusted bill payment platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 Sella. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
