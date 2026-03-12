<script setup lang="ts">
import { computed } from "vue";
import type { DomainStatus } from "../types/domain";

const props = defineProps<{
  status: DomainStatus | string;
}>();

const label = computed(() => {
  if (props.status === "active") return "Active";
  if (props.status === "clientHold") return "Client hold";
  if (props.status === "pendingTransfer") return "Pending transfer";
  return `Unknown status (${props.status})`;
});
</script>

<template>
  <span :class="['status-badge', `status-${status}`]">
    <span class="status-dot" />
    <span class="status-text">
      {{ label }}
    </span>
  </span>
</template>

<style scoped>
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
  background-color: var(--status-active-bg);
  color: var(--status-active-fg);
}

.status-active .status-dot {
  background-color: var(--status-active-dot);
}

.status-clientHold {
  background-color: var(--status-hold-bg);
  color: var(--status-hold-fg);
}

.status-clientHold .status-dot {
  background-color: var(--status-hold-dot);
}

.status-pendingTransfer {
  background-color: var(--status-pending-bg);
  color: var(--status-pending-fg);
}

.status-pendingTransfer .status-dot {
  background-color: var(--status-pending-dot);
}
</style>

