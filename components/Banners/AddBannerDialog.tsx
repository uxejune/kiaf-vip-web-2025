import React, { useState } from "react";
import Image from "next/image";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Banner } from "@/types/collections";

interface AddBannerDialogProps {
    onAdd: (banner: Banner) => void;
    nextSortOrder: number;
}

export default function AddBannerDialog({ onAdd, nextSortOrder }: AddBannerDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [url, setUrl] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null;
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dropped = e.dataTransfer.files?.[0] || null;
        if (dropped) {
            setFile(dropped);
            setPreview(URL.createObjectURL(dropped));
        }
    };

    const handleAdd = () => {
        if (!preview || !url.trim() || !file ) return;
        
        const newBanner: Banner = {
            id: crypto.randomUUID(),
            banner_type: "image",
            image_url: preview,
            link: url.trim(),
            sort_order: nextSortOrder.toString(),
            image_file: file
        };

    
        onAdd(newBanner);
        

        setFile(null);
        setPreview(null);
        setUrl("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Add Banner
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[400px]">
                <DialogHeader>
                    <DialogTitle>Add New Banner</DialogTitle>
                    <DialogDescription>
                        Drag & drop an image or select a file, then set the link URL.
                    </DialogDescription>
                </DialogHeader>
                <div
                    className="border-2 border-dashed p-4 text-center cursor-pointer"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("banner-file-input")?.click()}
                >
                    {preview ? (
                        <Image
                            src={preview}
                            width={360}
                            height={60}
                            alt="preview"
                            className="mx-auto"
                        />
                    ) : (
                        <p>Drag & Drop image here or click to select</p>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="banner-file-input"
                        onChange={handleFileChange}
                    />
                </div>
                <Input
                    placeholder="Banner link URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="mt-4"
                    required
                />
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button disabled={!preview || !url.trim()} onClick={handleAdd}>
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}