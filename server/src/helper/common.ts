import { Response } from "express";
import haversine from "haversine-distance";

export namespace HelperCommon {
  export const sendResponse = <T>(
    res: Response,
    status: number,
    message: string = "",
    data?: T
  ) => {
    return res.status(status).json({
      status,
      message,
      result: { ...data },
    });
  };

  /**
   * Calculate the distance between two coordinates points (latitude and longitude) by crow flies (straight line).
   * The distance is returned in kilometers (km).
   *
   * @param {number} lat1 - Latitude of the first point.
   * @param {number} lon1 - Longitude of the first point.
   * @param {number} lat2 - Latitude of the second point.
   * @param {number} lon2 - Longitude of the second point.
   * @returns {number} - The distance between the two points in kilometers.
   */
  export const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const pointA = { lat: lat1, lon: lon1 };
    const pointB = { lat: lat2, lon: lon2 };

    const distanceInMeters = haversine(pointA, pointB);
    return distanceInMeters / 1000; // Convert meters to kilometers
  };
}
