const mongoose = require("mongoose");

const search = async (req, res) => {
  try {
    const {
      program,
      department,
      stream,
      tag,
      location,
      feeRange,
      highestPlacement,
      scholarshipAmount,
      page = 1,
      limit = 50,
    } = req.query;

    const pipeline = [];

    // Filtering by program, department, stream, and tag
    const matchConditions = {
      ...(program &&
        mongoose.Types.ObjectId.isValid(program) && {
          program_id: mongoose.Types.ObjectId(program),
        }),
      ...(department &&
        mongoose.Types.ObjectId.isValid(department) && {
          department_id: mongoose.Types.ObjectId(department),
        }),
      ...(stream &&
        mongoose.Types.ObjectId.isValid(stream) && {
          stream_id: mongoose.Types.ObjectId(stream),
        }),
      ...(tag && { tag: tag }),
    };

    if (Object.keys(matchConditions).length > 0) {
      pipeline.push({ $match: matchConditions });
    }

    // Location filter (city, state)
    if (location) {
      const [city, state] = location.split(",").map((part) => part.trim());
      pipeline.push({
        $match: {
          ...(city && { "college.city": city }),
          ...(state && { "college.state": state }),
        },
      });
    }

    // Fee range filter
    if (feeRange) {
      try {
        const { min, max } = JSON.parse(feeRange);
        pipeline.push({
          $match: {
            fees: {
              ...(min && { $gte: parseInt(min, 10) }),
              ...(max && { $lte: parseInt(max, 10) }),
            },
          },
        });
      } catch (error) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid fee range format" });
      }
    }

    // Highest placement filter
    if (highestPlacement) {
      pipeline.push({
        $match: {
          "college.placement_details.highest_package": {
            $gte: parseInt(highestPlacement, 10),
          },
        },
      });
    }

    // Scholarship amount filter
    if (scholarshipAmount) {
      pipeline.push({
        $match: {
          "college.scholarship_details": {
            $gte: parseInt(scholarshipAmount, 10),
          },
        },
      });
    }

    // Lookup to join ProgramMapped with College collection
    pipeline.push({
      $lookup: {
        from: "colleges",
        localField: "college_id",
        foreignField: "_id",
        as: "college",
      },
    });

    // Unwind the college array
    pipeline.push({ $unwind: "$college" });

    // Pagination
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 50;
    pipeline.push({ $skip: (pageNumber - 1) * limitNumber });
    pipeline.push({ $limit: limitNumber });

    // Projection
    pipeline.push({
      $project: {
        program_id: 1,
        department_id: 1,
        stream_id: 1,
        tag: 1,
        fees: 1,
        duration: 1,
        "college.name": 1,
        "college.city": 1,
        "college.state": 1,
        "college.ranking": 1,
        "college.placement_details.highest_package": 1,
        "college.placement_details.avg_package": 1,
        "college.scholarship_details": 1,
      },
    });

    // Execute aggregation pipeline
    const results = await mongoose.model("ProgramMapped").aggregate(pipeline);

    res.status(200).json({
      status: true,
      message: "Search results retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Search function error:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred during search.",
      data: error.message,
    });
  }
};

module.exports = { search };
