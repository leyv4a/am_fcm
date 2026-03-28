"use client";
import { useState } from "react";
import { messaging } from "@/lib/firebase";
import { getToken } from "firebase/messaging";

export default function Home() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "denied">("idle");

  const handleNotifications = async () => {
    setStatus("loading");
    try {
      const firebaseMessaging = messaging;
      if (!firebaseMessaging) {
        console.error("Messaging no disponible");
        setStatus("idle");
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const currentToken = await getToken(firebaseMessaging, {
          vapidKey:
            "BHzU7h_O2wLdqyZ6K6mWoeK0bqJZ3oOspwXRL1QIYFuI0Rh8_Mdgax8IkaabbOaSMLwcSYMQJmLSl6h01BaBqRs",
        });
        console.log("TOKEN:", currentToken);
        setToken(currentToken);
        setStatus("success");
      } else {
        setStatus("denied");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #f5f4f0;
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f4f0;
          font-family: 'DM Sans', sans-serif;
        }

        .card {
          width: 100%;
          max-width: 420px;
          padding: 56px 48px;
          background: #fafaf8;
          border: 1px solid #e2e0d8;
          position: relative;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #1a1a1a;
        }

        .label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.12em;
          color: #999;
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        .title {
          font-family: 'DM Sans', sans-serif;
          font-size: 28px;
          font-weight: 300;
          color: #1a1a1a;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .subtitle {
          font-size: 13px;
          font-weight: 300;
          color: #888;
          line-height: 1.6;
          margin-bottom: 48px;
        }

        .divider {
          width: 24px;
          height: 1px;
          background: #d0cec6;
          margin-bottom: 48px;
        }

        .btn {
          width: 100%;
          padding: 14px 24px;
          background: #1a1a1a;
          color: #f5f4f0;
          border: none;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }

        .btn:hover {
          background: #2d2d2d;
        }

        .btn:active {
          transform: scale(0.995);
        }

        .btn:disabled {
          background: #b0ae a6;
          cursor: not-allowed;
          transform: none;
        }

        .btn.success {
          background: #2a2a2a;
        }

        .btn-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f5f4f0;
          opacity: 0.5;
        }

        .btn-dot.active {
          opacity: 1;
          animation: pulse 1.4s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .token-block {
          margin-top: 32px;
          padding: 20px;
          background: #f0efe9;
          border-left: 2px solid #1a1a1a;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .token-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          color: #999;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .token-value {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #1a1a1a;
          word-break: break-all;
          line-height: 1.7;
          font-weight: 400;
        }

        .status-denied {
          margin-top: 24px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #b08080;
          text-transform: uppercase;
          animation: fadeIn 0.3s ease;
        }

        .corner-mark {
          position: absolute;
          bottom: 20px;
          right: 24px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: #ccc;
          letter-spacing: 0.1em;
        }
      `}</style>

      <main className="page">
        <div className="card">
          <p className="label">Firebase Cloud Messaging</p>
          <h1 className="title">Push<br />Notifications</h1>
          <div className="divider" />
          <p className="subtitle">
            Solicita permiso del navegador para recibir notificaciones en tiempo real vía FCM.
          </p>

          <button
            className={`btn ${status === "success" ? "success" : ""}`}
            onClick={handleNotifications}
            disabled={status === "loading" || status === "success"}
          >
            <span className={`btn-dot ${status === "loading" ? "active" : ""}`} />
            {status === "idle" && "Activar notificaciones"}
            {status === "loading" && "Solicitando permiso..."}
            {status === "success" && "Notificaciones activas"}
            {status === "denied" && "Reintentar"}
          </button>

          {status === "denied" && (
            <p className="status-denied">Permiso denegado por el usuario</p>
          )}

          {token && (
            <div className="token-block">
              <p className="token-label">Device token</p>
              <p className="token-value">
                {token}
              </p>
            </div>
          )}

          <span className="corner-mark">Next.js · FCM</span>
        </div>
      </main>
    </>
  );
}