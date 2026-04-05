import React, { useEffect, useState } from 'react';
import { useRouteError, useNavigate } from 'react-router';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');

                * { margin: 0; padding: 0; box-sizing: border-box; }

                .error-root {
                    min-height: 100vh;
                    background-color: #0a0a0a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Syne', sans-serif;
                    overflow: hidden;
                    position: relative;
                }

                .noise {
                    position: fixed;
                    inset: -50%;
                    width: 200%;
                    height: 200%;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
                    opacity: 0.15;
                    pointer-events: none;
                    animation: noiseAnim 0.5s steps(2) infinite;
                }

                @keyframes noiseAnim {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(-2%, -3%); }
                    50% { transform: translate(3%, 2%); }
                    75% { transform: translate(-1%, 4%); }
                    100% { transform: translate(2%, -1%); }
                }

                .grid-lines {
                    position: fixed;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,80,80,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,80,80,0.03) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                }

                .glow-orb {
                    position: fixed;
                    width: 600px;
                    height: 600px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255, 50, 50, 0.08) 0%, transparent 70%);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                }

                .container {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                    padding: 2rem;
                    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .error-code {
                    font-family: 'Space Mono', monospace;
                    font-size: clamp(7rem, 20vw, 14rem);
                    font-weight: 700;
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255,255,255,0.12);
                    line-height: 1;
                    letter-spacing: -0.04em;
                    position: relative;
                    user-select: none;
                }

                .error-code::before {
                    content: attr(data-text);
                    position: absolute;
                    inset: 0;
                    color: #ff3333;
                    -webkit-text-stroke: 0;
                    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
                    opacity: 0.9;
                }

                .error-code::after {
                    content: attr(data-text);
                    position: absolute;
                    inset: 0;
                    color: #ffffff;
                    -webkit-text-stroke: 0;
                    clip-path: polygon(0 45%, 100% 45%, 100% 100%, 0 100%);
                    opacity: 0.06;
                }

                .error-code.glitch::before {
                    animation: glitchTop 0.2s steps(1) both;
                }
                .error-code.glitch::after {
                    animation: glitchBottom 0.2s steps(1) both;
                }

                @keyframes glitchTop {
                    0%   { transform: translate(0); clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
                    33%  { transform: translate(-4px, -2px); clip-path: polygon(0 5%, 100% 0, 100% 40%, 0 50%); }
                    66%  { transform: translate(4px, 2px); clip-path: polygon(0 0, 100% 5%, 100% 45%, 0 40%); }
                    100% { transform: translate(0); clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
                }

                @keyframes glitchBottom {
                    0%   { transform: translate(0); }
                    33%  { transform: translate(4px, 2px); }
                    66%  { transform: translate(-4px, -2px); }
                    100% { transform: translate(0); }
                }

                .divider {
                    width: 80px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #ff3333, transparent);
                    margin: 1.5rem auto;
                    animation: expandWidth 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
                }

                @keyframes expandWidth {
                    from { width: 0; opacity: 0; }
                    to { width: 80px; opacity: 1; }
                }

                .headline {
                    font-size: clamp(1.2rem, 3vw, 1.6rem);
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
                }

                .sub {
                    font-family: 'Space Mono', monospace;
                    font-size: 0.78rem;
                    color: rgba(255,255,255,0.3);
                    margin-top: 0.75rem;
                    letter-spacing: 0.05em;
                    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
                }

                .error-detail {
                    font-family: 'Space Mono', monospace;
                    font-size: 0.72rem;
                    color: #ff3333;
                    background: rgba(255, 51, 51, 0.06);
                    border: 1px solid rgba(255, 51, 51, 0.15);
                    border-radius: 4px;
                    padding: 0.6rem 1.2rem;
                    margin: 1.5rem auto 0;
                    display: inline-block;
                    max-width: 400px;
                    word-break: break-all;
                    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both;
                }

                .actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 2.5rem;
                    flex-wrap: wrap;
                    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
                }

                .btn {
                    font-family: 'Space Mono', monospace;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 0.85rem 2rem;
                    border-radius: 3px;
                    cursor: pointer;
                    border: none;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    display: inline-block;
                }

                .btn-primary {
                    background: #ff3333;
                    color: #ffffff;
                }
                .btn-primary:hover {
                    background: #ff5555;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(255, 51, 51, 0.35);
                }
                .btn-primary:active { transform: translateY(0); }

                .btn-ghost {
                    background: transparent;
                    color: rgba(255,255,255,0.5);
                    border: 1px solid rgba(255,255,255,0.12);
                }
                .btn-ghost:hover {
                    color: #ffffff;
                    border-color: rgba(255,255,255,0.4);
                    transform: translateY(-2px);
                }

                .scan-line {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(255,51,51,0.4), transparent);
                    animation: scan 4s linear infinite;
                    pointer-events: none;
                }

                @keyframes scan {
                    from { top: -2px; }
                    to { top: 100vh; }
                }
            `}</style>

            <div className="error-root">
                <div className="noise" />
                <div className="grid-lines" />
                <div className="glow-orb" />
                <div className="scan-line" />

                <div className="container">
                    <div
                        className={`error-code${glitch ? ' glitch' : ''}`}
                        data-text={error?.status || '404'}
                    >
                        {error?.status || '404'}
                    </div>

                    <div className="divider" />

                    <h1 className="headline">
                        {error?.statusText || 'Page Not Found'}
                    </h1>
                    <p className="sub">
                        {error?.status
                            ? `Error ${error.status} · Something went wrong`
                            : 'The page you requested doesn\'t exist or has been moved'}
                    </p>

                    {error?.data && (
                        <div className="error-detail">{error.data}</div>
                    )}

                    <div className="actions">
                        <button className="btn btn-primary" onClick={() => navigate('/')}>
                            ← Go Home
                        </button>
                        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;