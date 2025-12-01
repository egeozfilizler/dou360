"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const faqs = [
  {
    id: 1,
    category: "General",
    question: "What is this platform about?",
    answer:
      "This platform is designed to provide a seamless experience for managing your projects, collaborating with your team, and tracking your progress. We offer a suite of tools to help you stay organized and efficient.",
  },
  {
    id: 2,
    category: "General",
    question: "How do I reset my password?",
    answer:
      "To reset your password, navigate to the sign-in page and click on the 'Forgot Password' link. Follow the instructions sent to your email to create a new password.",
  },
  {
    id: 3,
    category: "Billing",
    question: "Can I change my subscription plan?",
    answer:
      "Yes, you can change your subscription plan at any time from your account settings. Navigate to the Billing section and select the plan that best fits your needs.",
  },
  {
    id: 4,
    category: "Billing",
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support PayPal and bank transfers for enterprise plans.",
  },
  {
    id: 5,
    category: "Technical Support",
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support team via email at support@example.com or through the live chat feature available in your dashboard. We're here to help 24/7.",
  },
];

const categories = ["All", "General", "Billing", "Technical Support"];

export default function LearnMorePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold">
            <span className="text-white">DOU360</span>
          </div>
          <button
            onClick={() => router.push("/signin")}
            className="rounded-full border border-white/30 bg-black/40 px-6 py-2 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:text-white active:scale-95"
          >
            Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base text-white/60">
            Find answers to common questions below. If you can&apos;t find what
            you&apos;re looking for, feel free to contact us.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-12">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="h-5 w-5 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder-white/40 backdrop-blur-sm transition-all duration-300 focus:border-[#d70926]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#d70926]/20"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#d70926] text-white shadow-lg shadow-[#d70926]/20"
                  : "border border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="mt-12 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-white/60">
                No questions found. Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-all duration-300"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-[#d70926] transition-transform duration-300 ${
                      openFaqId === faq.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqId === faq.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-white/10 px-6 py-5">
                    <p className="text-white/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
