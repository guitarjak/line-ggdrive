import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Cloud,
  Search,
  Shield,
  Zap,
  FileImage,
  FileVideo,
  FileText,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cloud className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">LineFileSaver</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="text-sm hover:text-primary">
              Features
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary">
              Pricing
            </Link>
            <Link href="#how-it-works" className="text-sm hover:text-primary">
              How It Works
            </Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Never Lose Your
            <span className="text-primary"> LINE Files </span>
            Again
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Automatically save all your LINE photos, videos, and documents to permanent storage.
            Access them anytime, anywhere, forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            ✨ No credit card required • 100 MB free forever
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Does This Sound Familiar?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">😢</div>
                <h3 className="font-bold mb-2">Files Expire</h3>
                <p className="text-muted-foreground">
                  LINE automatically deletes files after a few weeks
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-bold mb-2">Can't Find Files</h3>
                <p className="text-muted-foreground">
                  Scrolling endlessly through chat history to find that one photo
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💔</div>
                <h3 className="font-bold mb-2">Lost Forever</h3>
                <p className="text-muted-foreground">
                  Important documents, memories, work files - all gone
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            How LineFileSaver Solves This
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Automatic, secure, and permanent file storage for your LINE
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Fully Automatic</h3>
              <p className="text-muted-foreground">
                Set it up once, and every file sent in LINE is automatically saved.
                No commands, no buttons, just works!
              </p>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your files are encrypted and stored safely. Only you can access them.
                We never share your data.
              </p>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Search className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy to Find</h3>
              <p className="text-muted-foreground">
                Search by filename, date, or who sent it. Find any file in seconds,
                not scrolling through endless chats.
              </p>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <FileImage className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">All File Types</h3>
              <p className="text-muted-foreground">
                Photos, videos, documents, audio - save everything!
                Supports all file types that LINE supports.
              </p>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Cloud className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Access Anywhere</h3>
              <p className="text-muted-foreground">
                View and download your files from any device - computer, phone, or tablet.
                Always accessible.
              </p>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Never Expires</h3>
              <p className="text-muted-foreground">
                Files are kept permanently (based on your plan).
                No more "file not found" errors!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Get started in just 5 minutes - no technical knowledge required
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Sign Up</h3>
                  <p className="text-muted-foreground">
                    Create your free account in 30 seconds. No credit card required for free plan.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Connect LINE</h3>
                  <p className="text-muted-foreground">
                    Add your LINE Official Account credentials. We'll guide you through every step with pictures!
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Done!</h3>
                  <p className="text-muted-foreground">
                    That's it! From now on, every file in your LINE chats is automatically saved.
                    Use LINE normally - we handle the rest.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/signup">
              <Button size="lg">
                Get Started Now - It's Free!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Choose the plan that's right for you
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="border rounded-lg p-8 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-4">
                $0
                <span className="text-lg text-muted-foreground font-normal">/forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>100 MB storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>1 LINE channel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Unlimited files</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>30-day retention</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Basic search</span>
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full">
                  Start Free
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-primary rounded-lg p-8 hover:shadow-lg transition relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-4">
                $9.99
                <span className="text-lg text-muted-foreground font-normal">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-bold">5 GB storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>3 LINE channels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Unlimited files</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>1-year retention</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Advanced search</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Bulk download</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/signup">
                <Button className="w-full">
                  Start Pro Trial
                </Button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="border rounded-lg p-8 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-4">
                $49.99
                <span className="text-lg text-muted-foreground font-normal">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-bold">50 GB storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Unlimited channels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Unlimited files</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Unlimited retention</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Custom branding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>24/7 support</span>
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Never Lose a File Again?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users protecting their LINE files
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
            </Button>
          </Link>
          <p className="mt-4 opacity-75">
            No credit card required • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Cloud className="h-6 w-6 text-primary" />
                <span className="font-bold">LineFileSaver</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Never lose your LINE files again. Automatic, secure, permanent storage.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li>support@linefilesaver.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 LineFileSaver. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
