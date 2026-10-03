import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { authService } from "@/features/auth/services/authService";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/shared/components/ui/Button";
import logo from "@/shared/assets/logos/logo.png";

export const Login = ({ onSuccess, initialError = "" }) => {
  const {
    sendOtp: sendOtpFromContext,
    resendOtp: resendOtpFromContext,
    verifyOtp: verifyOtpFromContext,
  } = useAuth();
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [error, setError] = useState(initialError);
  const otpInputsRef = useRef([]);

  useEffect(() => {
    if (!otpSent || resendSeconds <= 0) return undefined;
    const timer = window.setTimeout(
      () => setResendSeconds((seconds) => seconds - 1),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [otpSent, resendSeconds]);

  useEffect(() => {
    if (otpSent) otpInputsRef.current[0]?.focus();
  }, [otpSent]);

  const requestOtp = async (event) => {
    event.preventDefault();
    setError("");
    const normalizedUsername = username
      .trim()
      .toLowerCase()
      .replace(/@jnu\.ac\.in$/i, "");
    if (!/^[a-z0-9._-]+$/.test(normalizedUsername)) {
      setError(
        "Enter your JNU username using letters, numbers, dots, underscores or hyphens.",
      );
      return;
    }

    setBusy(true);
    try {
      await sendOtpFromContext(`${normalizedUsername}@jnu.ac.in`);
      setUsername(normalizedUsername);
      setOtp("");
      setOtpSent(true);
      setResendSeconds(120);
    } catch (sendError) {
      setError(
        sendError?.message || "We couldn't send a code right now. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const resendOtp = async () => {
    if (resendSeconds > 0 || busy) return;
    setBusy(true);
    setError("");
    try {
      await resendOtpFromContext(`${username}@jnu.ac.in`);
      setOtp("");
      setResendSeconds(120);
    } catch (sendError) {
      setError(
        sendError?.message || "We couldn't send a new code. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    setError("");
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit code sent to your JNU email.");
      return;
    }

    setBusy(true);
    try {
      const user = await verifyOtpFromContext(
        `${username.trim().toLowerCase()}@jnu.ac.in`,
        otp,
      );
      onSuccess(user);
    } catch (verifyError) {
      setError(
        verifyError.message ||
          "That code could not be verified. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const handleOtpDigit = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = otp.split("");
    nextOtp[index] = digit;
    setOtp(nextOtp.join("").slice(0, 6));
    if (digit && index < 5) otpInputsRef.current[index + 1]?.focus();
  };

  const loginWithGoogle = () => {
    setError("");
    setBusy(true);
    window.location.assign(authService.getGoogleOAuthUrl());
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-white px-4 py-10 sm:py-12">
      <section className="mx-auto w-full max-w-[560px]">
        <div className="text-center">
          <img
            src={logo}
            alt="JNUBazaar"
            className="mx-auto h-[68px] w-[68px] rounded-2xl object-contain"
          />
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-navy-950 sm:text-[34px]">
            <span className="font-normal text-navy-700/65">Welcome to </span>
            JNUBazaar
          </h1>
          <p className="mt-2 text-base text-navy-800">
            Buy, sell and connect across the JNU community
          </p>
        </div>

        <div className="mt-12">
          {otpSent ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setError("");
                  setOtp("");
                }}
                className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-campus-blue hover:text-blue-800"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <p className="mb-4 text-sm text-navy-950">
                Enter the code sent to <strong>{username}@jnu.ac.in</strong>
              </p>
            </>
          ) : (
            <div className="mb-5 flex border-b border-[#dce2eb]">
              <div className="flex min-w-[96px] items-center justify-center gap-2 border-b-[3px] border-campus-blue px-4 py-3 text-sm font-semibold text-navy-950">
                <Mail className="h-4 w-4" /> Email
              </div>
            </div>
          )}

          <form onSubmit={otpSent ? verifyOtp : requestOtp}>
            {!otpSent ? (
              <label className="flex h-[62px] w-full items-center overflow-hidden rounded-xl border border-[#d8e0eb] bg-white shadow-sm transition focus-within:border-campus-blue focus-within:ring-4 focus-within:ring-blue-50">
                <input
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(event) =>
                    setUsername(
                      event.target.value.replace(/@jnu\.ac\.in$/i, ""),
                    )
                  }
                  className="h-full min-w-0 flex-1 bg-transparent px-4 text-base text-navy-950 outline-none placeholder:text-navy-700/45"
                  placeholder="Your JNU username"
                  aria-label="JNU email username"
                />
                <span className="jnu-domain-suffix mr-2 ml-2 flex min-w-[118px] shrink-0 justify-center rounded-lg bg-[#f1f5fb] px-3 py-2 text-sm font-medium text-navy-700/70">
                  @jnu.ac.in
                </span>
              </label>
            ) : (
              <div className="flex max-w-[450px] gap-2.5 sm:gap-4">
                {Array.from({ length: 6 }, (_, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      otpInputsRef.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(event) =>
                      handleOtpDigit(index, event.target.value)
                    }
                    onPaste={(event) => {
                      const digits = event.clipboardData
                        .getData("text")
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      if (!digits) return;
                      event.preventDefault();
                      setOtp(digits);
                      otpInputsRef.current[Math.min(digits.length, 5)]?.focus();
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Backspace" && !otp[index] && index > 0)
                        otpInputsRef.current[index - 1]?.focus();
                      if (event.key === "ArrowLeft" && index > 0)
                        otpInputsRef.current[index - 1]?.focus();
                      if (event.key === "ArrowRight" && index < 5)
                        otpInputsRef.current[index + 1]?.focus();
                    }}
                    className="h-14 min-w-0 flex-1 rounded-lg border border-[#d9dee7] bg-white text-center text-xl font-semibold text-navy-950 outline-none transition focus:border-campus-blue focus:ring-2 focus:ring-blue-100"
                    aria-label={`Verification digit ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {otpSent && (
              <p className="mt-4 text-sm text-navy-700/65">
                Resend code{" "}
                {resendSeconds > 0 ? (
                  <>
                    in{" "}
                    <span className="font-semibold tabular-nums text-navy-950">
                      {String(Math.floor(resendSeconds / 60)).padStart(2, "0")}:
                      {String(resendSeconds % 60).padStart(2, "0")}
                    </span>
                  </>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={resendOtp}
                    className="font-semibold text-campus-blue hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </p>
            )}

            <Button
              type="submit"
              variant="blue"
              className="mt-5 h-[58px] w-full rounded-lg text-base font-semibold"
              size="lg"
              disabled={busy || (otpSent && otp.length !== 6)}
            >
              {busy ? (
                "Please wait…"
              ) : otpSent ? (
                "Verify OTP"
              ) : (
                <>
                  <Mail className="h-4 w-4" /> Continue with Email
                </>
              )}
            </Button>
          </form>

          <div className="my-7 flex items-center gap-3 text-sm text-navy-700/60">
            <span className="h-px flex-1 bg-[#e2e5eb]" /> Or{" "}
            <span className="h-px flex-1 bg-[#e2e5eb]" />
          </div>
          <Button
            type="button"
            variant="secondary"
            className="h-[58px] w-full rounded-lg border-[#d9dee7] bg-white text-base font-medium hover:bg-[#f8fafd]"
            onClick={loginWithGoogle}
            disabled={busy}
          >
            <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44z"
              />
              <path
                fill="#FBBC05"
                d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2z"
              />
              <path
                fill="#EA4335"
                d="M24 12c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.2C14.2 15.6 18.7 12 24 12z"
              />
            </svg>
            Continue with Google
          </Button>
          <p className="mt-6 text-center text-xs leading-5 text-navy-700/55">
            Access is available to verified Jawaharlal Nehru University email
            accounts.
          </p>
        </div>
      </section>
    </main>
  );
};
