'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'https://console.payrollkami.app/api/v1/demo/request';

type State = 'idle' | 'loading' | 'success' | 'error';

interface GetDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GetDemoModal: React.FC<GetDemoModalProps> = ({ isOpen, onClose }) => {
    const [state, setState] = useState<State>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        company_name: '',
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setState('loading');
        setErrorMsg('');

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (data.success) {
                setState('success');
            } else {
                setState('error');
                setErrorMsg(data.message ?? 'Terjadi kesalahan. Silakan coba lagi.');
            }
        } catch {
            setState('error');
            setErrorMsg('Gagal terhubung ke server. Periksa koneksi internet Anda.');
        }
    }, [form]);

    const handleClose = useCallback(() => {
        if (state === 'loading') return;
        onClose();
        setTimeout(() => {
            setState('idle');
            setErrorMsg('');
            setForm({ name: '', email: '', phone: '', company_name: '' });
        }, 300);
    }, [state, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#1B3FA0] to-[#2563eb] px-6 py-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Coba Demo Gratis</h2>
                                        <p className="text-sm text-blue-200 mt-0.5">Kredensial dikirim ke email Anda</p>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        disabled={state === 'loading'}
                                        className="text-white/70 hover:text-white transition-colors p-1 rounded-lg"
                                        aria-label="Tutup"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="px-6 py-6">
                                {state === 'success' ? (
                                    <div className="text-center py-4">
                                        <div className="text-5xl mb-4">🎉</div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                            Demo Siap!
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                            Kredensial login sudah dikirim ke <strong>{form.email}</strong>.
                                            Silakan cek inbox (dan folder spam) Anda.
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="mt-6 w-full py-3 rounded-xl bg-[#1B3FA0] text-white font-semibold text-sm hover:bg-[#163080] transition-colors"
                                        >
                                            Tutup
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Nama Lengkap
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Budi Santoso"
                                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3FA0] focus:border-transparent transition"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="budi@perusahaan.com"
                                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3FA0] focus:border-transparent transition"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Nomor HP / WhatsApp
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="08123456789"
                                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3FA0] focus:border-transparent transition"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Nama Perusahaan
                                                </label>
                                                <input
                                                    type="text"
                                                    name="company_name"
                                                    value={form.company_name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="PT Maju Bersama"
                                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3FA0] focus:border-transparent transition"
                                                />
                                            </div>
                                        </div>

                                        {state === 'error' && (
                                            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                                                {errorMsg}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={state === 'loading'}
                                            className="w-full py-3 rounded-xl bg-[#1B3FA0] text-white font-semibold text-sm hover:bg-[#163080] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                        >
                                            {state === 'loading' ? (
                                                <>
                                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Menyiapkan demo...
                                                </>
                                            ) : (
                                                '🚀 Dapatkan Demo Gratis'
                                            )}
                                        </button>

                                        <p className="text-center text-xs text-gray-400">
                                            Tidak perlu kartu kredit. Sesi berlaku 24 jam.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default GetDemoModal;
