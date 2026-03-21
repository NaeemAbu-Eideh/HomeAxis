const Apartment = require('../models/apartment.model');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// helper: delete images safely
const deleteImages = async (images = []) => {
    for (const imagePath of images) {
        const fullPath = path.join(process.cwd(), imagePath);

        await fs.promises.unlink(fullPath).catch(err =>
            console.log('Error deleting image:', err.message)
        );
    }
};

// helper: format services
const formatServices = (services) => {
    if (!services) return [];

    if (Array.isArray(services)) return services;

    return services.split(',').map(s => s.trim());
};

// ================= CREATE =================
const createApartment = async (req, res) => {
    try {
        const {
            title,
            price,
            location,
            description,
            services
        } = req.body;

        let imagesPaths = [];
        if (req.files && req.files.length > 0) {
            imagesPaths = req.files.map(file => `/uploads/apartments/${file.filename}`);
        }

        const apartment = await Apartment.create({
            title,
            price,
            location,
            description,
            images: imagesPaths,
            services: formatServices(services)
        });

        res.status(201).json({
            success: true,
            data: apartment
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ success: false, errors });
        }
        res.status(500).json({ success: false, error: err.message });
    }
};

// ================= UPDATE =================
const updateApartment = async (req, res) => {
    try {
        const { id } = req.params;

        // validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID'
            });
        }

        const oldApartment = await Apartment.findById(id);

        if (!oldApartment) {
            return res.status(404).json({
                success: false,
                message: 'Apartment not found'
            });
        }

        let updateData = { ...req.body };

        // format services
        if (updateData.services) {
            updateData.services = formatServices(updateData.services);
        }

        // images handling
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/apartments/${file.filename}`);

            const keepOld = req.body.keepOldImages === 'true';

            if (keepOld) {
                updateData.images = [...oldApartment.images, ...newImages];
            } else {
                await deleteImages(oldApartment.images);
                updateData.images = newImages;
            }
        }

        const apartment = await Apartment.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: apartment
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ success: false, errors });
        }
        res.status(500).json({ success: false, error: err.message });
    }
};

// ================= GET ALL =================
const getAllApartments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const apartments = await Apartment.find()
            .skip(skip)
            .limit(limit);

        const total = await Apartment.countDocuments();

        res.status(200).json({
            success: true,
            results: apartments.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: apartments
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// ================= GET ONE =================
const getApartment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID'
            });
        }

        const apartment = await Apartment.findById(id);

        if (!apartment) {
            return res.status(404).json({
                success: false,
                message: 'Apartment not found'
            });
        }

        res.status(200).json({
            success: true,
            data: apartment
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// ================= DELETE =================
const deleteApartment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID'
            });
        }

        const apartment = await Apartment.findById(id);

        if (!apartment) {
            return res.status(404).json({
                success: false,
                message: 'Apartment not found'
            });
        }

        // delete images
        await deleteImages(apartment.images);

        await apartment.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Apartment deleted successfully'
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

module.exports = {
    createApartment,
    updateApartment,
    getAllApartments,
    getApartment,
    deleteApartment
};