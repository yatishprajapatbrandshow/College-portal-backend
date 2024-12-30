const mongoose = require("mongoose");
// Import all models from models/index.js
const models = require("../models");

const search = async (req, res) => {
  try {
    const { search, table, page = 1, limit = 50, sort = "name" } = req.query;

    // Check if the search term and table are provided
    if (!search || !table) {
      return res.status(400).json({ status: false, message: "Search query and table are required." });
    }

    // Create a case-insensitive regular expression for the search term
    const searchRegex = new RegExp(search, "i");

    // Define the available tables and their corresponding models and fields
    const tableMapping = {
      college: {
        model: models.College,
        fields: [
          "name", 
          "city", 
          "state", 
          "established_year", 
          "affiliated_university", 
          "college_type", 
          "ranking", 
          "accreditation", 
          "placement_details.highest_package", 
          "placement_details.avg_package", 
          "hostel_availability", 
          "scholarship_details", 
          "phone", 
          "email", 
          "location.latitude", 
          "location.longitude", 
          "images", 
          "datasheet_url", 
          "website_url"
        ]
      },
      accommodation: {
        model: models.Accommodation,
        fields: ["name", "address", "city", "state", "country", "amenities"]
      },
      program: {
        model: models.Program,
        fields: ["name", "short_name", "description"]
      },
      stream: {
        model: models.Stream,
        fields: ["name", "short_name", "description"]
      },
      department: {
        model: models.Department,
        fields: ["name", "short_name", "description"]
      },
      affiliation: {
        model: models.Affiliation,
        fields: ["name", "short_name", "description"]
      }
    };

    // Check if the selected table exists in the mapping
    const selectedTable = tableMapping[table];
    if (!selectedTable) {
      return res.status(400).json({ status: false, message: "Invalid table name provided." });
    }

    // Dynamically create the query for the selected table
    const searchQuery = {
      $or: selectedTable.fields.map(field => {
        // Add support for nested fields (e.g., "placement_details.highest_package")
        return { [field]: searchRegex };
      })
    };

    // Query the selected table
    const queryResults = await selectedTable.model.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(Number(limit)) // Ensure that limit is a number
      .sort({ [sort]: 1 }); // Sort by the given field, default is 'name'

    // If no results were found
    if (queryResults.length === 0) {
      return res.status(404).json({
        status: false,
        message: `No results found in ${table} for the search term "${search}"`,
        data: [],
      });
    }

    // Return the results from the selected table
    return res.status(200).json({
      status: true,
      message: `${table} search results retrieved successfully.`,
      data: queryResults,
    });

  } catch (error) {
    console.error("Search function error:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred during search.",
      data: error.message,
    });
  }
};

module.exports = { search };
