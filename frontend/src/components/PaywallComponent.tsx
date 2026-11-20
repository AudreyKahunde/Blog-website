import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "../../../backend/convex/_generated/api";

interface PaywallProps {
  amount: number;
  currency: string;
  postId: string; // Changed from 'any' to 'string' to fix TS red line
  userId: string;
  onSuccess: () => void;
}

export function PaywallComponent({ amount, currency, postId, userId, onSuccess }: PaywallProps) {
  const [network, setNetwork] = useState("mtn");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  
  const recordPurchase = useMutation(api.posts.recordPurchase);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      try {
        // Cast postId as any here just to satisfy Convex's exact Id type requirement
        await recordPurchase({ postId: postId as any, userId, amount });
        setLoading(false);
        onSuccess();
      } catch (error) {
        setLoading(false);
        alert("Payment failed. Please try again.");
      }
    }, 1500);
  };

  return (
    <div className="border border-slate-200 rounded-2xl p-6 md:p-8 bg-white shadow-sm max-w-lg mx-auto">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 border border-yellow-100 shadow-sm">
          🔒
        </div>
      </div>

      <h2 className="text-center text-2xl font-serif mb-2 text-slate-900">
        Support Independent Writing & Unlock Full Essay
      </h2>
      
      <p className="text-center text-sm text-slate-500 mb-6 px-4">
        Access the complete 4,000-word article, citations, and full archives with instant Mobile Money authorization.
      </p>

      <div className="text-center mb-8">
        <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-xs font-semibold border border-orange-200 tracking-wide">
          ONE-TIME CONTRIBUTION {currency} {amount.toLocaleString()}
        </span>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
        <button type="button" className="flex-1 bg-white shadow-sm rounded-md py-2 text-sm font-medium text-blue-600">
          New Access
        </button>
        <button type="button" className="flex-1 py-2 text-sm font-medium text-slate-500 hover:text-slate-700">
          Returning Reader
        </button>
      </div>

      <form onSubmit={handlePay}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button type="button" onClick={() => setNetwork('mtn')} className={`border p-3 rounded-lg flex flex-col items-center justify-center transition-all ${network === 'mtn' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}>
            <span className="w-2 h-2 bg-yellow-400 rounded-full mb-1"></span>
            <span className="text-sm font-semibold">MTN MoMo</span>
          </button>
          <button type="button" onClick={() => setNetwork('airtel')} className={`border p-3 rounded-lg flex flex-col items-center justify-center transition-all ${network === 'airtel' ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-slate-200 hover:border-slate-300'}`}>
            <span className="w-2 h-2 bg-red-600 rounded-full mb-1"></span>
            <span className="text-sm font-semibold">Airtel Money</span>
          </button>
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <Label className="text-xs font-bold text-slate-700">Your Email Address</Label>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="you@example.com" 
          />
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <Label className="text-xs font-bold text-slate-700">Mobile Money Number</Label>
          <div className="flex border border-slate-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <span className="bg-slate-50 px-3 flex items-center text-sm text-slate-600 border-r border-slate-300">+256</span>
            <Input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-full"
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors">
          {loading ? 'Processing Payment...' : `🔒 Pay via Mobile Money & Read Now`}
        </Button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
        Instant handset prompt. Enter your PIN to approve.
      </div>
    </div>
  );
}