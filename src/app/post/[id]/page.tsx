"use client"

import { fetchPostById } from "@/utils/fetchPostById";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Post() {
    const { id }: { id: string } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['posts', id],
        queryFn: fetchPostById
    })

    if (isLoading)
        return <span className="loading loading-bars loading-lg"></span>;

    return (
        <div className="w-full flex justify-center">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{data?.title}</h2>
                    <p>{data?.body}</p>
                </div>
            </div>
        </div>
    );
}