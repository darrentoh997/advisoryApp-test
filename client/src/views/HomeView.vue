<template>
  <div class="flex justify-center px-4 py-10">
    <div class="w-full max-w-7xl">
      <h2 class="text-2xl font-bold mb-6 text-center">Location Listing</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <Input label="Listing Name" v-model="name" id="listing-name" />
        <Input label="Latitude" v-model="latitude" id="lat" type="number" />
        <Input label="Longitude" v-model="longitude" id="lon" type="number" />
        <Dropdown label="Assign to User" v-model="selectedUser" :options="userOptions" id="user-select" />
        <div class="mb-4 flex items-end">
          <Button @click="addListing">Add</Button>
        </div>
      </div>
      <ListingTable :listings="locationStore.locationList" :userOptions="userOptions"
        @update:listings="updateListings" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import Input from '../components/Input.vue'
import Dropdown from '../components/Dropdown.vue'
import Button from '../components/Button.vue'
import ListingTable from '../components/ListingTable.vue'
const name = ref('')
const latitude = ref('')
const longitude = ref('')
const selectedUser = ref('')
const listings = ref([])
const userOptions = ref([])

import { useLocationStore } from "@/stores/location";
import { useAuthStore } from "@/stores/auth";

const locationStore = useLocationStore();
const authStore = useAuthStore()

onMounted(async () => {
  locationStore.fetchLocationListing()
    .catch((e) => { console.log(e) })
  authStore.fetchUsersData()
    .catch((e) => { console.log(e) })
    .then(() => { userOptions.value = authStore.userListDropdown })
})

async function updateListings(updatedListings) {
  console.log(updatedListings)
  if (updatedListings.type == "save") {
    const data = updatedListings.data
    await locationStore.saveLocationListing({ ...data })
  } else if (updatedListings.type == "remove") {
    await locationStore.removeLocationListing(updatedListings.id)
  }

  locationStore.fetchLocationListing()
    .catch((e) => { console.log(e) })
}

async function addListing() {
  if (!name.value || !latitude.value || !longitude.value) {
    alert('Please fill in all fields')
    return
  }

  const data = {
    name: name.value,
    latitude: parseFloat(latitude.value),
    longitude: parseFloat(longitude.value),
    user_id: selectedUser.value,
  }

  await locationStore.addLocationListing({ ...data })
  locationStore.fetchLocationListing()
  // Reset form
  name.value = ''
  latitude.value = ''
  longitude.value = ''
  selectedUser.value = ''
}
</script>
