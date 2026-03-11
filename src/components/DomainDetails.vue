<script setup lang="ts">
import type { DomainRecord } from '../types/domain'

const props = defineProps<{
  domain: DomainRecord | null
}>()

const emit = defineEmits<{
  close: []
}>()

const formatDateTime = (value: string | null) => {
  if (!value) return 'Unknown'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Unknown'
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div v-if="!domain" class="details-empty">
    <p class="details-empty-title">No domain selected</p>
    <p class="details-empty-text">Select a row to inspect full domain details.</p>
  </div>
  <div v-else class="details">
    <header class="details-header">
      <div class="details-header-main">
        <p class="details-label">Domain</p>
        <p class="details-domain">{{ domain.domain }}</p>
      </div>
      <button type="button" class="details-close" @click="emit('close')">
        Clear
      </button>
    </header>

    <section class="details-section">
      <h3 class="details-section-title">Overview</h3>
      <dl class="details-grid">
        <div class="details-field">
          <dt>Registrar</dt>
          <dd>{{ domain.registrar || 'Unknown registrar' }}</dd>
        </div>
        <div class="details-field">
          <dt>Status</dt>
          <dd>
            <span :class="['status-badge', `status-${domain.status}`]">
              <span class="status-dot" />
              <span v-if="domain.status === 'active'">Active</span>
              <span v-else-if="domain.status === 'clientHold'">Client hold</span>
              <span v-else>Pending transfer</span>
            </span>
          </dd>
        </div>
        <div class="details-field">
          <dt>Created at</dt>
          <dd>{{ formatDateTime(domain.created_at) }}</dd>
        </div>
        <div class="details-field">
          <dt>Expires at</dt>
          <dd>{{ formatDateTime(domain.expires_at) }}</dd>
        </div>
        <div class="details-field">
          <dt>Last updated</dt>
          <dd>{{ formatDateTime(domain.updated_at) }}</dd>
        </div>
      </dl>
    </section>

    <section class="details-section">
      <h3 class="details-section-title">Nameservers</h3>
      <p v-if="!domain.nameservers || domain.nameservers.length === 0" class="details-empty-text">
        No nameservers configured or data unavailable.
      </p>
      <ul v-else class="nameservers">
        <li v-for="ns in domain.nameservers" :key="ns" class="nameservers-item">
          {{ ns }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.details-empty {
  padding: 1.2rem 0.25rem 0.3rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.details-empty-title {
  margin: 0 0 0.25rem;
  font-weight: 500;
}

.details-empty-text {
  margin: 0;
  font-size: 0.85rem;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.details-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.25rem;
}

.details-header-main {
  min-width: 0;
}

.details-label {
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7280;
}

.details-domain {
  margin: 0.15rem 0 0;
  font-weight: 600;
  word-break: break-all;
}

.details-close {
  border-radius: 999px;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0.8rem;
  font-size: 0.8rem;
  font-family: inherit;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.details-close:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.details-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 0.7rem;
}

.details-section-title {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem 0.8rem;
  margin: 0;
}

.details-field dt {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 0.15rem;
}

.details-field dd {
  margin: 0;
  font-size: 0.9rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 999px;
  padding: 0.1rem 0.6rem 0.15rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
}

.status-active {
  background-color: #ecfdf3;
  color: #166534;
}

.status-active .status-dot {
  background-color: #16a34a;
}

.status-clientHold {
  background-color: #fffbeb;
  color: #92400e;
}

.status-clientHold .status-dot {
  background-color: #eab308;
}

.status-pendingTransfer {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.status-pendingTransfer .status-dot {
  background-color: #3b82f6;
}

.nameservers {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.nameservers-item {
  font-size: 0.9rem;
  padding: 0.25rem 0.4rem;
  border-radius: 0.4rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  word-break: break-all;
}

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>

