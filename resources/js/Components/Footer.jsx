import React from 'react';
import { Link } from '@inertiajs/react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
    const navigation = [
        { name: 'Home', href: route('home') },
        { name: 'Employees', href: route('public.employees') },
        { name: 'Projects', href: route('public.projects') },
    ];

    const socialMedia = [
        {
            name: 'Facebook',
            icon: Facebook,
            href: 'https://facebook.com/bizecore',
            color: 'hover:bg-blue-600'
        },
        {
            name: 'Twitter',
            icon: Twitter,
            href: 'https://twitter.com/bizecore',
            color: 'hover:bg-sky-500'
        },
        {
            name: 'Instagram',
            icon: Instagram,
            href: 'https://instagram.com/bizecore',
            color: 'hover:bg-pink-600'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: 'https://linkedin.com/company/bizecore',
            color: 'hover:bg-blue-700'
        },
        {
            name: 'Youtube',
            icon: Youtube,
            href: 'https://youtube.com/@bizecore',
            color: 'hover:bg-red-600'
        },
    ];

    const contactInfo = [
        { icon: Mail, text: 'contact@bizecore.com', href: 'mailto:contact@bizecore.com' },
        { icon: Phone, text: '+62 21 1234 5678', href: 'tel:+622112345678' },
        { icon: MapPin, text: 'Jakarta, Indonesia' },
    ];

    return (
        <footer className="bg-slate-900 text-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-indigo-600/10 to-violet-600/10 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

                    {/* Company Info */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                Bizecore
                            </h3>
                            <p className="mt-4 text-slate-400 text-sm leading-relaxed font-medium">
                                Empowering data-driven organizations with cutting-edge management solutions and real-time intelligence.
                            </p>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Follow Us</h4>
                            <div className="flex gap-3">
                                {socialMedia.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white ${social.color} transition-all hover:scale-110 hover:shadow-lg`}
                                            aria-label={social.name}
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-300 hover:text-indigo-400 transition-colors font-medium flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 mr-3 group-hover:bg-indigo-400 transition-colors"></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href={route('login')}
                                    className="text-slate-300 hover:text-indigo-400 transition-colors font-medium flex items-center group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 mr-3 group-hover:bg-indigo-400 transition-colors"></span>
                                    Dashboard Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Resources</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Documentation', href: route('documentation') },
                                { name: 'API Reference', href: route('api.reference') },
                                { name: 'Support Center', href: route('support') },
                                { name: 'Privacy Policy', href: route('privacy') },
                                { name: 'Terms of Service', href: route('terms') },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-300 hover:text-indigo-400 transition-colors font-medium flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400/50 mr-3 group-hover:bg-violet-400 transition-colors"></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            {contactInfo.map((contact, index) => {
                                const Icon = contact.icon;
                                const content = (
                                    <>
                                        <Icon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                        <span className="text-slate-300 text-sm font-medium">
                                            {contact.text}
                                        </span>
                                    </>
                                );

                                return contact.href ? (
                                    <li key={index}>
                                        <a
                                            href={contact.href}
                                            className="flex items-center gap-3 hover:text-indigo-400 transition-colors group"
                                        >
                                            {content}
                                        </a>
                                    </li>
                                ) : (
                                    <li key={index} className="flex items-center gap-3">
                                        {content}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Newsletter */}
                        <div className="mt-8 p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                            <h5 className="font-bold text-sm mb-2">Stay Updated</h5>
                            <p className="text-xs text-slate-400 mb-3">Get the latest news and updates</p>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
                                />
                                <button className="w-full px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs font-bold transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm font-medium">
                            &copy; {new Date().getFullYear()} Bizecore. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href={route('privacy')} className="text-slate-400 hover:text-indigo-400 text-xs font-bold uppercase tracking-wider transition-colors">
                                Privacy
                            </Link>
                            <Link href={route('terms')} className="text-slate-400 hover:text-indigo-400 text-xs font-bold uppercase tracking-wider transition-colors">
                                Terms
                            </Link>
                            <a href="#" className="text-slate-400 hover:text-indigo-400 text-xs font-bold uppercase tracking-wider transition-colors">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
