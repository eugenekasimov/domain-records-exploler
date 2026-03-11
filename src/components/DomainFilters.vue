<script setup lang="ts">
import { computed } from 'vue'
import type { DomainStatus } from '../types/domain'

const props = withDefaults(
  defineProps<{
    domain?: string
    registrar?: string
    status?: DomainStatus | ''
  }>(),
  {
    domain: '',
    registrar: '',
    status: '',
  }
)

const emit = defineEmits<{
  'update:domain': [value: string]
  'update:registrar': [value: string]
  'update:status': [value: DomainStatus | '']
}>()

const domainModel = computed({
  get: () => props.domain,
  set: (value: string) => emit('update:domain', value),
})

const registrarModel = computed({
  get: () => props.registrar,
  set: (value: string) => emit('update:registrar', value),
})

const onStatusChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value as DomainStatus | ''
  emit('update:status', value)
}
</script>

<template>
  <form class="filters" @submit.prevent>
    <label class="field">
      <span class="field-label">Domain</span>
      <input
        v-model="domainModel"
        type="search"
        class="input"
        name="domain"
        placeholder="Search by domain name"
        autocomplete="off"
      />
    </label>

    <label class="field">
      <span class="field-label">Registrar</span>
      <input
        v-model="registrarModel"
        type="search"
        class="input"
        name="registrar"
        placeholder="Filter by registrar"
        autocomplete="off"
      />
    </label>

    <label class="field">
      <span class="field-label">Status</span>
      <select
        :value="status ?? ''"
        name="status"
        class="input select"
        @change="onStatusChange"
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="clientHold">Client hold</option>
        <option value="pendingTransfer">Pending transfer</option>
      </select>
    </label>
  </form>
</template>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-label {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9ca3af;
}

.input {
  appearance: none;
  border-radius: 0.6rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #111827;
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.input::placeholder {
  color: #9ca3af;
}

.input:focus-visible {
  border-color: #6362e6;
  box-shadow: 0 0 0 1px #6362e6;
  background-color: #ffffff;
}

.select {
  padding-right: 2rem;
}
</style>

