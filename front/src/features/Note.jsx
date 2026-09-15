import React, { useState, useEffect } from "react";
import apiClient from "../ApiClient/interceptor";

const Note = () => {
    const [notes, setNotes] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");

    const [loading, setLoading] = useState(false);

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editYoutubeUrl, setEditYoutubeUrl] = useState("");

    const [error, setError] = useState("");

    // =========================
    // GET NOTES
    // =========================

    const getNotes = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await apiClient.get("/note");

            console.log("GET NOTES:", response.data);

            setNotes(response.data.data || []);
        } catch (error) {
            console.log("GET NOTES ERROR:", error);

            setError("Failed to load notes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    // =========================
    // YOUTUBE EMBED URL
    // =========================

    const getYoutubeEmbedUrl = (url) => {
        if (!url) return null;

        try {
            const videoUrl = new URL(url);

            let videoId = "";

            if (videoUrl.hostname.includes("youtube.com")) {
                videoId = videoUrl.searchParams.get("v");
            } else if (videoUrl.hostname === "youtu.be") {
                videoId = videoUrl.pathname.substring(1);
            }

            if (!videoId) return null;

            return `https://www.youtube.com/embed/${videoId}`;
        } catch {
            return null;
        }
    };

    // =========================
    // CREATE NOTE
    // =========================

    const createNote = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Title and content are required");
            return;
        }

        if (youtubeUrl && !getYoutubeEmbedUrl(youtubeUrl)) {
            setError("Please enter a valid YouTube URL");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await apiClient.post("/note", {
                title: title.trim(),
                content: content.trim(),
                youtubeUrl: youtubeUrl.trim(),
            });

            console.log("CREATE NOTE:", response.data);

            setNotes((prev) => [
                ...prev,
                response.data.data,
            ]);

            setTitle("");
            setContent("");
            setYoutubeUrl("");
        } catch (error) {
            console.log("CREATE NOTE ERROR:", error);

            setError("Failed to create note");
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // DELETE NOTE
    // =========================

    const deleteNote = async (id) => {
        try {
            await apiClient.delete(`/note/${id}`);

            setNotes((prev) =>
                prev.filter((note) => note._id !== id)
            );
        } catch (error) {
            console.log("DELETE NOTE ERROR:", error);

            setError("Failed to delete note");
        }
    };

    // =========================
    // START EDIT
    // =========================

    const startEdit = (note) => {
        setEditId(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
        setEditYoutubeUrl(note.youtubeUrl || "");
    };

    // =========================
    // UPDATE NOTE
    // =========================

    const updateNote = async (id) => {
        if (!editTitle.trim() || !editContent.trim()) {
            alert("Title and content are required");
            return;
        }

        if (
            editYoutubeUrl &&
            !getYoutubeEmbedUrl(editYoutubeUrl)
        ) {
            setError("Please enter a valid YouTube URL");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await apiClient.put(`/${id}`, {
                title: editTitle.trim(),
                content: editContent.trim(),
                youtubeUrl: editYoutubeUrl.trim(),
            });

            console.log("UPDATE NOTE:", response.data);

            setNotes((prev) =>
                prev.map((note) =>
                    note._id === id
                        ? response.data.data
                        : note
                )
            );

            setEditId(null);
            setEditTitle("");
            setEditContent("");
            setEditYoutubeUrl("");
        } catch (error) {
            console.log("UPDATE NOTE ERROR:", error);

            setError("Failed to update note");
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // CANCEL EDIT
    // =========================

    const cancelEdit = () => {
        setEditId(null);
        setEditTitle("");
        setEditContent("");
        setEditYoutubeUrl("");
    };

    // =========================
    // JSX
    // =========================

    return (
        <div className="note">

            <h2>📝 Notes</h2>

            {/* CREATE NOTE FORM */}

            <form
                className="note-form"
                onSubmit={createNote}
            >
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    placeholder="Write your note"
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="YouTube URL"
                    value={youtubeUrl}
                    onChange={(e) =>
                        setYoutubeUrl(e.target.value)
                    }
                />

                <button type="submit">
                    Add Note
                </button>
            </form>

            {/* ERROR */}

            {error && (
                <p className="note-error">
                    {error}
                </p>
            )}

            {/* NOTES */}

            {loading ? (
                <p>Loading notes...</p>
            ) : notes.length === 0 ? (
                <p className="no-notes">
                    No notes found.
                </p>
            ) : (
                <div className="notes-list">

                    {notes.map((note) => (

                        <div
                            className="note-card"
                            key={note._id}
                        >

                            {/* EDIT MODE */}

                            {editId === note._id ? (

                                <div className="note-edit">

                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(e.target.value)
                                        }
                                    />

                                    <textarea
                                        value={editContent}
                                        onChange={(e) =>
                                            setEditContent(e.target.value)
                                        }
                                    />

                                    <input
                                        type="text"
                                        placeholder="YouTube URL"
                                        value={editYoutubeUrl}
                                        onChange={(e) =>
                                            setEditYoutubeUrl(e.target.value)
                                        }
                                    />

                                    <div className="note-actions">

                                        <button
                                            onClick={() =>
                                                updateNote(note._id)
                                            }
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={cancelEdit}
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                /* VIEW MODE */

                                <>
                                    <h3>{note.title}</h3>

                                    <p>{note.content}</p>

                                    {/* YOUTUBE */}

                                    {note.youtubeUrl &&
                                        getYoutubeEmbedUrl(
                                            note.youtubeUrl
                                        ) && (

                                            <div className="youtube-container">

                                                <iframe
                                                    src={getYoutubeEmbedUrl(
                                                        note.youtubeUrl
                                                    )}
                                                    title={note.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />

                                            </div>
                                        )}

                                    {/* ACTIONS */}

                                    <div className="note-actions">

                                        <button
                                            onClick={() =>
                                                startEdit(note)
                                            }
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteNote(note._id)
                                            }
                                        >
                                            🗑️ Delete
                                        </button>

                                    </div>

                                </>
                            )}

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
};

export default Note;