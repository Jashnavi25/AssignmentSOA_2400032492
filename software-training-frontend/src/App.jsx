import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "./api/softwareTrainingBatchApi.js";

const EMPTY_FORM = {
  courseTitle: "",
  trainerName: "",
  learnerCount: "",
  online: "true",
};

function StatCard({ label, value, icon, color, loading }) {
  return (
    <div className="col-6 col-xl-3">
      <article className="stat h-100">
        <div className={`stat-icon ${color}`}>
          <i className={`bi ${icon}`} aria-hidden="true" />
        </div>
        <div className="muted small">{label}</div>
        <div className="stat-number">{loading ? "—" : value}</div>
        <div className="tiny">Updated from backend records</div>
      </article>
    </div>
  );
}

function BatchForm({
  form,
  errors,
  editingId,
  saving,
  onFieldChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="panel" id="form-panel">
      <div className="panel-title">
        <span className="title-icon">
          <i
            className={`bi ${editingId === null ? "bi-plus-lg" : "bi-pencil-square"}`}
            aria-hidden="true"
          />
        </span>
        <div>
          <h3>
            {editingId === null ? "Add a batch" : `Edit batch #${editingId}`}
          </h3>
          <p>
            {editingId === null
              ? "Enter the training details below."
              : "Update the details and save your changes."}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="courseTitle">
            Course title <b>*</b>
          </label>
          <input
            id="courseTitle"
            className={`form-control ${errors.courseTitle ? "is-invalid" : ""}`}
            type="text"
            maxLength={100}
            value={form.courseTitle}
            placeholder="e.g. Full Stack Development"
            onChange={(event) =>
              onFieldChange("courseTitle", event.target.value)
            }
            required
            aria-describedby={
              errors.courseTitle ? "courseTitle-error" : "courseTitle-hint"
            }
          />
          {errors.courseTitle ? (
            <div className="invalid-feedback" id="courseTitle-error">
              {errors.courseTitle}
            </div>
          ) : (
            <div className="hint" id="courseTitle-hint">
              Required · Up to 100 characters
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="trainerName">
            Trainer name <b>*</b>
          </label>
          <input
            id="trainerName"
            className={`form-control ${errors.trainerName ? "is-invalid" : ""}`}
            type="text"
            maxLength={80}
            value={form.trainerName}
            placeholder="e.g. Priya Sharma"
            onChange={(event) =>
              onFieldChange("trainerName", event.target.value)
            }
            required
            aria-describedby={
              errors.trainerName ? "trainerName-error" : "trainerName-hint"
            }
          />
          {errors.trainerName ? (
            <div className="invalid-feedback" id="trainerName-error">
              {errors.trainerName}
            </div>
          ) : (
            <div className="hint" id="trainerName-hint">
              Required · Up to 80 characters
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="learnerCount">
            Number of learners <b>*</b>
          </label>
          <input
            id="learnerCount"
            className={`form-control ${errors.learnerCount ? "is-invalid" : ""}`}
            type="number"
            min={0}
            max={1000000}
            step={1}
            value={form.learnerCount}
            placeholder="e.g. 30"
            onChange={(event) =>
              onFieldChange("learnerCount", event.target.value)
            }
            required
            aria-describedby={
              errors.learnerCount ? "learnerCount-error" : "learnerCount-hint"
            }
          />
          {errors.learnerCount ? (
            <div className="invalid-feedback" id="learnerCount-error">
              {errors.learnerCount}
            </div>
          ) : (
            <div className="hint" id="learnerCount-hint">
              Required · Whole number from 0 to 1,000,000
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="online">
            Training mode <b>*</b>
          </label>
          <select
            id="online"
            className="form-select"
            value={form.online}
            onChange={(event) => onFieldChange("online", event.target.value)}
            required
          >
            <option value="true">Online</option>
            <option value="false">In-person</option>
          </select>
        </div>

        <div className="d-flex gap-2 align-items-center flex-wrap">
          <button
            className="btn btn-primary fw-semibold"
            type="submit"
            disabled={saving}
          >
            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                />
                Saving...
              </>
            ) : (
              <>
                <i
                  className={`bi ${editingId === null ? "bi-plus-lg" : "bi-check2"} me-2`}
                  aria-hidden="true"
                />
                {editingId === null ? "Add batch" : "Save changes"}
              </>
            )}
          </button>

          {editingId !== null && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
          )}

          {editingId === null && (
            <span className="hint">
              <i
                className="bi bi-shield-check text-success me-1"
                aria-hidden="true"
              />
              ID generated automatically
            </span>
          )}
        </div>
      </form>
    </section>
  );
}

function BatchTable({
  batches,
  visibleBatches,
  loading,
  error,
  search,
  mode,
  deletingId,
  onSearchChange,
  onModeChange,
  onEdit,
  onDelete,
  onClearFilters,
}) {
  return (
    <section className="panel list-panel" id="batch-list">
      <div className="list-head">
        <div className="kicker">BATCH DIRECTORY</div>
        <h3>
          All training batches <span className="pill">{batches.length}</span>
        </h3>
        <p className="muted">Browse, update, or remove training records.</p>
      </div>

      <div className="tools">
        <div className="searchbox">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            className="form-control"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search course, trainer, or ID..."
            aria-label="Search batches"
          />
        </div>

        <select
          className="form-select mode-select"
          value={mode}
          onChange={(event) => onModeChange(event.target.value)}
          aria-label="Filter by training mode"
        >
          <option value="all">All modes</option>
          <option value="online">Online</option>
          <option value="person">In-person</option>
        </select>
      </div>

      {loading ? (
        <div className="empty" role="status">
          <span className="spinner-border text-primary" aria-hidden="true" />
          <h4>Loading batches</h4>
          <p>Connecting to your training records...</p>
        </div>
      ) : batches.length === 0 && !error ? (
        <div className="empty">
          <i className="bi bi-inbox empty-icon" aria-hidden="true" />
          <h4>No batches yet</h4>
          <p>Create your first training batch using the form.</p>
          <a href="#form-panel" className="btn btn-primary btn-sm">
            Add first batch
          </a>
        </div>
      ) : visibleBatches.length === 0 ? (
        <div className="empty">
          <i className="bi bi-search empty-icon" aria-hidden="true" />
          <h4>No matching batches</h4>
          <p>Try another search term or filter.</p>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle batch-table">
            <thead>
              <tr>
                <th scope="col">BATCH / COURSE</th>
                <th scope="col">TRAINER</th>
                <th scope="col">LEARNERS</th>
                <th scope="col">MODE</th>
                <th scope="col" className="text-end">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleBatches.map((batch) => (
                <tr key={batch.id}>
                  <td>
                    <div className="course">
                      <span className="avatar">
                        {(batch.courseTitle || "B")
                          .trim()
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                      <div>
                        <strong>
                          {batch.courseTitle || "Untitled course"}
                        </strong>
                        <small>ID #{batch.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>{batch.trainerName || "—"}</td>
                  <td className="fw-bold">
                    {Number(batch.learnerCount || 0).toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`mode ${batch.online === true ? "online" : "person"}`}
                    >
                      {batch.online === true ? "Online" : "In-person"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end gap-1">
                      <button
                        className="icon-btn edit"
                        type="button"
                        aria-label={`Edit batch ${batch.id}`}
                        title="Edit batch"
                        onClick={() => onEdit(batch)}
                      >
                        <i className="bi bi-pencil-square" aria-hidden="true" />
                      </button>
                      <button
                        className="icon-btn delete"
                        type="button"
                        aria-label={`Delete batch ${batch.id}`}
                        title="Delete batch"
                        disabled={deletingId === batch.id}
                        onClick={() => onDelete(batch)}
                      >
                        {deletingId === batch.id ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          />
                        ) : (
                          <i className="bi bi-trash3" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && visibleBatches.length > 0 && (
        <div className="table-foot">
          Showing <b>{visibleBatches.length}</b> of <b>{batches.length}</b>{" "}
          batches
          <span>
            <i className="bi bi-arrow-repeat me-1" aria-hidden="true" />
            Live backend data
          </span>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [batches, setBatches] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("all");
  const [fieldErrors, setFieldErrors] = useState({});

  const loadBatches = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.all();

      if (!Array.isArray(data)) {
        throw new Error("The server returned an unexpected batch list.");
      }

      setBatches(data);
    } catch (loadError) {
      setError(
        loadError.message ||
          "Unable to load batches. Check the backend connection.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);

  const stats = useMemo(
    () => ({
      total: batches.length,
      online: batches.filter((batch) => batch.online === true).length,
      inPerson: batches.filter((batch) => batch.online === false).length,
      learners: batches.reduce(
        (total, batch) => total + (Number(batch.learnerCount) || 0),
        0,
      ),
    }),
    [batches],
  );

  const visibleBatches = useMemo(() => {
    const query = search.trim().toLowerCase();

    return batches.filter((batch) => {
      const matchesSearch =
        !query ||
        String(batch.id ?? "").includes(query) ||
        String(batch.courseTitle || "")
          .toLowerCase()
          .includes(query) ||
        String(batch.trainerName || "")
          .toLowerCase()
          .includes(query);

      const matchesMode =
        mode === "all" ||
        (mode === "online" && batch.online === true) ||
        (mode === "person" && batch.online === false);

      return matchesSearch && matchesMode;
    });
  }, [batches, search, mode]);

  function handleFieldChange(fieldName, value) {
    setForm((current) => ({ ...current, [fieldName]: value }));
    setFieldErrors((current) => ({ ...current, [fieldName]: "" }));
    setNotice("");
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFieldErrors({});
  }

  function validateForm() {
    const nextErrors = {};
    const courseTitle = form.courseTitle.trim();
    const trainerName = form.trainerName.trim();
    const learnerCount =
      form.learnerCount === "" ? NaN : Number(form.learnerCount);

    if (!courseTitle) {
      nextErrors.courseTitle = "Course title is required.";
    } else if (courseTitle.length > 100) {
      nextErrors.courseTitle = "Course title must be at most 100 characters.";
    }

    if (!trainerName) {
      nextErrors.trainerName = "Trainer name is required.";
    } else if (trainerName.length > 80) {
      nextErrors.trainerName = "Trainer name must be at most 80 characters.";
    }

    if (
      !Number.isInteger(learnerCount) ||
      learnerCount < 0 ||
      learnerCount > 1000000
    ) {
      nextErrors.learnerCount = "Enter a whole number from 0 to 1,000,000.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice("");

    if (!validateForm()) return;

    const payload = {
      courseTitle: form.courseTitle.trim(),
      trainerName: form.trainerName.trim(),
      learnerCount: Number(form.learnerCount),
      online: form.online === "true",
    };

    setSaving(true);
    setError("");

    try {
      if (editingId === null) {
        await api.add(payload);
        setNotice("Training batch added successfully.");
      } else {
        await api.update(editingId, payload);
        setNotice(`Batch #${editingId} updated successfully.`);
      }

      resetForm();
      await loadBatches();
    } catch (saveError) {
      setError(saveError.message || "Could not save the training batch.");
    } finally {
      setSaving(false);
    }
  }

  function startEditing(batch) {
    setEditingId(batch.id);
    setForm({
      courseTitle: batch.courseTitle || "",
      trainerName: batch.trainerName || "",
      learnerCount: String(batch.learnerCount ?? ""),
      online: batch.online === true ? "true" : "false",
    });
    setFieldErrors({});
    setNotice("");
    document
      .getElementById("form-panel")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleDelete(batch) {
    const confirmed = window.confirm(
      `Delete batch #${batch.id} (${batch.courseTitle})?`,
    );

    if (!confirmed) return;

    setDeletingId(batch.id);
    setError("");
    setNotice("");

    try {
      await api.del(batch.id);

      if (editingId === batch.id) {
        resetForm();
      }

      await loadBatches();
      setNotice("Batch deleted successfully.");
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete the training batch.");
    } finally {
      setDeletingId(null);
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark topbar">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#top">
            <span className="brand-icon">
              <i className="bi bi-mortarboard-fill" />
            </span>
            Batch<span className="brand-blue">Board</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavigation"
            aria-controls="mainNavigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNavigation">
            <div className="navbar-nav ms-auto">
              <a className="nav-link" href="#overview">
                Overview
              </a>
              <a className="nav-link" href="#form-panel">
                Add batch
              </a>
              <a className="nav-link" href="#batch-list">
                All batches
              </a>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="container hero-inner">
          <div>
            <div className="eyebrow">TRAINING OPERATIONS</div>
            <h1>
              Manage every batch.
              <br />
              <span>Make learning count.</span>
            </h1>
            <p>
              A clear view of courses, trainers, and learners — all in one
              place.
            </p>
            <a href="#form-panel" className="btn btn-light fw-semibold">
              <i className="bi bi-plus-lg me-2" aria-hidden="true" />
              Create a batch
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <i className="bi bi-easel2-fill" />
          </div>
        </div>
      </header>

      <main className="container content" id="overview">
        <div className="heading-row">
          <div>
            <div className="kicker">YOUR WORKSPACE</div>
            <h2>Training overview</h2>
            <p className="muted">
              A snapshot of all training batches in your system.
            </p>
          </div>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={loadBatches}
            disabled={loading}
          >
            <i className="bi bi-arrow-clockwise me-2" aria-hidden="true" />
            {loading ? "Loading..." : "Refresh data"}
          </button>
        </div>

        {error && (
          <div
            className="alert alert-danger d-flex justify-content-between align-items-center"
            role="alert"
          >
            <span>{error}</span>
            <button
              className="btn-close ms-3"
              type="button"
              onClick={() => setError("")}
              aria-label="Close"
            />
          </div>
        )}

        {notice && (
          <div
            className="alert alert-success d-flex justify-content-between align-items-center"
            role="status"
          >
            <span>{notice}</span>
            <button
              className="btn-close ms-3"
              type="button"
              onClick={() => setNotice("")}
              aria-label="Close"
            />
          </div>
        )}

        <section
          className="row g-3 stats mb-4"
          aria-label="Training statistics"
        >
          <StatCard
            label="Total batches"
            value={stats.total}
            icon="bi-collection"
            color="blue"
            loading={loading}
          />
          <StatCard
            label="Online batches"
            value={stats.online}
            icon="bi-wifi"
            color="green"
            loading={loading}
          />
          <StatCard
            label="In-person batches"
            value={stats.inPerson}
            icon="bi-building"
            color="purple"
            loading={loading}
          />
          <StatCard
            label="Total learners"
            value={stats.learners.toLocaleString()}
            icon="bi-people"
            color="orange"
            loading={loading}
          />
        </section>

        <div className="row g-4">
          <div className="col-lg-4">
            <BatchForm
              form={form}
              errors={fieldErrors}
              editingId={editingId}
              saving={saving}
              onFieldChange={handleFieldChange}
              onSubmit={handleSubmit}
              onCancel={resetForm}
            />
          </div>

          <div className="col-lg-8">
            <BatchTable
              batches={batches}
              visibleBatches={visibleBatches}
              loading={loading}
              error={error}
              search={search}
              mode={mode}
              deletingId={deletingId}
              onSearchChange={setSearch}
              onModeChange={setMode}
              onEdit={startEditing}
              onDelete={handleDelete}
              onClearFilters={() => {
                setSearch("");
                setMode("all");
              }}
            />
          </div>
        </div>

        <footer className="footer">
          <span>
            <i className="bi bi-mortarboard-fill me-2" aria-hidden="true" />
            BatchBoard · Software Training Batch Management
          </span>
          <span>Simple, organized training operations.</span>
        </footer>
      </main>
    </>
  );
}
