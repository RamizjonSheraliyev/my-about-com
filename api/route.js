 // pages/api/save-course.js
import { MongoClient } from 'mongodb';

const uri = "MONGODB_URI"; // MongoDB URI (har bir MongoDB serveri uchun o'zgaradi)
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, title, price, description } = req.body;

    // Email, parol va boshqa ma'lumotlarni tekshirib chiqing
    if (!email || !password || password.length < 6) {
      return res.status(400).json({ message: "Email yoki parol noto‘g‘ri!" });
    }

    try {
      await client.connect();
      const database = client.db('yourDatabaseName');  // O'z MongoDB bazangiz nomi
      const collection = database.collection('purchases');  // Kollektsiyani tanlang

      // Ma'lumotni saqlash
      const result = await collection.insertOne({
        email,
        password,
        title,
        price,
        description,
        date: new Date(),
      });

      // Javob qaytarish
      res.status(200).json({ message: 'Ma’lumotlar saqlandi!', id: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server xatosi!' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
