import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        eum: ["admin", "user", "deliverypartner"],
        required: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
});
const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["customer"],
        default: "customer",
    },
    address: {
        type: String,
    },
    liveLocation: {
        lattitude: {
            type: String,
        },
        longitude: {
            type: String,
        },
    },
});
const deliveryPartnerSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ["deliverypartner"],
        default: "deliverypartner",
    },
    address: {
        type: String,
    },
    liveLocation: {
        lattitude: {
            type: String,
        },
        longitude: {
            type: String,
        },
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
});
const adminSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin"],
        default: "admin",
    },
});
export const Customer = mongoose.model("Customer", customerSchema);
export const DeliveryPartner = mongoose.model("DeliveryPartner", deliveryPartnerSchema);
export const Admin = mongoose.model("Admin", adminSchema);
