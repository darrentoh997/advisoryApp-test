import { defineStore } from "pinia";
import { ListingApi } from "@/apis/api";

export const useLocationStore = defineStore("location", {
  state: () => {
    return { locationList: [] };
  },
  actions: {
    async fetchLocationListing() {
      this.locationList = await ListingApi.getListingData();
    },
    async addLocationListing(data) {
      const { created_at, updated_at, ...cleanData } = data;
      await ListingApi.addListingData(cleanData);
    },

    async saveLocationListing(data) {
      const { created_at, updated_at, ...cleanData } = data;
      await ListingApi.updateListingData(cleanData);
    },

    async removeLocationListing(id) {
      await ListingApi.deleteListingData(id);
    },
  },
});
