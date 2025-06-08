import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple via-pink to-peach px-4 py-8">
      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl px-8 py-12 w-full max-w-4xl text-center space-y-10 border border-white/20">
        
        {/* Logo and Headline */}
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-gradient-to-br from-purple to-pink p-6 rounded-2xl shadow-lg">
            <img
              src="/tprflow-logo-purple.png"
              alt="TPRFlow Logo"
              className="w-20 h-20 filter brightness-0 invert"
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent leading-tight">
              Simplify & Automate<br />Pension Re‑Enrolment
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              TPRFlow helps payroll teams and consultancies stay compliant—automatically. 
              Streamline your workflow with intelligent automation.
            </p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="/signup"
            className="group relative overflow-hidden bg-gradient-to-r from-pink to-peach text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <span className="relative z-10">Get Started Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-peach to-pink opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </a>
          <a
            href="/signin"
            className="bg-white/80 backdrop-blur-sm border-2 border-pink/20 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:border-pink hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Sign In
          </a>
        </div>
        
        <div className="inline-block bg-gradient-to-r from-purple/10 to-pink/10 rounded-full px-6 py-2">
          <span className="text-sm font-medium bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent">
            ✨ Free plan supports up to 25 clients
          </span>
        </div>
        
        {/* Dashboard Preview */}
        <div className="mt-12 relative">
          <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner border-2 border-gray-200/50 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-pink/5"></div>
            <div className="relative z-10 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple/20 to-pink/20 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-700">Dashboard Preview</p>
                <p className="text-sm text-gray-500">See your pension compliance at a glance</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-pink/30 rounded-full"></div>
            <div className="absolute top-8 right-6 w-2 h-2 bg-purple/30 rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-peach/30 rounded-full"></div>
          </div>
        </div>
        
        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-purple/5 to-purple/10 rounded-xl p-6 border border-purple/10">
            <div className="w-12 h-12 bg-purple/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Automated Compliance</h3>
            <p className="text-sm text-gray-600">Stay compliant automatically with smart monitoring</p>
          </div>
          
          <div className="bg-gradient-to-br from-pink/5 to-pink/10 rounded-xl p-6 border border-pink/10">
            <div className="w-12 h-12 bg-pink/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Multi-Client Management</h3>
            <p className="text-sm text-gray-600">Manage all your clients from one dashboard</p>
          </div>
          
          <div className="bg-gradient-to-br from-peach/5 to-peach/10 rounded-xl p-6 border border-peach/10">
            <div className="w-12 h-12 bg-peach/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-peach" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Real-time Reporting</h3>
            <p className="text-sm text-gray-600">Get instant insights with live reporting</p>
          </div>
        </div>
        
        {/* Footer Note */}
        <div className="pt-8 border-t border-gray-200/50">
          <p className="text-xs text-gray-400">Powered by the IP team</p>
        </div>
      </div>
    </div>
  );
}
