git clone https://github.com/Nazar-bek/Weather-App.git
Header componentida logotip va settings componenti bor. Propsdan asosiy funksiyalar jonatilgan va headerni ichidankerakli funksiyalar berilgan.
Bizning ilovada foydalanuvchiga ob-havo haqidagi ma’lumotlar quyidagi uchta asosiy komponent orqali taqdim etiladi:
WeatherDisplay (Current Weather)
— Tanlangan shahar bo‘yicha hozirgi ob-havo holatini ko‘rsatadi.
Forecast
— Keyingi 5 kunlik ob-havo prognozini grafik tarzda ko‘rsatadi.
Statistics
— Ob-havo ma’lumotlariga asoslangan statistikani (harorat o‘zgarishi, shamol tezligi va boshqalar) vizual tarzda chiqaradi.
CitySelector input orqali foydalanuvchidan shahar nomini olish uchun xizmat qiladi.
Foydalanuvchi yozganda, avtomatik takliflar chiqadi (suggestions).
Tanlangan shaharga qarab, yuqoridagi 3 asosiy komponent (Current, Forecast, Statistics) yangilanadi.
Ushbu komponentlarning barchasi WeatherWidget nomli asosiy konteynerda joylashgan. Foydalanuvchi har bir tab orqali ushbu bo‘limlarga o‘tishi mumkin.
Har qanday xatolik yuz bersa, ErrorBoundary uni ushlab qoladi.
Foydalanuvchiga xatolik sababi haqida tushunarli xabar beradi.
Bu UX’ni yaxshilaydi va ilovani ishonchli qiladi.
Har bir asosiy komponent (WeatherDisplay, Forecast, Statistics) o‘zgarayotganda, yumshoq animatsiya (fade-in/fade-out) beriladi.
Bu foydalanuvchi tajribasini yoqimli qiladi.
useWeatherData
Hozirgi vaqtdagi ob-havo ma’lumotlarini API orqali olish uchun ishlatiladi.
Ma’lumotlar context orqali butun ilovaga tarqatiladi.
useForecast
Tanlangan shahar bo‘yicha 5 kunlik ob-havo prognozini olish uchun ishlatiladi.
Ushbu hook Forecast komponenti uchun asosiy manba hisoblanadi.
Biz weatherContext va weatherReducer dan foydalanib, ma’lumotlar holatini markazlashtirdik.
Bu orqali turli komponentlar bir xil ma’lumotga ulanadi, va keraksiz prop drilling (komponentlarga keraksiz props yuborish) yo‘q bo‘ladi.Bu komponentlar qayta render bo‘lishining oldini oladi va ilova tezroq ishlaydi.Qidiruv inputida foydalanuvchi har bir harf kiritganida API so‘rov yuborilmasligi uchun debounce funksiyasidan foydalandik.Bu resurslarni tejaydi va ilovani sekinlashtiradigan ortiqcha so‘rovlar oldini oladi.