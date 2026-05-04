import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router';
import { BadgeCheck, MessageSquareText, Send, Star, TimerReset, X } from 'lucide-react';
import { getStoredAuthUser } from '../services/auth';
import { submitBookingReview } from '../services/booking';
import type { SessionCompletedData } from '../context/CallContext';

function formatDuration(secs: number): string {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function getStarFillClass(star: number, rating: number) {
    return star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 fill-slate-300';
}

export function SessionReview() {
    const { bookingId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { sessionResult } = (location.state as { sessionResult?: SessionCompletedData }) || {};

    const currentUser = getStoredAuthUser();
    const isStudent = currentUser?.profession === 'student';

    const [reviewRating, setReviewRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [reviewError, setReviewError] = useState<string | null>(null);

    // If there is no session result or they are not a student, redirect to dashboard.
    // They must have just arrived from a session end.
    if (!sessionResult || !isStudent || sessionResult.bookingId !== bookingId) {
        return <Navigate to="/student-dashboard" replace />;
    }

    const handleSubmitReview = async () => {
        if (!sessionResult?.bookingId || !isStudent || reviewSubmitting) {
            return;
        }

        setReviewSubmitting(true);
        setReviewError(null);

        try {
            await submitBookingReview(sessionResult.bookingId, {
                rating: reviewRating,
                text: reviewText,
            });
            setReviewSubmitted(true);
            setTimeout(() => {
                navigate('/student-dashboard');
            }, 3000);
        } catch (error) {
            setReviewError(error instanceof Error ? error.message : 'Failed to submit review.');
            setReviewSubmitting(false);
        }
    };

    const handleSkip = () => {
        navigate('/student-dashboard');
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
                <div style={{ padding: 28, background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
                        <div>
                            <div style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
                                Rate this session
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
                                Share your experience so others can discover great teaching.
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                disabled={reviewSubmitted || reviewSubmitting}
                                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    width: 52,
                                    height: 52,
                                    borderRadius: 14,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: reviewSubmitted || reviewSubmitting ? 'default' : 'pointer',
                                    transition: 'transform 0.15s ease, background 0.2s ease, border-color 0.2s ease',
                                    color: star <= reviewRating ? '#fbbf24' : 'rgba(255,255,255,0.28)',
                                }}
                            >
                                <Star size={26} className={getStarFillClass(star, reviewRating)} />
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={reviewText}
                        onChange={(event) => setReviewText(event.target.value)}
                        maxLength={1000}
                        disabled={reviewSubmitted || reviewSubmitting}
                        placeholder={'Write a short review about the tutor and the session…'}
                        style={{
                            width: '100%',
                            minHeight: 140,
                            resize: 'vertical',
                            borderRadius: 18,
                            border: '1px solid rgba(255,255,255,0.10)',
                            background: 'rgba(0,0,0,0.24)',
                            color: 'white',
                            padding: '16px 18px',
                            fontSize: 14,
                            fontFamily: 'Inter, sans-serif',
                            outline: 'none',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                        }}
                    />

                    {reviewError && (
                        <div style={{
                            marginTop: 12,
                            padding: '8px 12px',
                            borderRadius: 8,
                            background: 'rgba(239,68,68,0.15)',
                            border: '1px solid rgba(239,68,68,0.3)',
                            color: '#fca5a5',
                            fontSize: 13,
                        }}>
                            {reviewError}
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 24 }}>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                            {reviewSubmitted
                                ? 'Redirecting to dashboard...'
                                : 'Tap a star, write feedback, then submit.'}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            {!reviewSubmitted && (
                                <button
                                    type="button"
                                    onClick={() => { void handleSubmitReview(); }}
                                    disabled={reviewSubmitting}
                                    style={{
                                        background: reviewSubmitting
                                            ? 'rgba(255,255,255,0.10)'
                                            : 'linear-gradient(135deg,#7ab8ba,#5a9fa1)',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.10)',
                                        borderRadius: 14,
                                        padding: '12px 20px',
                                        fontSize: 14,
                                        fontWeight: 700,
                                        cursor: reviewSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: reviewSubmitting ? 0.75 : 1,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                    }}
                                >
                                    <Send size={16} />
                                    {reviewSubmitting ? 'Submitting…' : 'Submit review'}
                                </button>
                            )}

                            {!reviewSubmitted && (
                                <button
                                    onClick={handleSkip}
                                    style={{
                                        background: 'rgba(255,255,255,0.08)',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        borderRadius: 14,
                                        padding: '12px 20px',
                                        fontSize: 14,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontFamily: 'Inter, sans-serif',
                                    }}
                                >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                        <X size={16} />
                                        Skip
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
