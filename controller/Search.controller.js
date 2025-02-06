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
          "affiliated_university", 
          "college_type", 
          "accreditation", 
          "placement_details.highest_package", 
          "placement_details.avg_package", 
          "hostel_availability", 
          "scholarship_details", 
          "phone", 
          "email", 
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
        // Handle fields with nested structure, such as placement_details.highest_package
        if (field.includes('.')) {
          const [parentField, childField] = field.split('.');

          // Handle numeric fields specifically
          if (models.College.schema.paths[field].instance === "Number") {
            // If the search is a valid number, search for the exact number
            if (!isNaN(Number(search))) {
              return { [`${parentField}.${childField}`]: Number(search) };
            } else {
              return {}; // Skip numeric field if search term is not a valid number
            }
          } else if (models.College.schema.paths[field].instance === "Boolean") {
            // Handle Boolean fields (true/false)
            const boolSearch = search.toLowerCase() === "true" ? true : search.toLowerCase() === "false" ? false : null;
            if (boolSearch !== null) {
              return { [`${parentField}.${childField}`]: boolSearch };
            }
            return {}; // Skip if invalid boolean search
          } else {
            return { [`${parentField}.${childField}`]: searchRegex }; // For strings, apply regex
          }
        }

        // Handle numeric fields
        if (models.College.schema.paths[field]?.instance === "Number") {
          // If the search term is a number, search for the exact match
          if (!isNaN(Number(search))) {
            return { [field]: Number(search) };
          } else {
            return {}; // Skip this field if it's a number but the search term is not a number
          }
        }

        // Handle Boolean fields (true/false)
        if (models.College.schema.paths[field]?.instance === "Boolean") {
          const boolSearch = search.toLowerCase() === "true" ? true : search.toLowerCase() === "false" ? false : null;
          if (boolSearch !== null) {
            return { [field]: boolSearch };
          }
          return {}; // Skip if invalid boolean search
        } else {
          // Apply regex to string fields
          return { [field]: searchRegex };
        }
      }).filter(query => Object.keys(query).length > 0) // Remove empty query objects
    };

    // Query the selected table
    const queryResults = await selectedTable.model.find(searchQuery)
      .skip((page - 1) * limit)  // Skip for pagination
      .limit(Number(limit)) // Limit results
      .sort({ [sort]: 1 }); // Sort results by the given field (default 'name')

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
