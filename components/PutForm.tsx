"use client";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HasPermission from '@/components/HasPermission';
import { useGetPostsList, useUpdateSinglePost, useDeleteSinglePost } from '@/app/Api/ProductApi';
import { Pencil, Trash2, Loader2, RotateCw, X } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Swal from 'sweetalert2';

interface Post {
  id: number;
  title: string;
}

export default function PutForm() {
  // --- States for Modern Dialog ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // 🔄 Local state taake refresh par hydration ka ya delay ka masla na aaye
  const [currentRole, setCurrentRole] = useState<string>("");

  // 🔌 Redux se role nikalna
  const userState = useSelector((state: any) => state.user);
  const reduxRole = userState?.role || "";

  // 🛡️ REFRESH PROOF CHECK: Redux aur localStorage dono ko sync karna
  useEffect(() => {
    const savedRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : "";
    // Agar Redux mein role hai toh woh use karein, nahi toh localStorage wala safe role pakrein
    const activeRole = String(reduxRole || savedRole || "").toLowerCase().trim();
    setCurrentRole(activeRole);
  }, [reduxRole]);

  // 🔌 Hooks calling from ProductApi.ts
  const { data: posts = [], isLoading, isError, refetch, isFetching } = useGetPostsList();
  const { mutate: updatePost } = useUpdateSinglePost();
  const { mutate: deletePost } = useDeleteSinglePost();

  // --- ✏️ Edit Dialog Handlers ---
  const openEditModal = (post: Post) => {
    setSelectedPost(post);
    setEditTitle(post.title);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = () => {
    if (!editTitle.trim() || !selectedPost) return;

    updatePost({ id: selectedPost.id, title: editTitle }, {
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success('Updated Successfully!', {
          description: `Post ${selectedPost.id} has been updated with a new title.`,
        });
      }
    });
  };

  // --- 🗑️ Delete Handler ---
  const handleDeleteClick = (id: number) => {
    // Agar editor kisi tarah click kar bhi le, toh function yahin block ho jaye
    if (currentRole === "editor") {
      toast.error("Not Allowed!", { description: "Editors cannot delete posts." });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete post ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'dark:bg-card dark:text-foreground dark:border dark:border-border rounded-2xl',
        title: 'dark:text-foreground',
        htmlContainer: 'dark:text-muted-foreground'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(id, {
          onSuccess: () => {
            toast.error('Deleted!', {
              description: `Post ${id} has been deleted successfully.`,
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-muted-foreground">
        <Loader2 className="animate-spin mb-2 text-indigo-600 dark:text-indigo-400" size={32} />
        <p className="text-sm font-medium">⏳ Loading Posts List...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-destructive font-bold">
        ❌ Error: Posts load nahi ho sakeen.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white dark:bg-card shadow-2xl rounded-2xl border border-gray-100 dark:border-border text-foreground relative">
      <Toaster position="top-center" richColors />

      {/* --- HEADING & REFRESH BUTTON SECTION --- */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-border pb-4 mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-foreground">
          📝 Posts List Management
        </h2>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 disabled:opacity-50 border border-indigo-200 dark:border-indigo-500/30 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
          title="Refresh Data"
        >
          <RotateCw size={14} className={`${isFetching ? 'animate-spin' : ''}`} />
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* --- LIST SECTION --- */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-4 font-medium">Koi posts bachi nahi hain.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 border border-gray-100 dark:border-border bg-gray-50 dark:bg-secondary/30 hover:bg-slate-100 dark:hover:bg-secondary/60 rounded-xl gap-4 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider">
                    Post ID: {post.id}
                  </span>
                  <p className="text-sm font-bold text-slate-800 dark:text-foreground truncate" title={post.title}>
                    {post.title}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">

                {/* 🔵 EDIT BUTTON: Sabko dikhega jiske paas ijazat hai */}
                <HasPermission userRole={currentRole as any} permission="edit_post">
                  <button
                    onClick={() => openEditModal(post)}
                    className="px-3 py-1.5 bg-white dark:bg-background border border-gray-200 dark:border-border text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-400/50 rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                </HasPermission>

                {/* 🔴 DELETE BUTTON: Editor ya buyer login hote hi yeh condition (currentRole !== "editor" aur "buyer") ise direct gayab (hide) kar degi */}
                {currentRole !== "editor" && currentRole !== "buyer" && (
                  <HasPermission userRole={currentRole as any} permission="delete_post">
                    <button
                      onClick={() => handleDeleteClick(post.id)}
                      className="px-3 py-1.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </HasPermission>
                )}

              </div>
            </div>
          ))
        )}
      </div>

      {/* --- 🖼️ MODERN MINIMALIST DIALOG --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-card rounded-2xl shadow-2xl border border-gray-100 dark:border-border overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-foreground">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-border pb-3 mb-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-foreground flex items-center gap-2">
                  ✏️ Edit Post Title
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-gray-400 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-secondary rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider block mb-1">
                    Post ID: {selectedPost?.id}
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-background border border-gray-200 dark:border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium text-foreground placeholder:text-muted-foreground"
                    placeholder="Enter new title..."
                    autoFocus
                  />
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-border">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-white dark:bg-background border border-gray-200 dark:border-border text-gray-600 dark:text-muted-foreground hover:bg-gray-50 dark:hover:bg-secondary rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateSubmit}
                    disabled={!editTitle.trim()}
                    className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}