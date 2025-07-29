"use client"

import { Banner, Vip } from "@/types/collections"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { vi } from "date-fns/locale";
import { useState, useRef, useMemo, type DragEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { encrypt } from "@/lib/cryption";
import Image from "next/image";
import { GripVertical, Plus, Trash2, Upload } from "lucide-react"
import AddBannerDialog from "./AddBannerDialog";

interface Props {
    initialBanners: Banner[],
    type: "top" | "bottom"
}

export default function BannersListEditButton({ initialBanners, type }: Props) {

    const reindex = (list: Banner[]): Banner[] =>
        list.map((item, i) => ({
            ...item,
            sort_order: (i + 1).toString(),
        }));
    const [draftBanners, setDraftBanners] = useState<Banner[]>(() => reindex(initialBanners));
    const [deletingBanners, setDeletingBanners] = useState<Banner[]>([]);

    // Keep the initial ordering to detect changes
    const initialDraft = useRef<Banner[]>(reindex(initialBanners));
    // Compare current draft to initial to enable Save when different
    const hasChanges = useMemo(
        () => JSON.stringify(draftBanners) !== JSON.stringify(initialDraft.current),
        [draftBanners]
    );

    const [dragIndex, setDragIndex] = useState<number | null>(null);

    const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
        setDragIndex(index);
        try {
            e.dataTransfer.setData("text/plain", String(index)); // required for Firefox
            e.dataTransfer.effectAllowed = "move";
        } catch { }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>, overIndex: number) => {
        e.preventDefault(); // allow drop
        if (dragIndex === null || dragIndex === overIndex) return;
        setDraftBanners((prev) => {
            const next = [...prev];
            const [moved] = next.splice(dragIndex, 1);
            next.splice(overIndex, 0, moved);
            return reindex(next);
        });
        setDragIndex(overIndex);
    };

    const handleDragEnd = () => {
        setDraftBanners((prev) => reindex(prev));
        setDragIndex(null);
    };

    // handleDelete: remove a banner by id and reindex
    const handleDelete = (id: string) => {
        const bannerToDelete = draftBanners.find((b) => b.id === id);
        if (bannerToDelete) {
            setDeletingBanners((prev) => [...prev, bannerToDelete]);
            setDraftBanners((prev) => reindex(prev.filter((b) => b.id !== id)));
        }
    };

    const handleSave = async () => {
        // Iterate through each draft banner
        for (const [index, banner] of draftBanners.entries()) {
            // console.log("Saving banner", index, banner);
            const original = initialBanners.find((b) => b.id === banner.id);

            if (original) {

                if (original.sort_order != banner.sort_order) {
                    //update sort_order
                    // console.log("updating order");

                    try {
                        const formData = new FormData();
                        formData.append("id", banner.id);
                        formData.append("sort_order", banner.sort_order);

                        const res = await fetch("/api/banner_update", {
                            method: "POST",
                            body: formData,
                        });

                        if (!res.ok) {
                            console.error("Failed to update banner:", res.status);
                            return;
                        }

                        const result = await res.json();
                        // console.log("banner updated:", result);

                    } catch (err) {
                        console.error("API error:", err);
                    } finally {
                        // setIsLoading(false);
                        window.location.reload();
                    }

                } else {
                    //do nothing
                    // console.log("no update needed");
                }

            } else {
                // console.log("add new banner", banner.id);
                //add new banner

                // console.log('image_file',banner.image_file);

                if (!banner.image_file) { return };

                try {
                    const formData = new FormData();
                    formData.append("link", banner.link);
                    formData.append("banner_type", type);
                    formData.append("sort_order", banner.sort_order);
                    if (banner.image_file) {
                        formData.append("image_file", banner.image_file);
                    }

                    const res = await fetch("/api/banner_set", {
                        method: "POST",
                        body: formData,
                    });

                    if (!res.ok) {
                        console.error("Failed to add banner:", res.status);
                        return;
                    }

                    const result = await res.json();
                    console.log("banner added:", result);

                } catch (err) {
                    console.error("API error:", err);
                } finally {
                    // setIsLoading(false);
                    window.location.reload();
                }

            }

        }

        for (const [index, banner] of deletingBanners.entries()) {

            //delete banners
            // console.log("deleting banner", banner);

            try {
                const formData = new FormData();
                formData.append("id", banner.id);

                const res = await fetch("/api/banner_delete", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) {
                    console.error("Failed to delete banner:", res.status);
                    return;
                }

                const result = await res.json();
                console.log("banner deleted:", result);

            } catch (err) {
                console.error("API error:", err);
            } finally {
                // setIsLoading(false);
                window.location.reload();
            }

        };
    };

    return (
        <Sheet>
            <SheetTrigger asChild><Button variant={"outline"} size={"sm"}>Edit</Button></SheetTrigger>
            <SheetContent className="w-[860px]">
                <SheetHeader>

                    <SheetTitle>Banner Edit</SheetTitle>
                    <SheetDescription>드레그 앤 드롭으로 순서를 변경할 수 있습니다.</SheetDescription>

                </SheetHeader>
                <div className="p-4 space-y-4">


                    <div className="space-y-2" role="list">


                        {
                            draftBanners.map((draftBanner, index) => (

                                <div
                                    draggable
                                    key={draftBanner.id}
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragEnd={handleDragEnd}
                                    className={`p-2 bg-neutral-100 border border-neutral-200 cursor-move select-none ${dragIndex === index ? "opacity-60 border-dashed" : ""}`}
                                    role="listitem"
                                    aria-grabbed={dragIndex === index}
                                >
                                    <div className="flex items-center gap-2">
                                        <GripVertical size={12} />
                                        <span className="text-sm text-neutral-500">{draftBanner.sort_order}</span>
                                        <div className="w-full flex flex-col min-w-0 gap-2">
                                            <div className="relative aspect-[6/1] max-w-sm border border-neutral-100">
                                                <Image src={draftBanner.image_url} fill className="object-cover" alt="banner-image" />
                                            </div>
                                            <span className="text-sm text-neutral-500 truncate w-full">{draftBanner.link}</span>
                                        </div>


                                        <Button className="hover:cursor-pointer" size={"icon"} variant={"outline"} onClick={() => handleDelete(draftBanner.id)}><Trash2 /></Button>
                                    </div>
                                </div>


                            ))
                        }

                        <AddBannerDialog
                            nextSortOrder={draftBanners.length + 1}
                            onAdd={(newBanner) => setDraftBanners((prev) => [...prev, newBanner])}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button variant={"outline"}>Cancel</Button>
                        <Button onClick={handleSave} disabled={!hasChanges}>Save</Button>

                    </div>

                </div>

            </SheetContent>
        </Sheet>
    )
}
