"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  CheckCircle,
  Shield,
  Eye,
  Twitter,
  ArrowRight,
  Loader2,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface PublicUser {
  id: string;
  handle: string;
  name: string;
  profileImage?: string;
  createdAt: string;
}

export default function LandingPage() {
  const { user, loading, login, logout, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistForm, setWaitlistForm] = useState({
    email: "",
    twitterHandle: "",
  });
  const [submittingWaitlist, setSubmittingWaitlist] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  // Fetch user directory
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const response = await fetch(`${apiUrl}/api/users/directory`);
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [isAuthenticated]); // Refetch when auth status changes

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingWaitlist(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: waitlistForm.email,
          twitterHandle: waitlistForm.twitterHandle,
          referralSource: "landing_page",
        }),
      });

      if (response.ok) {
        setWaitlistSuccess(true);
        setTimeout(() => {
          setShowWaitlist(false);
          setWaitlistSuccess(false);
          setWaitlistForm({ email: "", twitterHandle: "" });
        }, 3000);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to join waitlist");
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      alert("Failed to join waitlist. Please try again.");
    } finally {
      setSubmittingWaitlist(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">OpenAdvisor</h1>
          <nav className="flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900"
            >
              How it Works
            </a>
            <a href="#roadmap" className="text-gray-600 hover:text-gray-900">
              Roadmap
            </a>
            <a
              href="https://twitter.com/OpenAdvisor"
              className="text-gray-600 hover:text-gray-900"
            >
              Twitter
            </a>
            {loading ? (
              <div className="w-32 h-10 bg-gray-100 animate-pulse rounded-lg" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">@{user?.handle}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                Sign in with Twitter
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            The First Platform for{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Compliant Crypto Advisor Deals
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Link your Twitter, showcase your advisor relationships, and build
            trust through radical transparency. No more hidden deals or
            compliance fears.
          </p>
          <div className="flex gap-4 justify-center">
            {loading ? (
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            ) : isAuthenticated ? (
              <div className="flex flex-col items-center gap-4">
                <div className="text-green-600 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Welcome back, @{user?.handle}!</span>
                </div>
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={login}
                  className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium flex items-center gap-3"
                >
                  <Twitter className="w-5 h-5" />
                  Sign in with Twitter to Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowWaitlist(true)}
                  className="bg-white text-black border-2 border-gray-200 px-8 py-4 rounded-lg hover:border-gray-300 transition-colors text-lg font-medium"
                >
                  Join Waitlist
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            The Problem with Crypto Advisor Deals Today
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Regulatory Fear</h4>
              <p className="text-gray-600">
                KOLs fear SEC violations and FTC fines. Projects worry about
                unregistered securities. Everyone operates in the shadows.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Zero Transparency</h4>
              <p className="text-gray-600">
                Communities can&apos;t tell who&apos;s genuinely excited vs.
                who&apos;s paid. Hidden advisor deals erode trust in the entire
                ecosystem.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Manual & Slow</h4>
              <p className="text-gray-600">
                Deals happen through DMs, Telegram chats, and back-channels. No
                standard process means endless negotiations and delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            How OpenAdvisor Works
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Connect Twitter & Wallet</h4>
              <p className="text-gray-600 text-sm">
                Verify your identity with Twitter OAuth and sign with your
                Solana wallet
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Build Your Profile</h4>
              <p className="text-gray-600 text-sm">
                Create a transparent advisor profile showing all your
                relationships
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Log Your Deals</h4>
              <p className="text-gray-600 text-sm">
                Manually add your existing advisor relationships for
                transparency
              </p>
            </div>
            <div className="text-center opacity-50">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-400">4</span>
              </div>
              <h4 className="font-semibold mb-2">Accept Token Grants</h4>
              <p className="text-gray-600 text-sm">
                <span className="text-yellow-600 font-medium">
                  Coming Q1 2025:
                </span>{" "}
                Accept on-chain token grants with built-in vesting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Directory */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-4">
            Transparent KOL Leaderboard
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {users.length > 0
              ? "The latest KOLs who've committed to transparency on OpenAdvisor"
              : "Be among the first KOLs to commit to transparency"}
          </p>

          {loadingUsers ? (
            <div className="flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : users.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {user.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full" />
                    )}
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-sm text-gray-600">@{user.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Verified KOL</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Twitter className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-6">No KOLs have signed up yet</p>
              {!isAuthenticated && (
                <button
                  onClick={login}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  Be the First to Join
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Product Roadmap
          </h3>
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  LIVE NOW
                </span>
                <h4 className="text-xl font-semibold">
                  Phase 1: KOL Profiles & Transparency
                </h4>
              </div>
              <ul className="text-gray-700 space-y-1 ml-6">
                <li>✓ Twitter authentication</li>
                <li>✓ Public KOL directory</li>
                <li>✓ Manual deal logging</li>
                <li>✓ Compliance guidelines</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Q1 2025
                </span>
                <h4 className="text-xl font-semibold">
                  Phase 2: On-Chain Token Grants
                </h4>
              </div>
              <ul className="text-gray-700 space-y-1 ml-6">
                <li>• Solana smart contracts for vesting</li>
                <li>• Project dashboard for creating offers</li>
                <li>• Automated token distribution</li>
                <li>• On-chain deal recording</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Q2 2025
                </span>
                <h4 className="text-xl font-semibold">
                  Phase 3: Compliance Automation
                </h4>
              </div>
              <ul className="text-gray-700 space-y-1 ml-6">
                <li>• Twitter disclosure bot</li>
                <li>• Automated FTC compliance</li>
                <li>• Deal analytics dashboard</li>
                <li>• Multi-chain support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">OpenAdvisor</h2>
          <p className="text-gray-400 mb-6">
            Building trust through transparency in crypto
          </p>
          <div className="flex gap-6 justify-center">
            <a
              href="https://twitter.com/OpenAdvisor"
              className="text-gray-400 hover:text-white"
            >
              Twitter
            </a>
            <a
              href="https://github.com/openadvisor"
              className="text-gray-400 hover:text-white"
            >
              GitHub
            </a>
            <a href="/docs" className="text-gray-400 hover:text-white">
              Documentation
            </a>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowWaitlist(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {waitlistSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  You&apos;re on the list!
                </h3>
                <p className="text-gray-600">
                  We&apos;ll notify you when we launch.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">Get Early Access</h3>
                <p className="text-gray-600 mb-6">
                  Be among the first KOLs to create transparent advisor
                  profiles.
                </p>

                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={waitlistForm.email}
                      onChange={(e) =>
                        setWaitlistForm({
                          ...waitlistForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Twitter Handle
                    </label>
                    <input
                      type="text"
                      value={waitlistForm.twitterHandle}
                      onChange={(e) =>
                        setWaitlistForm({
                          ...waitlistForm,
                          twitterHandle: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="@yourhandle"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingWaitlist}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {submittingWaitlist ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
