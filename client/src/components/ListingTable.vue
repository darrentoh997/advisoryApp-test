<template>
  <div>
    <table class="w-full table-auto border border-gray-200 text-left text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Latitude</th>
          <th class="px-4 py-2">Longitude</th>
          <th class="px-4 py-2">Assigned User</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(listing, index) in listings" :key="listing.id">
          <td class="border-t px-4 py-2">{{ listing.id }}</td>

          <td class="border-t px-4 py-2">
            <Input v-if="editing === listing.id" v-model="editedListing.name" id="edit-name" placeholder="Name" />
            <span v-else>{{ listing.name }}</span>
          </td>

          <td class="border-t px-4 py-2">
            <Input v-if="editing === listing.id" v-model="editedListing.latitude" id="edit-lat" type="number"
              placeholder="Latitude" />
            <span v-else>{{ listing.latitude }}</span>
          </td>

          <td class="border-t px-4 py-2">
            <Input v-if="editing === listing.id" v-model="editedListing.longitude" id="edit-lon" type="number"
              placeholder="Longitude" />
            <span v-else>{{ listing.longitude }}</span>
          </td>

          <td class="border-t px-4 py-2">
            <Dropdown v-if="editing === listing.id" v-model="editedListing.user_id" :options="userOptions"
              id="edit-user" />
            <span v-else>{{userOptions.find((option) => { return option.value == listing.user_id })?.label}}</span>
          </td>

          <td class="border-t px-4 py-2 space-x-2">
            <button v-if="editing !== listing.id" @click="editListing(listing)" class="text-indigo-600">Edit</button>
            <button v-else @click="saveListing()" class="text-green-600">Save</button>
            <button @click="removeListing(listing.id)" class="text-red-600">Delete</button>
          </td>
        </tr>

        <tr v-if="listings.length === 0">
          <td colspan="6" class="text-center py-4">Empty</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Input from '@/components/Input.vue';
import Dropdown from '@/components/Dropdown.vue';

// Props
const props = defineProps({
  listings: Array,
  canEdit: Boolean,
  userOptions: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['update:listings']);

const editing = ref(null);
const editedListing = ref({});

function editListing(listing) {
  editing.value = listing.id;
  editedListing.value = { ...listing };
}

function saveListing() {
  emit('update:listings', { type: "save", data: editedListing.value });
  editing.value = null;
}

function removeListing(id) {
  emit('update:listings', { type: "remove", id });
}
</script>
