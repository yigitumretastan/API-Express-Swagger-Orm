# 📦 API Backend Projesi (Prisma + Swagger + Docker)

Bu proje, Express.js üzerine kurulu, **Prisma ORM**, **Swagger UI**, ve **Docker** ile desteklenmiş modüler bir RESTful API altyapısı sunar. Kullanıcı kimlik doğrulama, gönderi yönetimi ve temel CRUD işlemlerini içerir. Proje, katmanlı mimari prensiplerine uygun şekilde yapılandırılmıştır.

---

## 🚀 Özellikler

- ✅ Kullanıcı kimlik doğrulama (JWT)
- 📄 Swagger UI ile dokümantasyon
- 🧱 Katmanlı yapı (config, controller, middleware, route)
- 🗂 Prisma ORM ile veritabanı yönetimi
- 🐳 Docker ile kolay çalıştırma ve dağıtım
- 🌐 RESTful API mimarisi

---

## 🧾 Klasör Yapısı
```
API/
├── config/ # Veritabanı ayarları
├── controllers/ # İş mantığı
├── middleware/ # Middleware işlemleri
├── prisma/ # Prisma ORM şemaları ve migration dosyaları
├── routes/ # API endpoint tanımları
├── .env # Ortam değişkenleri
├── index.js # Giriş noktası
├── docker-compose.yml # Docker yapılandırması
├── package.json # Bağımlılıklar ve scriptler
└── readme.md # Bu dosya
```

---

## 🧪 Kullanılan Teknolojiler

- **Node.js & Express.js** – Sunucu çatısı
- **Prisma ORM** – Tip güvenliği olan modern veritabanı ORM
- **PostgreSQL / MySQL** – Desteklenen veritabanları
- **Swagger UI** – API dokümantasyonu
- **JWT** – Kimlik doğrulama
- **Docker & Docker Compose** – Konteynerleştirme

---

## ⚙️ Kurulum

### 1. Klonlayın

```bash
git clone https://github.com/kullaniciAdi/proje-adi.git
cd proje-adi

2. Ortam değişkenlerini oluşturun

.env dosyasını oluşturun ve aşağıdaki değişkenleri tanımlayın:

PORT=5000
DATABASE_URL="postgresql://kullanici:parola@localhost:5432/db_adi"
JWT_SECRET=guclu_bir_secret

3. Bağımlılıkları yükleyin

npm install

4. Prisma migration’larını uygulayın

npx prisma migrate dev

5. Uygulamayı başlatın

npm start

🐳 Docker ile Çalıştırma

docker-compose up --build

📬 API Endpointleri
🔐 Auth
Yöntem	Endpoint	Açıklama
POST	/auth/register	Yeni kullanıcı kaydı
POST	/auth/login	Kullanıcı girişi
📝 Post
Yöntem	Endpoint	Açıklama
POST	/post/	Yeni gönderi oluştur
GET	/post/	Gönderileri getir
GET	/post/:id	Gönderi detayını al
PUT	/post/:id	Gönderiyi güncelle
DELETE	/post/:id	Gönderiyi sil
📚 Swagger Dokümantasyonu

Uygulama çalıştığında API dökümantasyonuna tarayıcınızdan şu adresten ulaşabilirsiniz:

http://localhost:5000/api-docs
