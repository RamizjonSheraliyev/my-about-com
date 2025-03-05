 // pages/api/save-course.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;  // MongoDB ulanish URL-si
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, title, price, description } = req.body;

    if (!email || !password || !title || !price || !description) {
      return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring!" });
    }

    try {
      await client.connect();
      const database = client.db("yourDatabaseName");  // MongoDB ma'lumotlar bazasi nomi
      const collection = database.collection("purchases");  // MongoDB kolleksiya nomi

      const courseData = {
        email,
        password,
        title,
        price,
        description,
        purchasedAt: new Date(),
      };

      const result = await collection.insertOne(courseData);  // Ma'lumotni saqlash

      if (result.insertedId) {
        return res.status(200).json({ message: "Kurs muvaffaqiyatli saqlandi!" });
      } else {
        return res.status(500).json({ message: "Kursni saqlashda xatolik yuz berdi." });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server xatosi!" });
    } finally {
      await client.close();
    }
  } else {
    return res.status(405).json({ message: "Metod qo‘llab-quvvatlanmaydi!" });
  }
}
