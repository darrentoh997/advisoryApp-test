import { Request, Response } from "express";
import {
  deleteListingById,
  getAllListings,
  updateListingById,
  addListingData,
  getAllUserListings,
} from "../models/listing";
import { HelperCommon } from "../helper/common";

export const getUserListing = async (req: Request, res: Response) => {
  const { latitude, longitude } = req.query;
  const user = (req as Request & { user?: any }).user;
  if (!latitude || !longitude) {
    return HelperCommon.sendResponse(
      res,
      400,
      "Latitude and longitude are required"
    );
  }

  const userLatitude = parseFloat(latitude as string);
  const userLongitude = parseFloat(longitude as string);

  try {
    const listings = await getAllUserListings(user.user_id);

    const filteredListings = listings.map(
      ({ latitude, longitude, ...rest }) => ({
        ...rest,
        distance: HelperCommon.calculateDistance(
          userLatitude,
          userLongitude,
          latitude,
          longitude
        ).toFixed(2),
      })
    );

    return HelperCommon.sendResponse(res, 200, "Success", {
      current_page: 1,
      data: filteredListings,
    });
  } catch (err) {
    console.error(err);
    return HelperCommon.sendResponse(res, 500, "Failed to fetch listings");
  }
};

export const getAllListing = async (req: Request, res: Response) => {
  try {
    const listings = await getAllListings();

    return HelperCommon.sendResponse(res, 200, "Success", {
      current_page: 1,
      data: listings,
    });
  } catch (err) {
    console.error(err);
    return HelperCommon.sendResponse(res, 500, "Failed to fetch listings");
  }
};

export const addListing = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const result = await addListingData(body);

    return HelperCommon.sendResponse(res, 200, "Success", {
      data: result,
    });
  } catch (err) {
    console.error(err);
    return HelperCommon.sendResponse(res, 500, "Failed to add listing");
  }
};

export const updateListing = async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.id) {
    return HelperCommon.sendResponse(res, 400, "Id is required for update");
  }

  try {
    const result = await updateListingById(body.id, body);

    return HelperCommon.sendResponse(res, 200, "Success", {
      data: result,
    });
  } catch (err) {
    console.error(err);
    return HelperCommon.sendResponse(res, 500, "Failed to update listing");
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const listingId = parseInt(req.params.id);
    await deleteListingById(listingId);
    return HelperCommon.sendResponse(res, 200, "Listing deleted successfully");
  } catch (error) {
    console.error("Error deleting listing:", error);
    return HelperCommon.sendResponse(res, 500, "Internal server error");
  }
};
