import { useState } from "react";
import {
  Wallet as WalletIcon,
  QrCode,
  TrendingUp,
  Gift,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../components/Card";
import { Button } from "../components/Button";
import { mockWalletData } from "../utils/mockData";
import { formatRelativeTime } from "../utils/helpers";

export const Wallet = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { balance, streak, transactions, rewards } = mockWalletData;

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm mb-1">Available Points</p>
              <h2 className="text-4xl font-bold">{balance.toLocaleString()}</h2>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <WalletIcon size={32} />
            </div>
          </div>

          {/* Streak Info */}
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
            <Award size={20} className="text-accent-400" />
            <div>
              <p className="text-sm font-medium">{streak}-Day Streak! 🔥</p>
              <p className="text-xs text-primary-100">
                Keep it up to earn bonus points
              </p>
            </div>
          </div>

          {/* QR Scan Button */}
          <Button
            variant="secondary"
            fullWidth
            className="font-semibold"
            onClick={() => {
              // Handle QR scan
              alert("QR Scanner would open here");
            }}
          >
            <QrCode size={20} className="mr-2" />
            Scan QR at Breakery Café
          </Button>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === "overview"
              ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === "history"
              ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab("rewards")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === "rewards"
              ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Rewards
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="text-center">
                <TrendingUp
                  size={24}
                  className="mx-auto text-green-600 dark:text-green-400 mb-2"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Earned (This Month)
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  +450 pts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <Gift
                  size={24}
                  className="mx-auto text-primary-600 dark:text-primary-400 mb-2"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Redeemed
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  -200 pts
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How to Earn Points */}
          <Card>
            <CardHeader>
              <h3 className="font-bold text-gray-900 dark:text-white">
                How to Earn Points
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg">
                  <Award
                    size={20}
                    className="text-primary-600 dark:text-primary-400"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Complete Bookings
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Earn 100 points for every completed booking
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-accent-100 dark:bg-accent-900/30 p-2 rounded-lg">
                  <Gift
                    size={20}
                    className="text-accent-600 dark:text-accent-400"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Daily Check-in
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get bonus points for consecutive daily logins
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <TrendingUp
                    size={20}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Refer Friends
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get 300 points when a friend makes their first booking
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="space-y-3">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            Transaction History
          </h3>
          {transactions.map((transaction) => (
            <Card key={transaction.id}>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === "earn"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                    }`}
                  >
                    {transaction.type === "earn" ? (
                      <TrendingUp
                        size={20}
                        className="text-green-600 dark:text-green-400"
                      />
                    ) : (
                      <Gift
                        size={20}
                        className="text-red-600 dark:text-red-400"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatRelativeTime(transaction.date)}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-bold ${
                    transaction.type === "earn"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "earn" ? "+" : "-"}
                  {transaction.points}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === "rewards" && (
        <div className="space-y-3">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            Available Rewards
          </h3>
          {rewards.map((reward) => (
            <Card key={reward.id}>
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`p-2 rounded-lg ${
                        reward.completed
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      <Gift
                        size={20}
                        className={
                          reward.completed
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-400"
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {reward.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {reward.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600 dark:text-primary-400">
                      {reward.points} pts
                    </p>
                  </div>
                </div>
                {reward.completed ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
                    <Award size={16} />
                    Completed!
                  </div>
                ) : (
                  <Button variant="outline" size="sm" fullWidth>
                    Learn More
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
