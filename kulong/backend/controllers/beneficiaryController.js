const mongoose = require("mongoose");
const Beneficiary = require("../models/Beneficiary");

/**
 * Helper: send error response
 */
const handleServerError = (res, error, customMessage) => {
  console.error(customMessage, error);

  return res.status(500).json({
    success: false,
    message: customMessage,
    error: error.message
  });
};

/**
 * Helper: validate required fields
 */
const validateRequiredFields = (body) => {
  const requiredFields = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "placeOfBirth",
    "gender",
    "nationality",
    "maritalStatus",
    "settlementCamp",
    "dateOfJoining"
  ];

  const missingFields = requiredFields.filter(
    (field) => !body[field] || String(body[field]).trim() === ""
  );

  return missingFields;
};

/**
 * Create beneficiary
 * POST /api/beneficiaries
 */
const createBeneficiary = async (req, res) => {
  try {
    const missingFields = validateRequiredFields(req.body);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        missingFields
      });
    }

    const beneficiaryData = {
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      dateOfBirth: req.body.dateOfBirth,
      placeOfBirth: req.body.placeOfBirth.trim(),
      gender: req.body.gender.trim(),
      nationality: req.body.nationality.trim(),
      maritalStatus: req.body.maritalStatus.trim(),
      settlementCamp: req.body.settlementCamp.trim(),
      dateOfJoining: req.body.dateOfJoining
    };

    const beneficiary = await Beneficiary.create(beneficiaryData);

    return res.status(201).json({
      success: true,
      message: "Beneficiary registered successfully",
      data: beneficiary
    });
  } catch (error) {
    return handleServerError(res, error, "Failed to create beneficiary");
  }
};

/**
 * Get all beneficiaries
 * GET /api/beneficiaries
 */
const getBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: beneficiaries.length,
      data: beneficiaries
    });
  } catch (error) {
    return handleServerError(res, error, "Failed to fetch beneficiaries");
  }
};

/**
 * Get single beneficiary by ID
 * GET /api/beneficiaries/:id
 */
const getBeneficiaryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid beneficiary ID"
      });
    }

    const beneficiary = await Beneficiary.findById(id);

    if (!beneficiary) {
      return res.status(404).json({
        success: false,
        message: "Beneficiary not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: beneficiary
    });
  } catch (error) {
    return handleServerError(res, error, "Failed to fetch beneficiary");
  }
};

module.exports = {
  createBeneficiary,
  getBeneficiaries,
  getBeneficiaryById
};