import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Cloud, ShieldCheck, Zap, ArrowRight, Menu, X, Lock, Search, EyeOff, Activity, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/assets/logo";

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 flex flex-col items-center w-full">
            <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex justify-center">
                <div className="container px-4 md:px-8 h-16 flex items-center justify-between w-full max-w-7xl">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Logo variant='icon' />
                        </div>
                        <span>CloudShift</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                        <a href="#security" className="hover:text-foreground transition-colors">Security</a>
                        {/* <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a> */}
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/auth/login">
                            <Button variant="ghost" size="sm">Log in</Button>
                        </Link>
                        <Link to="/auth/signup">
                            <Button size="sm">Get Started</Button>
                        </Link>
                    </div>
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full border-b bg-background p-4 space-y-4 shadow-lg">
                        <div className="flex flex-col gap-4 text-sm font-medium">
                            <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
                            <a href="#security" onClick={() => setIsMenuOpen(false)}>Security</a>
                            <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                            <Link to="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
            <section className="relative overflow-hidden pt-32 md:pt-24 lg:pt-48 pb-16 md:pb-36 w-full flex flex-col items-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 opacity-20 blur-[120px] rounded-full pointer-events-none" />
                <div className="container px-4 md:px-6 relative z-10 text-center w-full max-w-7xl">
                    <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                        New: AI-Powered Image Editing
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        Shift your files into <br className="hidden md:block" />
                        <span className="text-primary">the cloud.</span>
                    </h1>
                    <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl mb-10">
                        Securely store, organize, and edit your files with CloudShift.
                        Experience the next generation of cloud storage with built-in AI tools
                        and lightning-fast global access.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Link to="/auth/signup">
                            <Button size="lg" className="h-12 px-8 text-base">
                                Start for free <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/drive/home">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section id="features" className="py-24 w-full flex justify-center relative overflow-hidden">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 opacity-20 blur-[100px] rounded-full pointer-events-none" />
                <div className="container px-4 md:px-6 w-full max-w-7xl relative z-10">
                    <div className="mb-16 md:text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium text-primary mb-4">
                            <Zap className="mr-2 h-4 w-4" />
                            Powerful features built-in
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            Everything you need in one cloud.
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            CloudShift combines fast storage, rich previews, and AI tools so you can work on your files without leaving your browser.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            icon={<Cloud className="h-6 w-6" />}
                            title="Unified Cloud Drive"
                            description="Store documents, images, videos, and more in a single organized workspace with folders, search, and filters."
                        />
                        <FeatureCard
                            icon={<SparklesIcon className="h-6 w-6" />}
                            title="AI Image Editing"
                            description="Preview images and videos instantly, then apply AI edits like background removal or upscaling with one click."
                        />
                        <FeatureCard
                            icon={<Search className="h-6 w-6" />}
                            title="Global Search"
                            description="Find any file in seconds using names, types, and folders. Jump straight into file from anywhere."
                        />
                    </div>
                </div>
            </section>
            <section id="security" className="py-24 w-full flex justify-center relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 opacity-20 blur-[100px] rounded-full pointer-events-none" />
                <div className="container px-4 md:px-6 w-full max-w-7xl relative z-10">
                    <div className="mb-16 md:text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium text-primary mb-4">
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Uncompromised Security
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            Your data, protected by industry standards.
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            We use advanced encryption to ensure your files remain secure at all times.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <SecurityCard
                            icon={<Lock className="h-6 w-6" />}
                            title="End-to-End Encryption"
                            description="Files are encrypted at rest using AES-256 and in transit via TLS 1.3. Only you hold the keys to your data."
                        />
                        <SecurityCard
                            icon={<EyeOff className="h-6 w-6" />}
                            title="Privacy First"
                            description="We don't scan your files for ads. Your personal content remains strictly confidential and is never sold to third parties."
                        />
                        <SecurityCard
                            icon={<Activity className="h-6 w-6" />}
                            title="Real-time Monitoring"
                            description="24/7 threat detection systems monitor for suspicious activity, blocking potential breaches before they happen."
                        />
                    </div>
                </div>
            </section>
            <section className="py-24 w-full flex justify-center">
                <div className="container px-4 text-center w-full max-w-7xl">
                    <h2 className="text-3xl font-bold tracking-tight mb-16">Trusted by developers & creators</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <Stat number="8k+" label="Active Users" />
                        <Stat number="16TB+" label="Data Stored" />
                        <Stat number="99.9%" label="Uptime" />
                        <Stat number="24/7" label="Support" />
                    </div>
                </div>
            </section>
            <section className="py-24 border-t bg-muted/10 relative overflow-hidden w-full flex justify-center">
                <div className="absolute inset-0 bg-grid-white/5 mask-image-gradient" />
                <div className="container px-4 text-center relative z-10 w-full max-w-7xl">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Ready to shift your files ?
                    </h2>
                    <p className="text-muted-foreground text-lg mb-10 max-w-[600px] mx-auto">
                        Join thousands of users who have switched to the fastest, smartest cloud storage.
                    </p>
                    <Link to="/auth/signup">
                        <Button size="lg" className="h-12 px-10 text-lg">
                            Get Started Now
                        </Button>
                    </Link>
                </div>
            </section>
            <footer className="border-t py-12 bg-background w-full flex justify-center">
                <div className="container px-4 flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-7xl">
                    <div className="flex items-center gap-2 font-semibold">
                        <Logo variant='icon' className="size-6" />
                        <span>CloudShift</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © 2024 CloudShift Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground">Privacy</a>
                        <a href="#" className="hover:text-foreground">Terms</a>
                        <a href="#" className="hover:text-foreground">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: any, title: string, description: string; }) {
    return (
        <div className="group rounded-2xl border bg-background p-8 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    );
}

function SecurityCard({ icon, title, description }: { icon: any, title: string, description: string; }) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border bg-background/50 p-6 backdrop-blur-sm transition-all hover:bg-background hover:border-primary/30 hover:shadow-lg">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                {icon}
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    );
}

function Stat({ number, label }: { number: string, label: string; }) {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <span className="text-4xl font-extrabold text-foreground mb-1">{number}</span>
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
        </div>
    );
}