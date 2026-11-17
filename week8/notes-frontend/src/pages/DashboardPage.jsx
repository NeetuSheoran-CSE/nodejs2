import React, { useState, useEffect, useMemo } from 'react';
import {
  Sidebar,
} from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { StatsOverview } from '../components/StatsOverview';
import { NoteCard } from '../components/NoteCard';
import { NoteEditorModal } from '../components/NoteEditorModal';
import { NoteDetailModal } from '../components/NoteDetailModal';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import { EmptyState } from '../components/EmptyState';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { SettingsModal } from '../components/SettingsModal';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  restoreNote,
  permanentDeleteNote,
  toggleFavorite,
} from '../services/api';
import { useToast } from '../context/ToastContext';
import {
  Filter,
  ArrowUpDown,
  Plus,
  Trash2,
  Sparkles,
  Layers,
} from 'lucide-react';

const CATEGORIES = ['All', 'Work', 'Personal', 'Ideas', 'Study', 'Tasks'];

export const DashboardPage = () => {
  const { showToast } = useToast();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Navigation states
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'title'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);
  const [deletingNote, setDeletingNote] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load Notes
  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error(err);
      showToast('Could not load notes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    let result = [...notes];

    // Filter by tab
    if (currentTab === 'trash') {
      result = result.filter((n) => n.isTrash);
    } else {
      // Exclude trashed notes in regular tabs
      result = result.filter((n) => !n.isTrash);

      if (currentTab === 'favorites') {
        result = result.filter((n) => n.isFavorite);
      }
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(
        (n) => (n.category || 'General').toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (n) =>
          (n.title && n.title.toLowerCase().includes(q)) ||
          (n.content && n.content.toLowerCase().includes(q)) ||
          (n.category && n.category.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });

    return result;
  }, [notes, currentTab, selectedCategory, searchQuery, sortBy]);

  // Counts for sidebar badges
  const activeNotesCount = notes.filter((n) => !n.isTrash).length;
  const favoritesCount = notes.filter((n) => !n.isTrash && n.isFavorite).length;
  const trashCount = notes.filter((n) => n.isTrash).length;

  // CRUD Handlers
  const handleSaveNote = async (noteData) => {
    if (editingNote) {
      // Update
      const updated = await updateNote(editingNote._id, noteData);
      setNotes((prev) => prev.map((n) => (n._id === editingNote._id ? updated : n)));
      showToast('Note updated successfully!', 'success');
      setEditingNote(null);
    } else {
      // Create
      const created = await createNote(noteData);
      setNotes((prev) => [created, ...prev]);
      showToast('Note created successfully!', 'success');
    }
  };

  const handleOpenEdit = (note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleDeletePrompt = (note) => {
    setDeletingNote(note);
  };

  const handleConfirmDelete = async () => {
    if (!deletingNote) return;

    if (deletingNote.isTrash) {
      // Permanent delete
      await permanentDeleteNote(deletingNote._id);
      setNotes((prev) => prev.filter((n) => n._id !== deletingNote._id));
      showToast('Note permanently deleted.', 'info');
    } else {
      // Soft delete / Move to trash
      await deleteNote(deletingNote._id);
      setNotes((prev) =>
        prev.map((n) => (n._id === deletingNote._id ? { ...n, isTrash: true } : n))
      );
      showToast('Note moved to Trash.', 'info');
    }
    setDeletingNote(null);
  };

  const handleRestore = async (id) => {
    await restoreNote(id);
    setNotes((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isTrash: false } : n))
    );
    showToast('Note restored from Trash!', 'success');
  };

  const handleToggleFavorite = async (id) => {
    const updated = await toggleFavorite(id);
    if (updated) {
      setNotes((prev) => prev.map((n) => (n._id === id ? updated : n)));
      showToast(
        updated.isFavorite ? 'Added to favorites ⭐' : 'Removed from favorites',
        'info',
        2000
      );
    }
  };

  const handleEmptyTrash = async () => {
    const trashed = notes.filter((n) => n.isTrash);
    for (const n of trashed) {
      await permanentDeleteNote(n._id);
    }
    setNotes((prev) => prev.filter((n) => !n.isTrash));
    showToast('Trash emptied successfully.', 'info');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenCreateModal={() => {
          setEditingNote(null);
          setIsEditorOpen(true);
        }}
        notesCount={activeNotesCount}
        favoritesCount={favoritesCount}
        trashCount={trashCount}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
        className="main-layout"
      >
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onOpenCreateModal={() => {
            setEditingNote(null);
            setIsEditorOpen(true);
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main style={{ padding: '28px 32px', flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {/* Dashboard Stats Overview (Shown in Dashboard tab) */}
          {currentTab === 'dashboard' && <StatsOverview notes={notes} />}

          {/* Section Header & Filters Bar */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  {currentTab === 'dashboard' && 'Dashboard Overview'}
                  {currentTab === 'all' && 'All Saved Notes'}
                  {currentTab === 'favorites' && 'Starred Favorites'}
                  {currentTab === 'trash' && 'Trash Bin'}
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      padding: '2px 10px',
                      borderRadius: '999px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
                  </span>
                </h1>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {currentTab === 'dashboard' && 'Your centralized workspace and productivity summary'}
                  {currentTab === 'all' && 'Review, search, and manage all your thoughts in one place'}
                  {currentTab === 'favorites' && 'Your most important and pinned notes'}
                  {currentTab === 'trash' && 'Notes stored in trash can be restored or deleted forever'}
                </p>
              </div>

              {/* Right utility actions (Sort & Empty Trash if on Trash tab) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {currentTab === 'trash' && trashCount > 0 && (
                  <button
                    onClick={handleEmptyTrash}
                    className="btn-danger"
                    style={{ padding: '7px 14px', fontSize: '0.84rem' }}
                  >
                    <Trash2 size={15} />
                    <span>Empty Trash</span>
                  </button>
                )}

                {/* Sort selector */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '6px 12px',
                  }}
                >
                  <ArrowUpDown size={14} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="newest">Recently Updated</option>
                    <option value="oldest">Date Created</option>
                    <option value="title">Alphabetical (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Filter Pills (hidden in Trash) */}
            {currentTab !== 'trash' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  overflowX: 'auto',
                  paddingBottom: '4px',
                }}
              >
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        fontSize: '0.82rem',
                        fontWeight: isSelected ? 700 : 500,
                        backgroundColor: isSelected ? 'var(--primary)' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                        border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border)',
                        boxShadow: isSelected ? 'var(--shadow-purple)' : 'none',
                        transition: 'var(--transition)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notes Grid / List or Empty State */}
          {loading ? (
            <LoadingSkeleton viewMode={viewMode} count={viewMode === 'grid' ? 6 : 4} />
          ) : filteredNotes.length === 0 ? (
            <EmptyState
              tab={currentTab}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              onOpenCreateModal={() => {
                setEditingNote(null);
                setIsEditorOpen(true);
              }}
            />
          ) : viewMode === 'list' ? (
            <div>
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  viewMode="list"
                  onSelect={(n) => setViewingNote(n)}
                  onEdit={handleOpenEdit}
                  onDelete={handleDeletePrompt}
                  onToggleFavorite={handleToggleFavorite}
                  onRestore={handleRestore}
                  onPermanentDelete={(id) => {
                    const target = notes.find((n) => n._id === id);
                    if (target) handleDeletePrompt(target);
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: '20px',
              }}
            >
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  viewMode="grid"
                  onSelect={(n) => setViewingNote(n)}
                  onEdit={handleOpenEdit}
                  onDelete={handleDeletePrompt}
                  onToggleFavorite={handleToggleFavorite}
                  onRestore={handleRestore}
                  onPermanentDelete={(id) => {
                    const target = notes.find((n) => n._id === id);
                    if (target) handleDeletePrompt(target);
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Note Editor Modal (Create / Edit) */}
      <NoteEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />

      {/* Note Detail Reader Modal */}
      <NoteDetailModal
        note={viewingNote}
        isOpen={!!viewingNote}
        onClose={() => setViewingNote(null)}
        onEdit={(n) => {
          setViewingNote(null);
          handleOpenEdit(n);
        }}
        onDelete={(n) => {
          setViewingNote(null);
          handleDeletePrompt(n);
        }}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!deletingNote}
        onClose={() => setDeletingNote(null)}
        onConfirm={handleConfirmDelete}
        noteTitle={deletingNote?.title}
        isPermanent={deletingNote?.isTrash}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        notes={notes}
      />
    </div>
  );
};
