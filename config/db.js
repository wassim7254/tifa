import mongoose from "mongoose"; // 1. تصحيح mport إلى import

const MONGODB_URI = process.env.MONGODB_URI;

// التأكد من أن الرابط موجود في ملف .env
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}
console.log("wassim")
// تخزين الاتصال في المتغير العام لتجنب تكرار الاتصال عند تحديث الكود
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    // إذا كان هناك اتصال مسبق، استخدمه
    if (cached.conn) {
        return cached.conn;
    }

    // إذا لم يكن هناك اتصال جارٍ، قم بإنشاء واحد جديد
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        // 2. تصحيح الأقواس: () بدلاً من {}
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;