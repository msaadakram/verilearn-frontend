import React from 'react';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router';
import { BadgeCheck, Coins, TimerReset, X } from 'lucide-react';
import { getStoredAuthUser } from '../services/auth';
import type { SessionCompletedData } from '../context/CallContext';

const summaryCardStyle: React.CSSProperties = {
    padding: 16,
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
};

const summaryLabelStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontFamily: 'Inter, sans-serif',
};

const summaryValueStyle: React.CSSProperties = {
    fontSize: 24,
    fontWeight: 800,
    fontFamily: 'Inter, sans-serif',
};

export function SessionEarning() {
    const { bookingId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { sessionResult } = (location.state as { sessionResult?: SessionCompletedData }) || {};

    const currentUser = getStoredAuthUser();
    const isTeacher = currentUser?.profession === 'teacher';

    if (!sessionResult || !isTeacher || sessionResult.bookingId !== bookingId) {
        return <Navigate to="/teacher-dashboard" replace />;
    }

    const handleClose = () => {
        navigate('/teacher-dashboard');
    };

    return (
        <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-4">
            <style>{`
                @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
            `}</style>

            <div style={{
                width: '100%', maxWidth: 500,
                borderRadius: 28,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
                animation: 'fadeIn 0.3s ease',
            }}>
                <div style={{
                    padding: 32,
                    background: 'linear-gradient(180deg, rgba(122,184,186,0.18), rgba(255,255,255,0.02))',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                        <div style={{
                            width: 52, height: 52, borderRadius: 16,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(34,197,94,0.16)', color: '#86efac',
                        }}>
                            <BadgeCheck size={28} />
                        </div>
                        <div>
                            <h3 style={{ color: 'white', fontSize: 26, fontWeight: 700, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                                Session complete
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 14, margin: '4px 0 0', fontFamily: 'Inter, sans-serif' }}>
                                Credits updated automatically after the call ended.
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: 16,
                        marginBottom: 24,
                    }}>
                        <div style={{ ...summaryCardStyle, background: 'linear-gradient(180deg, rgba(16,185,129,0.16), rgba(16,185,129,0.08))' }}>
                            <div style={summaryLabelStyle}>Credits earned</div>
                            <div style={{ ...summaryValueStyle, color: '#34d399', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <BadgeCheck size={24} />
                                {sessionResult.creditsUsed}
                            </div>
                        </div>
                        <div style={{ ...summaryCardStyle, background: 'linear-gradient(180deg, rgba(122,184,186,0.16), rgba(122,184,186,0.08))' }}>
                            <div style={summaryLabelStyle}>Duration</div>
                            <div style={{ ...summaryValueStyle, color: '#7ab8ba', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <TimerReset size={24} />
                                {sessionResult.actualDurationMinutes}m
                            </div>
                        </div>
                    </div>

                    <div style={{
                        borderRadius: 18,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: 20,
                        marginBottom: 28,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <TimerReset size={20} color="#cbd5e1" />
                            <div style={{ color: 'white', fontSize: 15, fontWeight: 600 }}>What happened in this call</div>
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: 14, lineHeight: 1.6 }}>
                            <div style={{ marginBottom: 6 }}>• The student was charged {sessionResult.creditsUsed} credits.</div>
                            <div style={{ marginBottom: 6 }}>• Earnings have been added to your profile balance.</div>
                            <div>• Your total credits are now: <strong style={{ color: '#fff' }}>{sessionResult.teacherCreditsTotal}</strong>.</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={handleClose}
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 14,
                                padding: '12px 24px',
                                fontSize: 15,
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontFamily: 'Inter, sans-serif',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <X size={18} />
                            Complete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
