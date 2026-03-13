import { FiClock, FiMapPin, FiSmartphone, FiFileText, FiDollarSign, FiDownload } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Absensi Digital Berbasis Lokasi",
        description: "Karyawan bisa clock in & clock out langsung dari smartphone, dengan validasi GPS real-time. Admin langsung tahu siapa yang hadir, terlambat, atau di luar area.",
        bullets: [
            {
                title: "Validasi GPS Otomatis",
                description: "Absensi hanya bisa dilakukan dalam radius area kerja yang ditentukan.",
                icon: <FiMapPin size={26} />
            },
            {
                title: "Clock In & Clock Out Mudah",
                description: "Satu tombol untuk masuk dan pulang, langsung tercatat di sistem.",
                icon: <FiSmartphone size={26} />
            },
            {
                title: "Rekap Kehadiran Real-Time",
                description: "Data kehadiran tersinkron otomatis dan langsung bisa dipantau oleh HRD.",
                icon: <FiClock size={26} />
            }
        ],
        imageSrc: "/images/Absensi-Digital.png"
    },
    {
        title: "Slip Gaji Lengkap & Transparan",
        description: "Setiap karyawan mendapatkan slip gaji digital yang detail — mencakup gaji pokok, tunjangan, potongan BPJS, hingga pajak PPh21 sesuai regulasi terbaru.",
        bullets: [
            {
                title: "Rincian Gaji Lengkap",
                description: "Tampilkan pendapatan, tunjangan, dan potongan secara transparan.",
                icon: <FiFileText size={26} />
            },
            {
                title: "Perhitungan Pajak Otomatis",
                description: "PPh21 dihitung otomatis menggunakan tarif TER 2024 sesuai PP 58/2023.",
                icon: <FiDollarSign size={26} />
            },
            {
                title: "Download PDF Kapan Saja",
                description: "Karyawan bisa unduh slip gaji dalam format PDF langsung dari aplikasi.",
                icon: <FiDownload size={26} />
            }
        ],
        imageSrc: "/images/Slip-Lengkap.png"
    },
]