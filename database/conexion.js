import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URIMONGO);
    console.log("Conexión a la base de datos establecida");
} catch (error) {
    console.log(`Error al conectar a la base de datos: ${error}`);
}  