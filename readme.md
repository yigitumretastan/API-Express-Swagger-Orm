API/
│
├── config/                      # Uygulama ayar dosyaları
│   └── database.js              # Veritabanı bağlantı ayarları
│
├── controllers/                 # İş mantığı (controller'lar)
│   ├── auth.js                  # Giriş/Çıkış işlemleri
│   └── post.js                  # Post işlemleri (oluşturma, güncelleme, silme vb.)
│
├── middleware/                  # Ara yazılımlar (middleware'lar)
│   ├── auth.js                  # Kimlik doğrulama kontrolü
│   └── post.js                  # Post'a özel kontroller (yetki, validasyon vs.)
│
├── models/                      # Veritabanı modelleri
│   ├── auth.js                  # Kullanıcı şeması
│   └── post.js                  # Post şeması
│
├── routes/                      # API endpoint tanımları
│   ├── auth.js                  # /auth endpoint'leri (login, register vb.)
│   └── post.js                  # /post endpoint'leri (CRUD işlemleri)
|
├── node_modules/
├── .env                         # Ortam (env) değişkenleri
├── index.js                     # Uygulamanın başlangıç noktası
├── package-lock.json            # Paket kilit dosyası
├── package.json                 # Bağımlılıklar ve scriptler
└── readme.md                    # Proje açıklamaları ve kullanım talimatları




















📁 Proje Klasör Yapısı Açıklaması
Bu proje, Node.js ve Express.js kullanılarak geliştirilmiş bir RESTful API mimarisi üzerine kuruludur. Projede dosyalar işlevlerine göre mantıksal klasörler altında gruplandırılmıştır. Aşağıda bu klasörlerin ve dosyaların işlevleri açıklanmıştır:

config/
Uygulama genelindeki yapılandırma ayarlarını içerir. Özellikle veritabanı bağlantı ayarları database.js dosyasında yapılır.

controllers/
Uygulamanın iş mantığını (business logic) barındırır. Gelen isteklerin işlenmesini sağlar. Örneğin auth.js dosyası kullanıcı girişi/çıkışı ile ilgilenirken, post.js blog postlarıyla ilgili işlemleri (oluşturma, silme, güncelleme) yönetir.

middleware/
Express middleware’larının bulunduğu klasördür. Kimlik doğrulama (auth.js) veya özel yetkilendirme kontrolleri (post.js) gibi işlemleri gerçekleştirir.

models/
Veritabanı modelleri burada tanımlanır. Genellikle mongoose kullanılarak MongoDB şemaları oluşturulur. auth.js kullanıcı modelini, post.js ise gönderi (post) modelini içerir.

routes/
API endpoint tanımlamalarının yapıldığı klasördür. Kullanıcı işlemleri (/auth) ve post işlemleri (/post) gibi rotalar burada tanımlanır.

.env
Ortam değişkenlerini (örneğin veritabanı bağlantı adresi, port, JWT secret) barındırır. Bu dosya gizli kalmalı ve .gitignore dosyasına eklenmelidir.

index.js
Uygulamanın başlangıç dosyasıdır. Express uygulaması burada başlatılır, middleware’lar ve route’lar burada tanımlanır.

package.json / package-lock.json
Projede kullanılan bağımlılıkların listelendiği ve versiyonlarının kilitlendiği dosyalardır. Ayrıca çalıştırılabilir scriptler de burada tanımlanır.

readme.md
Proje hakkında genel bilgiler, kurulum ve kullanım talimatlarının yer aldığı dökümantasyon dosyasıdır.


## Proje Yapısı (29.04.2025 tarihinde otomatik oluşturuldu)

```
API/
├── config/
│   ├── database.js                         # Konfigürasyon dosyası
│   └── databasep.js                         # Konfigürasyon dosyası
├── controllers/
│   ├── auth.js                         # Controller dosyası
│   └── post.js                         # Controller dosyası
├── middleware/
│   ├── auth.js                         # Middleware dosyası
│   └── post.js                         # Middleware dosyası
├── node_modules/                  # İçerik .gitignore'da belirtildiği için taranmadı
├── prisma/
│   ├── migrations/
│   │   ├── 20250429184256_init/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── routes/
│   ├── auth.js                         # Route dosyası
│   └── post.js                         # Route dosyası
├── .env                         # Ortam (env) değişkenleri
├── .gitignore
├── docker-compose.yml
├── index.js                         # Uygulamanın başlangıç noktası
├── package-lock.json                         # Paket kilit dosyası
├── package.json                         # Bağımlılıklar ve scriptler
├── packages.txt
└── readme.md                         # Proje açıklamaları ve kullanım talimatları

```
