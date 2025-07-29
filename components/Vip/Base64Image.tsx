'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Base64ImageProps {
    base64String: string;
    width?: number;
    height?: number;
    alt?: string;
    /**
     * If true, composits the image onto a white background and outputs a data URL (JPEG)
     * so that the background is baked in (no transparency).
     */
    bakeWhiteBackground?: boolean;
}

const Base64Image: React.FC<Base64ImageProps> = ({
    base64String,
    width = 300,
    height = 300,
    alt = 'Base64 Image',
    bakeWhiteBackground = true,
}) => {
    const [dataUrl, setDataUrl] = useState<string>(() => `data:image/png;base64,${base64String}`);

    useEffect(() => {
        // If we don't want to bake, just render the original
        if (!bakeWhiteBackground) {
            setDataUrl(`data:image/png;base64,${base64String}`);
            return;
        }

        let cancelled = false;
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            try {
                const w = img.naturalWidth || width;
                const h = img.naturalHeight || height;
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // Fill white background first, then draw the original image on top
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, w, h);
                ctx.drawImage(img, 0, 0, w, h);

                // Export as JPEG to guarantee no alpha channel (white baked in)
                const out = canvas.toDataURL('image/jpeg', 0.92);
                if (!cancelled) setDataUrl(out);
            } catch (_) {
                if (!cancelled) setDataUrl(`data:image/png;base64,${base64String}`);
            }
        };
        img.onerror = () => {
            if (!cancelled) setDataUrl(`data:image/png;base64,${base64String}`);
        };
        img.src = `data:image/png;base64,${base64String}`;

        return () => { cancelled = true; };
    }, [base64String, bakeWhiteBackground, width, height]);

    return (
        <Image
            src={dataUrl}
            alt={alt}
            width={width}
            height={height}
        />
    );
};

export default Base64Image;