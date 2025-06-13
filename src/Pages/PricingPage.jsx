import React, { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  InformationCircleIcon, 
  StarIcon,
  XMarkIcon,
  ArrowRightIcon,
  CurrencyPoundIcon,
  CalendarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ClockIcon,
  BoltIcon,
  SparklesIcon,
  HeartIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  PlayIcon,
  DocumentTextIcon,
  CreditCardIcon,
  GiftIcon,
  LightBulbIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/solid';

const plans = [
  {
    name: 'Free',
    badge: 'Start Free',
    badgeColor: 'bg-gray-100 text-gray-800',
    price: { monthly: '£0', annually: '£0' },
    originalPrice: null,
    description: 'Perfect for trying out TPRFlow',
    subtitle: 'Up to 25 clients included',
    clientLimit: '25 clients',
    features: {
      'Core Platform': [
        { label: 'Dashboard & Client Management', subtitle: 'Save 5+ hours/week', info: 'Automated tracking eliminates manual spreadsheet management.', icon: ChartBarIcon },
        { label: 'Advanced Filters & Search', subtitle: 'Find any client in seconds', info: 'Quickly locate clients using powerful search and status filters.', icon: BoltIcon },
        { label: 'Secure Azure Hosting', subtitle: 'Bank-level security', info: 'All data stored securely on Microsoft Azure infrastructure with 99.9% uptime.', icon: ShieldCheckIcon }
      ],
      'User Access': [
        { label: 'Single User Access', subtitle: 'One login per account', info: 'Perfect for solo practitioners getting started.', icon: UserGroupIcon }
      ]
    },
    color: 'border-gray-200 dark:border-gray-700',
    bgColor: 'bg-white dark:bg-gray-800',
    textColor: 'text-gray-900 dark:text-white',
    buttonColor: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-600 dark:text-white',
    ctaText: 'Start Free Forever',
    popular: false,
  },
  {
    name: 'Basic',
    badge: 'Best Value',
    badgeColor: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
    price: { monthly: '£1', annually: '£0.83' },
    originalPrice: { monthly: null, annually: '£1.00' },
    description: 'Automate reminders and reporting',
    subtitle: 'Everything in Free, plus automation',
    clientLimit: 'Unlimited clients',
    features: {
      'Everything in Free': [
        { label: 'All Free features included', subtitle: 'Full platform access', info: 'Complete dashboard, search, and security features.', icon: CheckCircleIcon }
      ],
      'User Access': [
        { label: 'Two Team Members', subtitle: 'Collaborative access', info: 'Allow two team members to access and manage clients.', icon: UserGroupIcon }
      ],
      'Automated Reminders & Reports': [
        { label: 'Smart Client Reminders', subtitle: 'Never miss a deadline', info: 'Automatic email reminders to clients before critical due dates.', icon: BoltIcon },
        { label: 'Team Notifications', subtitle: 'Stay informed instantly', info: 'Get notified when clients update key dates or status changes.', icon: SparklesIcon },
        { label: 'Monthly Compliance Reports', subtitle: 'Automated reporting', info: 'Receive detailed monthly overview reports for all declarations.', icon: DocumentTextIcon },
        { label: 'Custom Email Templates', subtitle: 'Your branding', info: 'Personalise client communication with your company branding.', icon: HeartIcon }
      ],
      'Coming Soon': [
        { label: 'Two-Factor Authentication', subtitle: 'Q2 2025', info: 'Enhanced login security with 2FA protection.', icon: ShieldCheckIcon }
      ]
    },
    color: 'border-orange-300 dark:border-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    textColor: 'text-gray-900 dark:text-white',
    buttonColor: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600',
    ctaText: 'Start Basic Plan',
    popular: false,
  },
  {
    name: 'Premium',
    badge: 'Most Popular',
    badgeColor: 'bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white',
    price: { monthly: '£2', annually: '£1.66' },
    originalPrice: { monthly: null, annually: '£2.00' },
    description: 'Complete automation with integrations',
    subtitle: 'Everything in Basic, plus enterprise features',
    clientLimit: 'Unlimited clients',
    features: {
      'Everything in Basic': [
        { label: 'All Basic features included', subtitle: 'Full automation suite', info: 'Complete access to all reminders, reports, and basic features.', icon: CheckCircleIcon }
      ],
      'User Access': [
        { label: 'Unlimited Team Members', subtitle: 'Scale your team', info: 'No user limits — perfect for growing businesses and large teams.', icon: UserGroupIcon }
      ],
      'Advanced Automation': [
        { label: 'Consultant Task Management', subtitle: 'Team coordination', info: 'Assign and automatically alert consultants to specific client duties.', icon: RocketLaunchIcon },
        { label: 'White-Label Reports', subtitle: 'Your brand everywhere', info: 'Fully branded monthly client reporting with your company logo and colors.', icon: SparklesIcon },
        { label: 'Advanced Email Workflows', subtitle: 'Smart automation', info: 'Complex email sequences and conditional reminders based on client status.', icon: BoltIcon },
        { label: 'Compliance Predictions', subtitle: 'AI-powered insights', info: 'Predictive analytics to identify clients at risk of non-compliance.', icon: LightBulbIcon }
      ],
      'Enterprise Support': [
        { label: 'Priority Support', subtitle: 'Fast-track assistance', info: 'Get priority email and phone support from our expert team.', icon: PhoneIcon },
        { label: 'API Access & Integrations', subtitle: 'Connect your tools', info: 'Full REST API access and integrations with popular business tools.', icon: CreditCardIcon }
      ],
      'Coming Soon': [
        { label: 'Single Sign-On (SSO)', subtitle: 'Q3 2025', info: 'Enterprise-grade SSO via Microsoft 365, Google Workspace, or custom SAML.', icon: ShieldCheckIcon }
      ]
    },
    color: 'border-[#401D6C] shadow-2xl ring-4 ring-[#401D6C]/20 dark:ring-[#EC385D]/20',
    bgColor: 'bg-gradient-to-br from-[#401D6C]/5 to-[#EC385D]/5 dark:from-[#401D6C]/20 dark:to-[#EC385D]/20',
    textColor: 'text-gray-900 dark:text-white',
    buttonColor: 'bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white hover:from-[#351759] hover:to-[#d63450]',
    ctaText: 'Start Premium Trial',
    popular: true,
  }
];

const faqs = [
  {
    question: 'How does the pricing work?',
    answer: 'Pricing is based on your peak client count each month. You only pay for the highest number of clients you manage during that billing period. The first 25 clients are always free!'
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing adjustments are prorated.'
  },
  {
    question: 'What happens if I exceed my client limit?',
    answer: 'There are no hard limits. If you exceed 25 clients on the free plan, you\'ll be prompted to upgrade. Paid plans have unlimited clients.'
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes! Annual billing saves you 16.67% compared to monthly billing. You\'ll be billed once per year for the convenience.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'The Free plan is available forever with no time limit. Premium features come with a 14-day free trial, no credit card required.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely! You can cancel your subscription at any time. Your access continues until the end of your current billing period.'
  }
];

const testimonials = [
  {
    text: "TPRFlow transformed our compliance process. We reduced our workload by 75% and never miss a deadline anymore.",
    author: "Sarah Mitchell",
    role: "Director, Payroll Solutions Ltd",
    rating: 5,
    clients: "Managing 340+ clients"
  },
  {
    text: "The automated reminders alone saved us 10 hours per week. The ROI was immediate and substantial.",
    author: "David Thompson", 
    role: "Senior Consultant, ABC Consulting",
    rating: 5,
    clients: "Managing 180+ clients"
  },
  {
    text: "Finally, a solution built specifically for pension compliance. The team clearly understands our industry.",
    author: "Emma Rodriguez",
    role: "Compliance Manager, Global HR Services",
    rating: 5,
    clients: "Managing 520+ clients"
  }
];

const PricingPage = () => {
  const [billing, setBilling] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [clientCount, setClientCount] = useState(50);
  
  // State for tooltip control - tracks which specific tooltip is active
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const calculateSavings = (planPrice, billing) => {
    if (billing === 'annually' && planPrice.annually && planPrice.monthly) {
      const monthlyCost = parseFloat(planPrice.monthly.replace('£', '')) * 12;
      const annualCost = parseFloat(planPrice.annually.replace('£', '')) * 12;
      return Math.round(monthlyCost - annualCost);
    }
    return 0;
  };

  const calculateMonthlyCost = (plan) => {
    if (plan.name === 'Free') return 0;
    const pricePerClient = parseFloat(plan.price[billing].replace('£', ''));
    return Math.max(0, (clientCount - 25) * pricePerClient);
  };

  // Create unique tooltip IDs to track which one should be shown
  const getTooltipId = (planIndex, groupIndex, itemIndex) => {
    return `tooltip-${planIndex}-${groupIndex}-${itemIndex}`;
  };

  const PricingCalculator = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        💡 Calculate Your Cost
      </h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            How many clients do you manage?
          </label>
          <div className="relative">
            <input
              type="range"
              min="1"
              max="500"
              value={clientCount}
              onChange={(e) => setClientCount(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span>1</span>
              <span className="font-bold text-lg text-[#401D6C] dark:text-[#EC385D]">{clientCount} clients</span>
              <span>500+</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan, idx) => {
            const monthlyCost = calculateMonthlyCost(plan);
            return (
              <div key={idx} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                <div className="font-semibold text-gray-900 dark:text-white mb-1">{plan.name}</div>
                <div className="text-2xl font-bold text-[#401D6C] dark:text-[#EC385D]">
                  £{monthlyCost}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">/month</div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center p-4 bg-gradient-to-r from-[#401D6C]/10 to-[#EC385D]/10 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            💡 <strong>Remember:</strong> First 25 clients are always free! You only pay for clients beyond that limit.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#401D6C]/20 to-[#EC385D]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#FF8073]/20 to-[#EC385D]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <div className="relative px-4 py-16">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
            <GiftIcon className="h-4 w-4" />
            <span>First 25 clients always free!</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#401D6C] via-[#EC385D] to-[#FF8073] bg-clip-text text-transparent mb-8 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Start free with 25 clients, then pay only for what you use. 
            <span className="font-semibold text-[#401D6C] dark:text-[#EC385D]"> No setup fees, no contracts, cancel anytime.</span>
          </p>
          
          {/* Enhanced Billing Toggle */}
          <div className="flex justify-center items-center gap-6 mb-12">
            <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Billing:</span>
            <div className="relative bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex">
              <button
                className={`relative px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  billing === 'monthly' 
                    ? 'bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setBilling('monthly')}
              >
                <CalendarIcon className="h-4 w-4" />
                Monthly
              </button>
              <button
                className={`relative px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  billing === 'annually' 
                    ? 'bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setBilling('annually')}
              >
                <CurrencyPoundIcon className="h-4 w-4" />
                Annually 
                <span className="ml-2 text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-bold animate-pulse">
                  Save 16%
                </span>
              </button>
            </div>
          </div>

          {/* Quick Value Props */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: ClockIcon, text: "Save 5+ hours per week", color: "text-green-600" },
              { icon: ShieldCheckIcon, text: "Never miss a deadline", color: "text-blue-600" },
              { icon: HeartIcon, text: "Used by 500+ consultants", color: "text-pink-600" }
            ].map((prop, idx) => (
              <div key={idx} className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <prop.icon className={`h-6 w-6 ${prop.color}`} />
                <span className="font-medium text-gray-900 dark:text-white">{prop.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {plans.map((plan, planIdx) => {
            const savings = calculateSavings(plan.price, billing);
            return (
              <div
                key={planIdx}
                className={`relative rounded-3xl border-2 ${plan.color} ${plan.bgColor} ${plan.textColor} p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 flex flex-col h-full group ${
                  plan.popular ? 'transform scale-105 z-10' : ''
                } ${selectedPlan === planIdx ? 'ring-4 ring-[#401D6C]/30' : ''}`}
                onClick={() => setSelectedPlan(selectedPlan === planIdx ? null : planIdx)}
              >
                {/* Enhanced Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`${plan.badgeColor} font-bold text-sm px-6 py-2 rounded-full shadow-xl flex items-center gap-2 animate-pulse`}>
                      {plan.badge === 'Most Popular' && <StarIcon className="h-4 w-4" />}
                      {plan.badge === 'Best Value' && <BoltIcon className="h-4 w-4" />}
                      {plan.badge === 'Start Free' && <GiftIcon className="h-4 w-4" />}
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-sm opacity-80 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-2">
                      {plan.originalPrice && plan.originalPrice[billing] && (
                        <span className="text-2xl line-through opacity-50">
                          {plan.originalPrice[billing]}
                        </span>
                      )}
                      <span className="text-6xl font-extrabold">{plan.price[billing]}</span>
                      <span className="text-lg font-medium opacity-80">
                        /client{billing === 'annually' ? '/month' : ''}
                      </span>
                    </div>
                    
                    {billing === 'annually' && savings > 0 && (
                      <div className="text-sm opacity-90 mt-2 font-semibold">
                        💰 Save £{savings} per client/year!
                      </div>
                    )}
                    
                    {billing === 'annually' && plan.name !== 'Free' && (
                      <div className="text-sm opacity-75 mt-1">Billed annually</div>
                    )}
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                    <UserGroupIcon className="h-4 w-4" />
                    {plan.clientLimit}
                  </div>
                </div>

                {/* Enhanced Features */}
                <div className="flex-1 space-y-8">
                  {Object.entries(plan.features).map(([group, items], groupIdx) => (
                    <div key={groupIdx}>
                      <h4 className="font-bold text-sm uppercase mb-4 pb-2 border-b border-current/20 tracking-wider flex items-center gap-2">
                        {group === 'Core Platform' && <ChartBarIcon className="h-4 w-4" />}
                        {group === 'User Access' && <UserGroupIcon className="h-4 w-4" />}
                        {group === 'Automated Reminders & Reports' && <BoltIcon className="h-4 w-4" />}
                        {group === 'Coming Soon' && <SparklesIcon className="h-4 w-4" />}
                        {group}
                      </h4>
                      <ul className="space-y-4">
                        {items.map((item, itemIdx) => {
                          const Icon = item.icon;
                          const tooltipId = getTooltipId(planIdx, groupIdx, itemIdx);
                          
                          return (
                            <li key={itemIdx} className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                                <CheckCircleIcon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <div className="p-1 bg-white/10 rounded-lg">
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <span className="font-semibold">{item.label}</span>
                                  <div className="relative">
                                    <InformationCircleIcon 
                                      className="w-4 h-4 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" 
                                      onMouseEnter={() => setActiveTooltip(tooltipId)}
                                      onMouseLeave={() => setActiveTooltip(null)}
                                    />
                                    {activeTooltip === tooltipId && (
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 p-4 bg-gray-900 text-white text-sm rounded-xl shadow-xl z-50 pointer-events-none">
                                        {item.info}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {item.subtitle && (
                                  <div className="text-sm opacity-75 font-medium">{item.subtitle}</div>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Enhanced CTA Button */}
                <div className="mt-8 space-y-4">
                  <button className={`${plan.buttonColor} transition-all duration-300 font-bold py-4 px-8 rounded-xl w-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg group-hover:scale-105`}>
                    {plan.name === 'Free' && <GiftIcon className="h-5 w-5" />}
                    {plan.name === 'Premium' && <RocketLaunchIcon className="h-5 w-5" />}
                    {plan.name === 'Basic' && <ArrowRightIcon className="h-5 w-5" />}
                    {plan.ctaText}
                  </button>
                  
                  {plan.name !== 'Free' && (
                    <p className="text-xs opacity-75 text-center">
                      🎯 14-day free trial • No credit card required
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Calculator Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-8">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#401D6C] to-[#EC385D] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              <LightBulbIcon className="h-5 w-5" />
              {showCalculator ? 'Hide' : 'Show'} Pricing Calculator
            </button>
          </div>
          
          {showCalculator && (
            <div className="animate-in slide-in-from-top-5 duration-500">
              <PricingCalculator />
            </div>
          )}
        </div>

        {/* Enhanced Testimonials */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Loved by 500+ Pension Professionals
          </h2>
          
          <div className="relative">
            <div className="bg-gradient-to-r from-[#401D6C] to-[#EC385D] rounded-3xl p-10 text-white shadow-2xl">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-8 w-8 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-2xl font-medium italic leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                    {testimonials[currentTestimonial].author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <cite className="text-yellow-200 font-bold text-lg block">
                      {testimonials[currentTestimonial].author}
                    </cite>
                    <div className="text-white/80">{testimonials[currentTestimonial].role}</div>
                    <div className="text-white/60 text-sm">{testimonials[currentTestimonial].clients}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial ? 'bg-[#401D6C] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">{faq.question}</span>
                  <div className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-8 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed animate-in slide-in-from-top-2 duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Why Choose TPRFlow?
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheckIcon, title: '30-day money-back guarantee', desc: 'Risk-free trial period' },
                { icon: CreditCardIcon, title: 'No setup fees', desc: 'Start immediately' },
                { icon: HeartIcon, title: 'Cancel anytime', desc: 'No long-term contracts' },
                { icon: RocketLaunchIcon, title: 'Free data migration', desc: 'We handle the transfer' }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#401D6C] to-[#EC385D] rounded-2xl mb-4">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#401D6C] via-[#EC385D] to-[#FF8073] rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Compliance?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join 500+ pension professionals who save 5+ hours per week with TPRFlow
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#401D6C] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                <RocketLaunchIcon className="h-6 w-6" />
                Start Free Trial
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2">
                <PlayIcon className="h-6 w-6" />
                Watch Demo
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
                Talk to Sales
              </button>
            </div>
            
            <p className="text-sm opacity-75 mt-6">
              💡 No credit card required • Setup in under 5 minutes • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;