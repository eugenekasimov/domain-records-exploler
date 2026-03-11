<script setup lang="ts">
import type { DomainRecord } from "../types/domain";

const props = defineProps<{
  domains: DomainRecord[];
  selectedDomain: DomainRecord | null;
}>();

const emit = defineEmits<{
  select: [domain: DomainRecord];
}>();

const formatDate = (value: string | null) => {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const isSelected = (domain: DomainRecord) =>
  props.selectedDomain && props.selectedDomain.domain === domain.domain;
</script>

<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Domain</th>
          <th scope="col">Registrar</th>
          <th scope="col">Status</th>
          <th scope="col">Created</th>
          <th scope="col">Expires</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="domain in domains"
          :key="domain.domain"
          :class="['row', { 'row-selected': isSelected(domain) }]"
          :tabindex="0"
          @click="emit('select', domain)"
          @focus="emit('select', domain)"
          @keydown.enter.prevent="emit('select', domain)"
          @keydown.space.prevent="emit('select', domain)"
        >
          <td class="cell cell-main">
            <span class="domain-name">{{ domain.domain }}</span>
          </td>
          <td class="cell">
            <span class="muted">{{
              domain.registrar || "Unknown registrar"
            }}</span>
          </td>
          <td class="cell">
            <span :class="['status-badge', `status-${domain.status}`]">
              <span class="status-dot" />
              <span class="status-text">
                <span v-if="domain.status === 'active'">Active</span>
                <span v-else-if="domain.status === 'clientHold'"
                  >Client hold</span
                >
                <span v-else>Pending transfer</span>
              </span>
            </span>
          </td>
          <td class="cell">
            <span class="muted">{{ formatDate(domain.created_at) }}</span>
          </td>
          <td class="cell">
            <span class="muted">{{ formatDate(domain.expires_at) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 540px;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #f9fafb;
}

th {
  text-align: left;
  padding: 0.6rem 0.75rem;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
}

tbody tr:last-child td {
  border-bottom: none;
}

.row {
  cursor: pointer;
  transition:
    background-color 0.1s ease,
    transform 0.05s ease,
    box-shadow 0.05s ease;
}

.row:nth-child(even) {
  background-color: #ffffff;
}

.row:nth-child(odd) {
  background-color: #f9fafb;
}

.row:hover {
  background-color: #e5f2ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.15);
}

.row-selected {
  background-color: #e0e7ff;
  box-shadow: inset 2px 0 0 #6362e6;
}

.cell {
  padding: 0.55rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

.cell-main {
  font-weight: 500;
  color: #111827;
}

.domain-name {
  word-break: break-all;
}

.muted {
  color: #6b7280;
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

.status-text {
  text-transform: capitalize;
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
</style>
